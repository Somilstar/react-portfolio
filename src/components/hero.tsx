"use client";

import { ArrowUp, ArrowUpRight, Sparkles } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useAssistant } from "@/components/assistant";
import { MeshField } from "@/components/mesh-field";
import { Container } from "@/components/ui";
import { profile } from "@/content/profile";

const suggestions = ["What did Somil ship at IBM?", "Is Somil a fit for a backend role?", "What's Somil's AI experience?"];

export function Hero() {
  const { openAssistant } = useAssistant();
  const [question, setQuestion] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const text = question.trim();
    if (!text) return openAssistant();
    setQuestion("");
    openAssistant(text);
  };

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24 pb-14">
      <MeshField />
      <Container className="relative">
        <div className="max-w-[760px]">
          <h1 className="animate-rise mb-7 flex w-fit items-center gap-2.5 rounded-full border border-line bg-panel/70 px-3 py-1.5 font-mono text-xs font-normal text-muted backdrop-blur">
            <span aria-hidden className="size-1.5 animate-pulse-dot rounded-full bg-accent" />
            <span className="text-fg">{profile.name}</span>
            <span aria-hidden className="text-subtle">/</span>
            {profile.role}
            <span aria-hidden className="hidden text-subtle sm:inline">/</span>
            <span className="hidden sm:inline">{profile.location}</span>
          </h1>

          <p style={{ animationDelay: "70ms" }} className="animate-rise text-[2.85rem] leading-[1.02] font-semibold tracking-[-0.045em] text-balance sm:text-6xl lg:text-[5.25rem]">
            {profile.headline}
          </p>

          <p style={{ animationDelay: "140ms" }} className="animate-rise mt-6 max-w-[600px] text-lg leading-relaxed text-muted">
            {profile.intro}
          </p>

          <div style={{ animationDelay: "210ms" }} className="animate-rise mt-9 max-w-[600px]">
            <form onSubmit={submit} className="group flex items-center gap-3 rounded-xl border border-line-strong bg-panel/85 p-2 pl-4 shadow-[0_18px_60px_-30px_rgba(200,245,66,0.35)] backdrop-blur transition focus-within:border-accent/70">
              <Sparkles size={18} className="shrink-0 text-accent" aria-hidden />
              <input
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Skip the resume. Ask my AI."
                aria-label="Ask the AI assistant about Somil"
                className="h-10 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted focus-visible:outline-none"
              />
              <button type="submit" aria-label="Ask" className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent text-ink transition hover:brightness-110">
                <ArrowUp size={18} aria-hidden />
              </button>
            </form>
            <div className="mt-3 flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => openAssistant(suggestion)}
                  className="rounded-full border border-line bg-ink/60 px-3 py-1.5 text-[0.8rem] text-muted backdrop-blur transition hover:border-line-strong hover:text-fg"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <div style={{ animationDelay: "280ms" }} className="animate-rise mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <a href="#experience" className="font-medium underline decoration-line-strong underline-offset-4 transition hover:decoration-accent">
              See my work
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-muted transition hover:text-fg">
              GitHub <ArrowUpRight size={14} aria-hidden />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-muted transition hover:text-fg">
              LinkedIn <ArrowUpRight size={14} aria-hidden />
            </a>
            {profile.resumeUrl && (
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-muted transition hover:text-fg">
                Resume <ArrowUpRight size={14} aria-hidden />
              </a>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
