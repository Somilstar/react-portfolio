"use client";

import { ArrowUp, BriefcaseBusiness, RotateCcw, Sparkles, Square, X } from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import Markdown from "react-markdown";
import { profile } from "@/content/profile";

type Message = { role: "user" | "assistant"; content: string };

const HISTORY_LIMIT = 11;
const JOB_PLACEHOLDER = "Paste the job description here…";
const starters = [
  "What did Somil ship at IBM?",
  "Tell me about the Kafka project",
  "What's Somil's AI experience?",
  "Why should we interview Somil?",
];

const AssistantContext = createContext<{ openAssistant: (prompt?: string) => void } | null>(null);

export function useAssistant() {
  const context = useContext(AssistantContext);
  if (!context) throw new Error("useAssistant must be used inside AssistantProvider");
  return context;
}

/** The API needs a conversation that starts with a user turn and has no empty turns. */
function requestHistory(messages: Message[]) {
  const recent = messages.filter((message) => message.content.trim()).slice(-HISTORY_LIMIT);
  return recent[0]?.role === "assistant" ? recent.slice(1) : recent;
}

export function AssistantProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [error, setError] = useState("");
  const [draft, setDraft] = useState("");
  const [jobMode, setJobMode] = useState(false);

  const historyRef = useRef<Message[]>([]);
  const abortRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const commit = useCallback((next: Message[]) => {
    historyRef.current = next;
    setMessages(next);
  }, []);

  const send = useCallback(
    async (text: string) => {
      if (abortRef.current) return;
      const conversation: Message[] = [...historyRef.current, { role: "user", content: text }];
      commit([...conversation, { role: "assistant", content: "" }]);
      setError("");
      setIsStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;
      let answer = "";

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: requestHistory(conversation) }),
          signal: controller.signal,
        });

        if (!response.ok || !response.body) {
          const body = await response.json().catch(() => null);
          throw new Error(body?.error ?? "The assistant is unavailable right now.");
        }

        setIsOffline(response.headers.get("X-Assistant-Mode") === "offline");
        const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          answer += value;
          commit([...conversation, { role: "assistant", content: answer }]);
        }
      } catch (cause) {
        if (!controller.signal.aborted) {
          setError(cause instanceof Error && cause.message !== "Failed to fetch" ? cause.message : "The connection failed. Please try again.");
        }
      } finally {
        if (!answer) commit(conversation);
        abortRef.current = null;
        setIsStreaming(false);
      }
    },
    [commit],
  );

  const openAssistant = useCallback(
    (prompt?: string) => {
      setIsOpen(true);
      if (prompt) void send(prompt);
    },
    [send],
  );

  const reset = () => {
    abortRef.current?.abort();
    commit([]);
    setError("");
    setJobMode(false);
    setDraft("");
  };

  const submit = (event?: FormEvent) => {
    event?.preventDefault();
    const text = draft.trim();
    if (!text || isStreaming) return;
    setDraft("");
    setJobMode(false);
    void send(jobMode ? `Here is a job description. How well does Somil fit it?\n\n${text}` : text);
  };

  const onComposerKey = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      submit();
    }
  };

  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((open) => !open);
      }
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus({ preventScroll: true });
  }, [isOpen, jobMode]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, error]);

  const value = useMemo(() => ({ openAssistant }), [openAssistant]);
  const last = messages.at(-1);

  return (
    <MotionConfig reducedMotion="user">
      <AssistantContext.Provider value={value}>
        {children}
        <AnimatePresence>
          {isOpen && (
            <motion.aside
              role="dialog"
              aria-label="AI assistant"
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 28 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-50 flex flex-col bg-panel sm:inset-y-3 sm:right-3 sm:left-auto sm:w-[440px] sm:rounded-2xl sm:border sm:border-line-strong sm:shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)]"
            >
              <header className="flex items-center justify-between border-b border-line px-5 py-3.5">
                <div>
                  <p className="flex items-center gap-2 font-medium tracking-tight">
                    <Sparkles size={16} className="text-accent" aria-hidden />
                    Ask about Somil
                  </p>
                  <p className="mt-0.5 text-xs text-muted">
                    {isOffline ? "Offline mode: quick answers from the resume" : "AI answers from Somil's resume. It can make mistakes."}
                  </p>
                </div>
                <div className="flex gap-1">
                  {messages.length > 0 && (
                    <button type="button" onClick={reset} aria-label="Start a new chat" className="grid size-9 place-items-center rounded-lg text-muted transition hover:bg-raised hover:text-fg">
                      <RotateCcw size={16} aria-hidden />
                    </button>
                  )}
                  <button type="button" onClick={() => setIsOpen(false)} aria-label="Close assistant" className="grid size-9 place-items-center rounded-lg text-muted transition hover:bg-raised hover:text-fg">
                    <X size={18} aria-hidden />
                  </button>
                </div>
              </header>

              <div ref={scrollRef} aria-live="polite" className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
                {messages.length === 0 && (
                  <div>
                    <p className="text-[1.65rem] leading-tight font-semibold tracking-[-0.03em] text-balance">
                      What would you like to know?
                    </p>
                    <button
                      type="button"
                      onClick={() => setJobMode(true)}
                      className="mt-5 flex w-full items-center gap-3 rounded-xl border border-accent/40 bg-accent-dim p-3.5 text-left transition hover:border-accent/70"
                    >
                      <BriefcaseBusiness size={18} className="shrink-0 text-accent" aria-hidden />
                      <span>
                        <span className="block text-sm font-medium">Check fit for a role</span>
                        <span className="block text-xs text-muted">Paste a job description for an honest match</span>
                      </span>
                    </button>
                    <ul className="mt-3 space-y-2">
                      {starters.map((starter) => (
                        <li key={starter}>
                          <button type="button" onClick={() => void send(starter)} className="w-full rounded-xl border border-line p-3 text-left text-sm text-muted transition hover:border-line-strong hover:text-fg">
                            {starter}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {messages.map((message, index) =>
                  message.role === "user" ? (
                    <p key={index} className="ml-auto max-h-48 w-fit max-w-[88%] overflow-y-auto rounded-2xl rounded-br-md bg-raised px-3.5 py-2.5 text-[0.95rem] leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                  ) : (
                    message.content && (
                      <div key={index} className="chat-prose text-[0.95rem] leading-relaxed text-[#d4d6d3]">
                        <Markdown
                          components={{
                            a: ({ href, children: label }) => (
                              <a href={href} target="_blank" rel="noreferrer">
                                {label}
                              </a>
                            ),
                          }}
                        >
                          {message.content}
                        </Markdown>
                      </div>
                    )
                  ),
                )}

                {isStreaming && !last?.content && (
                  <p role="status" aria-label="Thinking" className="flex gap-1.5 py-2">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        className="size-1.5 rounded-full bg-accent"
                        animate={{ opacity: [0.25, 1, 0.25] }}
                        transition={{ duration: 1.1, repeat: Infinity, delay: dot * 0.16 }}
                      />
                    ))}
                  </p>
                )}

                {error && (
                  <p role="alert" className="rounded-xl border border-line-strong bg-raised p-3 text-sm text-muted">
                    {error} You can also email{" "}
                    <a href={`mailto:${profile.email}`} className="text-accent underline underline-offset-2">
                      {profile.email}
                    </a>
                    .
                  </p>
                )}
              </div>

              <form onSubmit={submit} className="border-t border-line p-3">
                {jobMode && (
                  <p className="mb-2 flex items-center justify-between px-1 text-xs text-accent">
                    <span>
                      Job fit check <span className="text-muted">· Don&apos;t paste confidential details</span>
                    </span>
                    <button type="button" onClick={() => setJobMode(false)} className="text-muted underline underline-offset-2 hover:text-fg">
                      Cancel
                    </button>
                  </p>
                )}
                <div className="flex items-end gap-2 rounded-xl border border-line-strong bg-ink p-1.5 pl-3 transition focus-within:border-accent/70">
                  <textarea
                    ref={inputRef}
                    rows={jobMode ? 6 : 1}
                    value={draft}
                    maxLength={7500}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={onComposerKey}
                    placeholder={jobMode ? JOB_PLACEHOLDER : "Ask a question…"}
                    aria-label={jobMode ? "Job description" : "Your question"}
                    className="max-h-40 min-h-9 flex-1 resize-none bg-transparent py-1.5 text-base leading-relaxed outline-none placeholder:text-muted focus-visible:outline-none"
                  />
                  {isStreaming ? (
                    <button type="button" onClick={() => abortRef.current?.abort()} aria-label="Stop answering" className="grid size-9 shrink-0 place-items-center rounded-lg bg-raised text-fg">
                      <Square size={14} fill="currentColor" aria-hidden />
                    </button>
                  ) : (
                    <button type="submit" aria-label="Send" disabled={!draft.trim()} className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-ink transition enabled:hover:brightness-110 disabled:opacity-35">
                      <ArrowUp size={17} aria-hidden />
                    </button>
                  )}
                </div>
              </form>
            </motion.aside>
          )}
        </AnimatePresence>
      </AssistantContext.Provider>
    </MotionConfig>
  );
}
