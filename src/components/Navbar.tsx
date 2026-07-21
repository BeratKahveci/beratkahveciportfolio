"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "./Magnetic";
import { scrollToId } from "@/lib/scroll";
import type { Dict, Locale } from "@/lib/dictionaries";

interface NavbarProps {
  dict: Dict["nav"];
  locale: Locale;
}

export default function Navbar({ dict, locale }: NavbarProps) {
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);

    const showAnim = gsap
      .from(el, { yPercent: -110, paused: true, duration: 0.4 })
      .progress(1);

    const trigger = ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        setScrolled(self.scroll() > 40);
        if (self.direction === -1 || self.scroll() < 80) {
          showAnim.play();
        } else {
          showAnim.reverse();
        }
      },
    });

    return () => {
      trigger.kill();
      showAnim.kill();
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("no-scroll", open);
    return () => document.documentElement.classList.remove("no-scroll");
  }, [open]);

  const otherLocale: Locale = locale === "tr" ? "en" : "tr";

  const go = (id: string) => {
    setOpen(false);
    // Menü kapanış animasyonuna küçük bir pay bırak
    setTimeout(() => scrollToId(id), 50);
  };

  return (
    <>
      <header
        ref={ref}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled && !open
            ? "border-b border-line bg-bg/70 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 sm:h-20 sm:px-10">
          <button
            onClick={() => go("top")}
            className="font-mono text-sm tracking-tight text-fg"
            aria-label="beratkahveci.com.tr"
          >
            ©<span className="font-semibold"> berat</span>
            <span className="text-muted">kahveci</span>
            <span className="text-accent">.com.tr</span>
          </button>

          <div className="hidden items-center gap-8 md:flex">
            {dict.items.map((item) => (
              <Magnetic key={item.id} strength={0.25}>
                <button
                  onClick={() => go(item.id)}
                  className="group relative py-2 text-sm text-muted transition-colors hover:text-fg"
                >
                  {item.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                </button>
              </Magnetic>
            ))}
            <Link
              href={`/${otherLocale}`}
              className="rounded-full border border-line px-3 py-1 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:border-accent hover:text-accent"
              aria-label={dict.langLabel}
            >
              {otherLocale}
            </Link>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <Link
              href={`/${otherLocale}`}
              className="rounded-full border border-line px-3 py-1 font-mono text-xs uppercase tracking-wider text-muted"
              aria-label={dict.langLabel}
            >
              {otherLocale}
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="font-mono text-xs uppercase tracking-wider text-fg"
            >
              {open ? dict.menuClose : dict.menuOpen}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobil tam ekran menü */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-bg px-8 transition-[opacity,visibility] duration-500 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-2">
          {dict.items.map((item, i) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={`flex items-baseline gap-4 py-3 text-left transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${i * 70 + 100}ms` : "0ms" }}
            >
              <span className="font-mono text-xs text-accent">
                0{i + 1}
              </span>
              <span className="font-display text-4xl font-semibold text-fg">
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
