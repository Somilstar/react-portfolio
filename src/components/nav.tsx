"use client";

import { Menu, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAssistant } from "@/components/assistant";
import { profile } from "@/content/profile";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const { openAssistant } = useAssistant();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        scrolled || menuOpen ? "border-line bg-ink/80 backdrop-blur-xl" : "border-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 md:px-8">
        <a href="#top" className="font-semibold tracking-tight">
          {profile.name}
          <span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm text-muted transition-colors hover:text-fg">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="hidden h-9 items-center rounded-lg border border-line-strong px-3 text-sm font-medium transition hover:bg-raised sm:flex">
            Resume
          </a>
          <button
            type="button"
            onClick={() => openAssistant()}
            className="flex h-9 items-center gap-2 rounded-lg bg-accent px-3 text-sm font-medium text-ink transition hover:brightness-110"
          >
            <Sparkles size={15} aria-hidden />
            Ask AI
            <kbd className="hidden rounded bg-ink/15 px-1.5 py-0.5 font-mono text-[0.65rem] lg:block">⌘K</kbd>
          </button>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="grid size-9 place-items-center rounded-lg border border-line text-muted md:hidden"
          >
            {menuOpen ? <X size={17} aria-hidden /> : <Menu size={17} aria-hidden />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <ul className="border-t border-line px-5 py-3 md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setMenuOpen(false)} className="block py-2.5 text-muted hover:text-fg">
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)} className="block py-2.5 text-muted hover:text-fg">
              Resume
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
