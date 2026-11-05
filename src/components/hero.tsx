"use client";

import { ArrowUp, ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { useAssistant } from "@/components/assistant";
import { MeshField } from "@/components/mesh-field";
import { Container } from "@/components/ui";
import { profile } from "@/content/profile";

const suggestions = ["What did Somil ship at IBM?", "Is Somil a fit for a backend role?", "What's Somil's AI experience?"];

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

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
          <motion.p {...enter(0)} className="mb-7 flex w-fit items-center gap-2.5 rounded-full border border-line bg-panel/70 px-3 py-1.5 font-mono text-xs text-muted backdrop-blur">
            <span className="size-1.5 animate-pulse-dot rounded-full bg-accent" />
            {profile.availability}
            <span className="hidden sm:contents">
              <span className="text-subtle">/</span>
              {profile.location}
            </span>
          </motion.p>

          <motion.h1 {...enter(0.07)} className="text-[2.85rem] leading-[1.02] font-semibold tracking-[-0.045em] text-balance sm:text-6xl lg:text-[5.25rem]">
            {profile.headline}
          </motion.h1>

          <motion.p {...enter(0.14)} className="mt-6 max-w-[600px] text-lg leading-relaxed text-muted">
            {profile.intro}
          </motion.p>

          <motion.div {...enter(0.21)} className="mt-9 max-w-[600px]">
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
          </motion.div>

          <motion.div {...enter(0.28)} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
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
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
