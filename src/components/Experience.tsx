"use client";

import SectionHeading from "./SectionHeading";
import { useReveal } from "@/lib/useReveal";
import type { Dict } from "@/lib/dictionaries";

export default function Experience({ dict }: { dict: Dict["experience"] }) {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} id="experience" className="py-28 sm:py-40">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading label={dict.label} title={dict.title} />
          </div>

          <div>
            {dict.items.map((item, i) => (
              <div
                key={i}
                data-reveal
                className="group border-t border-line py-10 transition-colors first:border-t-0 first:pt-0"
              >
                <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">
                  {item.period}
                </p>
                <h3 className="font-display text-2xl font-semibold tracking-tight text-fg">
                  {item.role}
                </h3>
                <p className="mb-4 mt-1 text-accent">{item.company}</p>
                <ul className="flex max-w-2xl flex-col gap-2">
                  {item.bullets.map((bullet, bi) => (
                    <li
                      key={bi}
                      className="flex gap-3 leading-relaxed text-muted"
                    >
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div
              data-reveal
              className="mt-4 rounded-2xl border border-line bg-surface/50 p-8"
            >
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">
                {dict.educationLabel}
              </p>
              <h3 className="font-display text-xl font-semibold text-fg">
                {dict.education.school}
              </h3>
              <p className="mt-1 text-muted">{dict.education.degree}</p>
              <p className="mt-2 font-mono text-xs text-muted">
                {dict.education.period}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
