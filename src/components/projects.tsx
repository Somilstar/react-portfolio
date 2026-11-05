import { ArrowUpRight } from "lucide-react";
import { Pipeline } from "@/components/pipeline";
import { Container, Reveal, SectionHeading, Tag } from "@/components/ui";
import { flagshipProject, profile, projects } from "@/content/profile";

export function Projects() {
  return (
    <section id="projects" className="border-t border-line py-24 md:py-32">
      <Container>
        <SectionHeading label="Projects" title="What I build outside of work." />

        <Reveal className="rounded-2xl border border-line bg-panel p-5 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
            <div>
              <p className="font-mono text-xs text-accent">Featured project</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-balance md:text-3xl">{flagshipProject.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{flagshipProject.summary}</p>
              <p className="mt-6 flex items-baseline gap-3">
                <span className="text-5xl font-semibold tracking-[-0.04em] text-accent">{flagshipProject.outcome}</span>
                <span className="text-sm text-muted">{flagshipProject.outcomeLabel}</span>
              </p>
            </div>
            <ul className="space-y-3 text-[0.95rem] leading-relaxed text-muted lg:pt-7">
              {flagshipProject.points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span aria-hidden className="mt-[0.6rem] size-1 shrink-0 rounded-full bg-accent" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8">
            <Pipeline />
          </div>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {flagshipProject.stack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        </Reveal>

        <ul className="mt-5 grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <li key={project.title}>
              <Reveal delay={index * 0.05} className="h-full">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col rounded-2xl border border-line bg-panel p-6 transition-colors hover:border-line-strong hover:bg-raised md:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-xs text-muted">{project.kind}</p>
                      <h3 className="mt-2 text-xl font-semibold tracking-tight">{project.title}</h3>
                    </div>
                    <ArrowUpRight size={20} className="shrink-0 text-subtle transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden />
                  </div>
                  <p className="mt-3 mb-5 flex-1 text-[0.95rem] leading-relaxed text-muted">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </div>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-8">
          <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-muted transition hover:text-fg">
            More on GitHub <ArrowUpRight size={14} aria-hidden />
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
