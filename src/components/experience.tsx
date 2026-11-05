import { Container, Reveal, SectionHeading, Tag } from "@/components/ui";
import { gaotek, ibm } from "@/content/profile";

function RoleHeader({ company, role, period, location }: { company: string; role: string; period: string; location: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
      <h3 className="text-2xl font-semibold tracking-tight">
        {company} <span className="font-normal text-muted">· {role}</span>
      </h3>
      <p className="font-mono text-xs text-muted">
        {period} / {location}
      </p>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32">
      <Container>
        <SectionHeading label="Experience" title="Production work on enterprise cloud software." />

        <Reveal>
          <RoleHeader company={ibm.company} role={ibm.role} period={ibm.period} location={ibm.location} />
          <p className="mt-4 max-w-3xl leading-relaxed text-muted">{ibm.summary}</p>
        </Reveal>

        <ol className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-6">
          {ibm.highlights.map((item, index) => (
            <li key={item.title} className={`bg-panel ${index < 2 ? "md:col-span-3" : "md:col-span-2"}`}>
              <Reveal delay={index * 0.04} className="flex h-full flex-col p-6 md:p-7">
                <p className="font-mono text-xs text-accent">{item.figure}</p>
                <h4 className="mt-3 text-lg font-semibold tracking-tight">{item.title}</h4>
                <p className="mt-2 mb-5 flex-1 text-[0.95rem] leading-relaxed text-muted">{item.body}</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-16 border-t border-line pt-8">
          <RoleHeader company={gaotek.company} role={gaotek.role} period={gaotek.period} location={gaotek.location} />
          <ul className="mt-6 grid gap-5 text-[0.95rem] leading-relaxed text-muted md:grid-cols-3">
            {gaotek.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
