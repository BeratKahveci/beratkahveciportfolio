"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ParticleField from "./ParticleField";
import type { Dict } from "@/lib/dictionaries";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function SplitLine({ text, className }: { text: string; className?: string }) {
  return (
    <span
      className={`mt-[-0.14em] flex flex-wrap gap-x-[0.22em] overflow-hidden pt-[0.14em] ${
        className ?? ""
      }`}
    >
      {text.split(" ").map((word, wi) => (
        <span key={wi} className="flex">
          {word.split("").map((ch, ci) => (
            <span
              key={ci}
              data-hero-letter
              className="inline-block will-change-transform"
            >
              {ch}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

export default function Hero({ dict }: { dict: Dict["hero"] }) {
  const ref = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const letters = el.querySelectorAll("[data-hero-letter]");
    const fades = el.querySelectorAll("[data-hero-fade]");

    gsap.set(letters, { yPercent: 115, opacity: 0 });
    gsap.set(fades, { y: 24, opacity: 0 });

    const tl = gsap.timeline({ paused: true });
    tl.to(letters, {
      yPercent: 0,
      opacity: 1,
      duration: 1.1,
      stagger: 0.032,
      ease: "power4.out",
    }).to(
      fades,
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power3.out" },
      "-=0.6"
    );

    const play = () => tl.play();
    if (window.__appReady) {
      play();
    } else {
      window.addEventListener("app:ready", play, { once: true });
    }

    return () => {
      window.removeEventListener("app:ready", play);
      tl.kill();
      gsap.set([letters, fades], { clearProps: "all" });
    };
  }, []);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden"
    >
      <ParticleField className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-bg to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-40 sm:px-10 sm:pb-20">
        <div
          data-hero-fade
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-line bg-surface/60 px-4 py-2 backdrop-blur-sm"
        >
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse-dot" />
          <span className="font-mono text-xs tracking-wider text-muted uppercase">
            {dict.available}
          </span>
        </div>

        <h1 className="font-display font-semibold uppercase leading-[0.95] tracking-tight">
          <SplitLine
            text={dict.firstLine}
            className="text-[clamp(2.8rem,10vw,9rem)] text-fg"
          />
          <SplitLine
            text={dict.secondLine}
            className="text-stroke text-[clamp(2.8rem,10vw,9rem)]"
          />
        </h1>

        <div className="mt-10 flex flex-col justify-between gap-8 border-t border-line pt-8 sm:flex-row sm:items-end">
          <p
            data-hero-fade
            className="max-w-md text-lg leading-relaxed text-muted"
          >
            {dict.tagline}
          </p>
          <div
            data-hero-fade
            className="flex flex-col gap-1 font-mono text-xs uppercase tracking-wider text-muted sm:text-right"
          >
            <span className="text-fg">{dict.role}</span>
            <span className="text-accent">{dict.focus}</span>
            <span>{dict.location}</span>
          </div>
        </div>
      </div>

      <div
        data-hero-fade
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          {dict.scroll}
        </span>
        <span className="h-8 w-px animate-pulse bg-linear-to-b from-accent to-transparent" />
      </div>
    </section>
  );
}
