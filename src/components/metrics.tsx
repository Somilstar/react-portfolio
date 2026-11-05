"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { Container } from "@/components/ui";
import { metrics } from "@/content/profile";

function Count({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || reducedMotion) return;
    const controls = animate(0, value, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        if (ref.current) ref.current.textContent = `${Math.round(latest)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reducedMotion, suffix, value]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

export function Metrics() {
  return (
    <section aria-label="Impact at IBM" className="border-y border-line bg-panel/40">
      <Container>
        <dl className="grid grid-cols-2 md:grid-cols-5">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`py-7 md:px-6 md:first:pl-0 ${index > 0 ? "md:border-l md:border-line" : ""} ${index === metrics.length - 1 ? "col-span-2 md:col-span-1" : ""}`}
            >
              <dd className="text-4xl font-semibold tracking-[-0.04em] tabular-nums md:text-5xl">
                <Count value={metric.value} suffix={metric.suffix} />
              </dd>
              <dt className="mt-2 text-sm text-muted">{metric.label}</dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
