"use client";

import SectionHeading from "./SectionHeading";
import { useReveal } from "@/lib/useReveal";
import type { Dict } from "@/lib/dictionaries";

function MarqueeRow({
  items,
  reverse,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const content = [...items, ...items];
  return (
    <div className="flex overflow-hidden border-y border-line py-5 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <div
        className={`flex w-max shrink-0 items-center gap-8 pr-8 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {content.map((item, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span className="font-display text-3xl font-semibold tracking-tight text-fg/80 sm:text-5xl">
              {item}
            </span>
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills({ dict }: { dict: Dict["skills"] }) {
  const ref = useReveal<HTMLElement>();
  const half = Math.ceil(dict.marquee.length / 2);

  return (
    <section ref={ref} id="skills" className="py-28 sm:py-40">
      <div className="mx-auto mb-16 w-full max-w-7xl px-6 sm:px-10">
        <SectionHeading label={dict.label} title={dict.title} />
      </div>

      <div data-reveal className="mb-20 flex flex-col">
        <MarqueeRow items={dict.marquee.slice(0, half)} />
        <MarqueeRow items={dict.marquee.slice(half)} reverse />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          {dict.groups.map((group, gi) => (
            <div
              key={gi}
              data-reveal
              className="rounded-2xl border border-line bg-surface/50 p-8 transition-colors duration-300 hover:border-accent/40"
            >
              <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-accent">
                {group.title}
              </p>
              <ul className="flex flex-col gap-3">
                {group.items.map((item, ii) => (
                  <li key={ii} className="flex items-center gap-3 text-fg/90">
                    <span className="h-1 w-1 rounded-full bg-muted" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
