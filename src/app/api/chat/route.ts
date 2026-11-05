import OpenAI from "openai";
import type { ChatCompletionChunk } from "openai/resources/chat/completions";
import { profile } from "@/content/profile";
import { SYSTEM_PROMPT } from "@/lib/assistant-prompt";
import { offlineAnswer } from "@/lib/offline-answers";
import { isRateLimited } from "@/lib/rate-limit";

export const maxDuration = 60;

type Provider = {
  name: string;
  keyEnv: string;
  baseURL: string;
  headers: Record<string, string>;
  requests: { model: string; models?: string[]; reasoning_effort?: "low"; include_reasoning?: boolean }[];
};

/**
 * Free providers, tried in order. Only those with a key set are used.
 * Both speak the OpenAI API, so they share one client. Keep the OpenRouter list to
 * free models only: it bills at the paid rate if a fallback lands on a paid model.
 */
const PROVIDERS: Provider[] = [
  {
    name: "Groq",
    keyEnv: "GROQ_API_KEY",
    baseURL: "https://api.groq.com/openai/v1",
    headers: {},
    // Groq limits are per model, so a busy first model fails over to the second.
    requests: [
      { model: "openai/gpt-oss-120b", reasoning_effort: "low", include_reasoning: false },
      { model: "openai/gpt-oss-20b", reasoning_effort: "low", include_reasoning: false },
    ],
  },
  {
    name: "OpenRouter",
    keyEnv: "OPENROUTER_API_KEY",
    baseURL: "https://openrouter.ai/api/v1",
    headers: { "HTTP-Referer": profile.siteUrl, "X-OpenRouter-Title": profile.name },
    // openrouter/free picks any available free model, which covers a listed model being retired.
    requests: [
      {
        model: "google/gemma-4-31b-it:free",
        models: ["google/gemma-4-31b-it:free", "nvidia/nemotron-3-ultra-550b-a55b:free", "openrouter/free"],
      },
    ],
  },
];

const PROVIDER_TIMEOUT_MS = 25_000;
const MAX_OUTPUT_TOKENS = 1500;
const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 8000;

type ChatMessage = { role: "user" | "assistant"; content: string };

function parseMessages(body: unknown): ChatMessage[] | null {
  const messages = (body as { messages?: unknown } | null)?.messages;
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) return null;

  const valid = messages.every(
    (m) =>
      (m?.role === "user" || m?.role === "assistant") &&
      typeof m.content === "string" &&
      m.content.trim().length > 0 &&
      m.content.length <= MAX_MESSAGE_CHARS,
  );
  if (!valid || messages[0].role !== "user" || messages.at(-1).role !== "user") return null;

  return messages.map(({ role, content }) => ({ role, content }));
}

function isCrossOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  return new URL(origin).host !== request.headers.get("host");
}

function textResponse(body: BodyInit, mode: "live" | "offline") {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Assistant-Mode": mode,
    },
  });
}

function jsonError(status: number, error: string) {
  return Response.json({ error }, { status });
}

async function* answerText(stream: AsyncIterable<ChatCompletionChunk>, result: { finishReason?: string | null }) {
  for await (const chunk of stream) {
    const choice = chunk.choices[0];
    // OpenRouter reports failures after the stream has started as a finish reason.
    const finishReason: string | null | undefined = choice?.finish_reason;
    if (finishReason === "error") throw new Error("Provider ended the stream with an error");
    if (finishReason) result.finishReason = finishReason;
    if (choice?.delta?.content) yield choice.delta.content;
  }
}

/** Tries each configured model until one starts answering, so failures can still fall back to an offline answer. */
async function startAnswer(providers: Provider[], messages: ChatMessage[], signal: AbortSignal) {
  for (const provider of providers) {
    const client = new OpenAI({
      apiKey: process.env[provider.keyEnv],
      baseURL: provider.baseURL,
      defaultHeaders: provider.headers,
      maxRetries: 0,
      timeout: PROVIDER_TIMEOUT_MS,
    });

    for (const options of provider.requests) {
      try {
        const stream = await client.chat.completions.create(
          {
            ...options,
            messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
            max_completion_tokens: MAX_OUTPUT_TOKENS,
            stream: true,
          },
          { signal },
        );
        const result: { finishReason?: string | null } = {};
        const text = answerText(stream, result);
        const first = await text.next();
        if (!first.done) return { first: first.value, text, result, abort: () => stream.controller.abort() };
      } catch (error) {
        if (signal.aborted) return null;
        console.error(`${provider.name} request failed on ${options.model}:`, error instanceof OpenAI.APIError ? error.status : error);
      }
    }
  }
  return null;
}

export async function POST(request: Request) {
  if (isCrossOrigin(request)) return jsonError(403, "Cross-origin requests are not allowed.");

  const client = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
  if (isRateLimited(client)) {
    return jsonError(429, "You've sent a lot of messages. Please try again in a few minutes.");
  }

  const messages = parseMessages(await request.json().catch(() => null));
  if (!messages) return jsonError(400, "That message couldn't be processed. Long pastes are limited to 8,000 characters.");

  const question = messages.at(-1)!.content;
  const providers = PROVIDERS.filter((provider) => process.env[provider.keyEnv]);
  const answer = await startAnswer(providers, messages, request.signal);
  if (!answer) return textResponse(offlineAnswer(question), "offline");

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      controller.enqueue(encoder.encode(answer.first));
      try {
        for await (const text of answer.text) controller.enqueue(encoder.encode(text));
        if (answer.result.finishReason === "length") {
          controller.enqueue(encoder.encode(`\n\n*This answer was cut short. For more detail, email ${profile.email}.*`));
        }
      } catch (error) {
        if (!request.signal.aborted) {
          console.error("Assistant stream failed:", error instanceof OpenAI.APIError ? error.status : error);
          controller.enqueue(encoder.encode("\n\n*The connection dropped. Please try again.*"));
        }
      }
      controller.close();
    },
    cancel() {
      answer.abort();
    },
  });

  return textResponse(body, "live");
}
