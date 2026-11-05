import Image from "next/image";
import { Container, Reveal, SectionHeading } from "@/components/ui";
import { education, profile } from "@/content/profile";

export function About() {
  return (
    <section id="about" className="border-t border-line py-24 md:py-32">
      <Container>
        <div className="grid items-start gap-10 md:grid-cols-[minmax(0,360px)_1fr] md:gap-16">
          <Reveal className="relative aspect-[4/5] max-w-[360px] overflow-hidden rounded-2xl border border-line">
            <Image
              src="/images/somil-arora.jpg"
              alt="Portrait of Somil Arora in a cream blazer"
              fill
              sizes="(min-width: 768px) 360px, 90vw"
              className="object-cover object-top"
            />
          </Reveal>
          <div>
            <SectionHeading label="About" title="Backend and cloud first, curious about everything above them." />
            <Reveal className="space-y-4 text-lg leading-relaxed text-muted">
              {profile.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Reveal>
            <Reveal className="mt-10 border-t border-line pt-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-lg font-semibold tracking-tight">{education.school}</h3>
                <p className="font-mono text-xs text-muted">{education.period}</p>
              </div>
              <p className="mt-1 text-muted">{education.degree}</p>
              <p className="mt-4 text-sm leading-relaxed text-subtle">{education.courses.join(" · ")}</p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
