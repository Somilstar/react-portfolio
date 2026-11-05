import { Container, Reveal, SectionHeading } from "@/components/ui";
import { skills } from "@/content/profile";

export function Skills() {
  return (
    <section id="skills" className="border-t border-line py-24 md:py-32">
      <Container>
        <SectionHeading label="Skills" title="From the database to the model API." />
        <Reveal>
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <div key={skill.group} className="bg-panel p-6 md:p-7">
                <dt className="font-medium tracking-tight">{skill.group}</dt>
                <dd className="mt-3 text-[0.95rem] leading-[1.75] text-muted">{skill.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
