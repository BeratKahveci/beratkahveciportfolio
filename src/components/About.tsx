"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";
import { useReveal } from "@/lib/useReveal";
import { person, type Dict } from "@/lib/dictionaries";

export default function About({ dict }: { dict: Dict["about"] }) {
  const ref = useReveal<HTMLElement>();
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const img = imgRef.current;
    if (!frame || !img) return;
    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const tween = gsap.fromTo(
      img,
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: frame,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section ref={ref} id="about" className="py-28 sm:py-40">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <SectionHeading label={dict.label} title={dict.title} />

        <div className="grid items-start gap-14 lg:grid-cols-[3fr_2fr]">
          <div>
            <p
              data-reveal
              className="font-display text-2xl font-medium leading-snug tracking-tight text-fg sm:text-4xl"
            >
              {dict.statement}
            </p>
            <p
              data-reveal
              className="mt-8 max-w-2xl text-lg leading-relaxed text-muted"
            >
              {dict.paragraph}
            </p>

            <div data-reveal className="mt-12 flex flex-col">
              {dict.facts.map((fact, i) => (
                <div
                  key={i}
                  className="flex items-baseline justify-between gap-6 border-b border-line py-5 first:border-t"
                >
                  <span className="font-mono text-xs uppercase tracking-wider text-muted">
                    {fact.label}
                  </span>
                  <span className="text-right text-fg">{fact.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div data-reveal className="group relative mx-auto w-full max-w-sm lg:mx-0 lg:ml-auto">
            {/* Arkadaki aksan çerçevesi */}
            <div
              aria-hidden
              className="absolute -right-3 -top-3 h-full w-full rounded-2xl border border-accent/30 transition-transform duration-500 group-hover:translate-x-1.5 group-hover:-translate-y-1.5"
            />
            <div
              ref={frameRef}
              className="relative overflow-hidden rounded-2xl border border-line bg-surface"
            >
              <div ref={imgRef} className="relative aspect-3/4 scale-110 will-change-transform">
                <Image
                  src="/portrait-v2.jpg"
                  alt={person.name}
                  fill
                  sizes="(min-width: 1024px) 420px, 90vw"
                  className="object-cover grayscale transition-[filter] duration-700 group-hover:grayscale-60"
                  priority={false}
                />
              </div>
              {/* Alt bilgi şeridi */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-linear-to-t from-bg/90 via-bg/40 to-transparent p-5 pt-16">
                <div>
                  <p className="font-display text-lg font-semibold text-fg">
                    {person.name}
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    {dict.facts[1]?.value}
                  </p>
                </div>
                <span className="h-2.5 w-2.5 rounded-full bg-accent animate-pulse-dot" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
