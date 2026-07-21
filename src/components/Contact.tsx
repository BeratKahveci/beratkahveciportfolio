"use client";

import Magnetic from "./Magnetic";
import SectionHeading from "./SectionHeading";
import { useReveal } from "@/lib/useReveal";
import { person, type Dict } from "@/lib/dictionaries";

export default function Contact({ dict }: { dict: Dict["contact"] }) {
  const ref = useReveal<HTMLElement>();
  const socials = person.socials.filter((s) => s.href);

  return (
    <section ref={ref} id="contact" className="py-28 sm:py-40">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <SectionHeading label={dict.label} title="" />

        <div className="relative">
          <h2
            data-reveal
            className="font-display text-[clamp(2.4rem,7vw,6.5rem)] font-semibold leading-[1.02] tracking-tight text-fg"
          >
            {dict.titleLine1}
            <br />
            <span className="text-stroke">{dict.titleLine2}</span>
          </h2>

          <div data-reveal className="mt-12 sm:absolute sm:right-0 sm:top-1/2 sm:mt-0 sm:-translate-y-1/3">
            <Magnetic strength={0.3}>
              <a
                href={`mailto:${person.email}`}
                className="flex h-36 w-36 items-center justify-center rounded-full bg-accent text-center font-medium leading-tight text-bg transition-transform duration-300 hover:scale-105 sm:h-44 sm:w-44"
              >
                {dict.cta} ↗
              </a>
            </Magnetic>
          </div>
        </div>

        <div
          data-reveal
          className="mt-20 grid gap-8 border-t border-line pt-10 sm:grid-cols-3"
        >
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted">
              {dict.emailLabel}
            </p>
            <a
              href={`mailto:${person.email}`}
              className="break-all text-fg transition-colors hover:text-accent"
            >
              {person.email}
            </a>
          </div>
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted">
              {dict.phoneLabel}
            </p>
            <a
              href={person.phoneHref}
              className="text-fg transition-colors hover:text-accent"
            >
              {person.phone}
            </a>
          </div>
          {socials.length > 0 && (
            <div>
              <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted">
                {dict.socialsLabel}
              </p>
              <div className="flex gap-5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fg transition-colors hover:text-accent"
                  >
                    {s.label} ↗
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
