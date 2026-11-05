import { Fragment } from "react";

const stages = [
  { title: "Event streams", detail: "High-throughput sources" },
  { title: "Apache Kafka", detail: "Partitioned topics" },
  { title: "Spring Boot workers", detail: "Parallel consumer groups" },
];

const outputs = [
  { title: "React KPI dashboard", detail: "AWS QuickSight" },
  { title: "Alerting", detail: "AWS SNS/SQS" },
];

function Link({ delay = 0 }: { delay?: number }) {
  return (
    <div aria-hidden className="relative mx-auto h-7 w-px shrink-0 bg-line-strong lg:mx-0 lg:h-px lg:w-auto lg:flex-1">
      <span className="absolute left-1/2 size-1.5 -translate-x-1/2 animate-flow-y rounded-full bg-accent lg:hidden" style={{ animationDelay: `${delay}s` }} />
      <span className="absolute -top-[2.5px] hidden size-1.5 animate-flow rounded-full bg-accent lg:block" style={{ animationDelay: `${delay}s` }} />
    </div>
  );
}

function Stage({ title, detail, highlight = false }: { title: string; detail: string; highlight?: boolean }) {
  return (
    <div className={`relative z-10 w-full rounded-xl border bg-raised px-4 py-3 lg:w-[176px] ${highlight ? "border-accent/50" : "border-line-strong"}`}>
      <p className="text-sm font-medium">{title}</p>
      <p className="mt-0.5 font-mono text-[0.7rem] text-muted">{detail}</p>
    </div>
  );
}

/** Data flow of the Smart Event Processing platform, drawn with HTML so it reflows on phones. */
export function Pipeline() {
  return (
    <figure aria-label="Events flow from streams through Kafka to Spring Boot workers, then to a dashboard and to alerting" className="grain-grid rounded-xl border border-line p-5 md:p-8">
      <div className="flex flex-col lg:flex-row lg:items-center">
        {stages.map((stage, index) => (
          <Fragment key={stage.title}>
            <Stage {...stage} highlight={stage.title === "Apache Kafka"} />
            <Link delay={index * 0.5} />
          </Fragment>
        ))}
        <div className="flex flex-col gap-3">
          {outputs.map((output) => (
            <Stage key={output.title} {...output} />
          ))}
        </div>
      </div>
    </figure>
  );
}
