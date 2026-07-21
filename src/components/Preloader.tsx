"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const SESSION_KEY = "bck-intro-seen";

export default function Preloader({ name }: { name: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const finish = () => {
      window.__appReady = true;
      window.dispatchEvent(new Event("app:ready"));
      document.documentElement.classList.remove("no-scroll");
      setDone(true);
    };

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (sessionStorage.getItem(SESSION_KEY) || reduced) {
      finish();
      return;
    }
    sessionStorage.setItem(SESSION_KEY, "1");
    document.documentElement.classList.add("no-scroll");

    const el = ref.current;
    if (!el) {
      finish();
      return;
    }

    const letters = el.querySelectorAll("[data-letter]");
    const tl = gsap.timeline({ onComplete: finish });
    tl.fromTo(
      letters,
      { yPercent: 120, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.035,
        ease: "power3.out",
        delay: 0.2,
      }
    )
      .to(el.querySelector("[data-bar]"), {
        scaleX: 1,
        duration: 0.9,
        ease: "power2.inOut",
      })
      .to(letters, {
        yPercent: -120,
        opacity: 0,
        duration: 0.5,
        stagger: 0.02,
        ease: "power3.in",
      })
      .to(
        el,
        { yPercent: -100, duration: 0.8, ease: "power4.inOut" },
        "-=0.15"
      );

    return () => {
      tl.kill();
    };
  }, []);

  if (done) return null;

  const words = name.split(" ");

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-6 bg-bg"
      aria-hidden
    >
      <div className="flex flex-wrap justify-center gap-x-4 px-6 font-display text-3xl font-medium tracking-tight text-fg sm:text-5xl">
        {words.map((word, wi) => (
          <span key={wi} className="flex overflow-hidden py-1">
            {word.split("").map((ch, ci) => (
              <span key={ci} data-letter className="inline-block opacity-0">
                {ch}
              </span>
            ))}
          </span>
        ))}
      </div>
      <div className="h-px w-40 overflow-hidden bg-line">
        <div
          data-bar
          className="h-full w-full origin-left scale-x-0 bg-accent"
        />
      </div>
    </div>
  );
}
