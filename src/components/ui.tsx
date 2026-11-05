"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-5 md:px-8 ${className}`}>{children}</div>;
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ label, title, children }: { label: string; title: string; children?: ReactNode }) {
  return (
    <Reveal className="mb-10 max-w-3xl md:mb-14">
      <p className="mb-4 font-mono text-xs tracking-widest text-accent uppercase">{label}</p>
      <h2 className="text-3xl leading-[1.1] font-semibold tracking-[-0.03em] text-balance md:text-5xl">{title}</h2>
      {children && <p className="mt-5 text-lg leading-relaxed text-muted">{children}</p>}
    </Reveal>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-line bg-white/[0.03] px-2 py-1 font-mono text-[0.72rem] leading-none text-muted">
      {children}
    </span>
  );
}
