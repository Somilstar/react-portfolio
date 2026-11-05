"use client";

import { ArrowUpRight, Check, Copy, Sparkles } from "lucide-react";
import { useState } from "react";
import { useAssistant } from "@/components/assistant";
import { Container, Reveal } from "@/components/ui";
import { profile } from "@/content/profile";

export function Contact() {
  const { openAssistant } = useAssistant();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="border-t border-line">
      <Container className="py-24 md:py-32">
        <Reveal>
          <p className="mb-4 font-mono text-xs tracking-widest text-accent uppercase">Contact</p>
          <h2 className="max-w-4xl text-4xl leading-[1.05] font-semibold tracking-[-0.04em] text-balance md:text-7xl">
            Hiring for 2027? Let&apos;s talk.
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href={`mailto:${profile.email}`} className="flex h-12 items-center rounded-xl bg-accent px-5 font-medium text-ink transition hover:brightness-110">
              {profile.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={copied ? "Email copied" : "Copy email address"}
              className="grid size-12 place-items-center rounded-xl border border-line-strong text-muted transition hover:text-fg"
            >
              {copied ? <Check size={18} className="text-accent" aria-hidden /> : <Copy size={18} aria-hidden />}
            </button>
            <button
              type="button"
              onClick={() => openAssistant()}
              className="flex h-12 items-center gap-2 rounded-xl border border-line-strong px-5 font-medium transition hover:bg-raised"
            >
              <Sparkles size={16} className="text-accent" aria-hidden />
              Ask my AI first
            </button>
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="flex h-12 items-center gap-1.5 rounded-xl border border-line-strong px-5 font-medium transition hover:bg-raised">
              Resume <ArrowUpRight size={16} aria-hidden />
            </a>
          </div>
        </Reveal>
      </Container>
      <footer className="border-t border-line">
        <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-7 text-sm text-muted">
          <p>
            © {new Date().getFullYear()} {profile.name} · {profile.location}
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <a href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`} className="transition hover:text-fg">
              {profile.phone}
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 transition hover:text-fg">
              LinkedIn <ArrowUpRight size={14} aria-hidden />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 transition hover:text-fg">
              GitHub <ArrowUpRight size={14} aria-hidden />
            </a>
          </div>
        </Container>
      </footer>
    </section>
  );
}
