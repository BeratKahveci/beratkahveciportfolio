"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";
import { useReveal } from "@/lib/useReveal";
import type { Dict } from "@/lib/dictionaries";

const GRADIENTS: Record<string, string> = {
  "pdks-ai":
    "radial-gradient(130% 130% at 20% 15%, #c8f751 0%, #2f8f66 45%, #0d1f18 100%)",
  airx: "radial-gradient(130% 130% at 80% 15%, #7db2ff 0%, #4b3bbd 50%, #120f2b 100%)",
  invatrix:
    "radial-gradient(130% 130% at 25% 85%, #ffb056 0%, #c8425f 50%, #26101a 100%)",
  corporate:
    "radial-gradient(130% 130% at 75% 80%, #e8e8df 0%, #6a705a 50%, #15170f 100%)",
  everest:
    "radial-gradient(130% 130% at 50% 15%, #a8cdec 0%, #2e5a8c 45%, #070b12 100%)",
};

interface Shot {
  src: string;
  url: string;
  domain: string;
}

const SHOTS: Record<string, Shot[]> = {
  "pdks-ai": [
    { src: "/projects/pdks-ai.jpg", url: "https://pdks.ai", domain: "pdks.ai" },
  ],
  airx: [
    {
      src: "/projects/airx.jpg",
      url: "https://airx.com.tr",
      domain: "airx.com.tr",
    },
  ],
  invatrix: [
    {
      src: "/projects/invatrix.jpg",
      url: "https://invatrix.com",
      domain: "invatrix.com",
    },
  ],
  everest: [
    {
      src: "/projects/everest.jpg",
      url: "https://everest-omega-eight.vercel.app",
      domain: "everest-omega-eight.vercel.app",
    },
  ],
  corporate: [
    {
      src: "/projects/hcdijital.jpg",
      url: "https://hcdijital.com",
      domain: "hcdijital.com",
    },
    {
      src: "/projects/ttopro.jpg",
      url: "https://ttopro.com",
      domain: "ttopro.com",
    },
    {
      src: "/projects/tooldict.jpg",
      url: "https://tooldict.com",
      domain: "tooldict.com",
    },
  ],
};

function BrowserFrame({
  shot,
  className,
  sizes,
}: {
  shot: Shot;
  className?: string;
  sizes: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-bg/30 bg-[#1c1c20] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.65)] ${
        className ?? ""
      }`}
    >
      <div className="flex items-center gap-2 border-b border-bg/30 bg-[#232327] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate rounded-md bg-bg/40 px-2.5 py-0.5 font-mono text-[10px] text-fg/70">
          {shot.domain}
        </span>
      </div>
      <div className="relative aspect-16/10">
        <Image
          src={shot.src}
          alt={shot.domain}
          fill
          sizes={sizes}
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

export default function Projects({ dict }: { dict: Dict["work"] }) {
  const ref = useReveal<HTMLElement>();
  const deckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;
    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    const ctx = gsap.context(() => {
      if (isDesktop) {
        const wraps = gsap.utils.toArray<HTMLElement>("[data-card-wrap]");
        wraps.forEach((wrap, i) => {
          if (i === 0) return;
          const prevCard = wraps[i - 1].querySelector("[data-card]");
          if (!prevCard) return;
          // Sonraki kart üzerine binerken önceki kart küçülüp kararır
          gsap.to(prevCard, {
            scale: 0.92,
            opacity: 0.45,
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          });
        });
      }

      // Görsel panel içindeki çerçevelerde hafif parallax
      gsap.utils.toArray<HTMLElement>("[data-card-visual]").forEach((vis) => {
        gsap.fromTo(
          vis,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: vis,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, deck);

    return () => ctx.revert();
  }, []);

  const total = dict.projects.length;

  return (
    <section ref={ref} id="work" className="relative pt-28 sm:pt-40">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="flex items-end justify-between">
          <SectionHeading label={dict.label} title={dict.title} />
          <p
            data-reveal
            className="mb-14 hidden font-mono text-sm text-muted sm:mb-20 sm:block"
          >
            ({String(total).padStart(2, "0")})
          </p>
        </div>
      </div>

      <div ref={deckRef} className="relative">
        {dict.projects.map((project, i) => {
          const shots = SHOTS[project.slug] ?? [];
          return (
            <div
              key={project.slug}
              data-card-wrap
              className="flex items-center px-4 py-6 sm:px-8 lg:sticky lg:top-0 lg:min-h-svh"
              style={{ zIndex: i + 1 }}
            >
              <article
                data-card
                className="group mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] will-change-transform lg:min-h-[78vh] lg:grid-cols-[1.05fr_1fr]"
              >
                {/* Sol: içerik */}
                <div className="flex flex-col justify-between gap-10 p-7 sm:p-12">
                  <div>
                    <div className="mb-8 flex items-center justify-between font-mono text-xs uppercase tracking-wider">
                      <span className="text-accent">
                        0{i + 1} — 0{total}
                      </span>
                      <span className="text-muted">{project.year}</span>
                    </div>
                    <h3 className="font-display text-4xl font-semibold tracking-tight text-fg sm:text-6xl">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-muted sm:text-lg">
                      {project.category}
                    </p>
                    <p className="mt-8 max-w-lg leading-relaxed text-muted">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider">
                      <span className="text-muted">{dict.roleLabel}</span>
                      <span className="h-px flex-1 bg-line" />
                      <span className="text-fg">{project.role}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-line px-4 py-1.5 font-mono text-xs text-fg/85 transition-colors duration-300 group-hover:border-accent/40"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      {shots.map((shot) => (
                        <a
                          key={shot.domain}
                          href={shot.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs text-fg underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                        >
                          {shots.length > 1 ? shot.domain : dict.visitLabel} ↗
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sağ: gradyan zemin + gerçek site görüntüleri */}
                <div className="relative min-h-80 overflow-hidden sm:min-h-96 lg:min-h-full">
                  <div
                    aria-hidden
                    className="absolute -inset-y-8 inset-x-0"
                    style={{ background: GRADIENTS[project.slug] }}
                  />
                  {/* nokta dokusu */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage:
                        "radial-gradient(rgba(10,10,11,0.5) 1px, transparent 1px)",
                      backgroundSize: "16px 16px",
                    }}
                  />
                  {/* dev indeks filigranı */}
                  <span
                    aria-hidden
                    className="absolute -bottom-10 -right-4 select-none font-display text-[11rem] font-bold leading-none text-bg/25"
                  >
                    0{i + 1}
                  </span>

                  {shots.length === 1 ? (
                    <div
                      data-card-visual
                      className="absolute inset-0 flex items-center justify-center p-6 sm:p-10"
                    >
                      <BrowserFrame
                        shot={shots[0]}
                        sizes="(min-width: 1024px) 480px, 90vw"
                        className="w-full max-w-md -rotate-3 transition-transform duration-700 group-hover:rotate-0 group-hover:scale-[1.03]"
                      />
                    </div>
                  ) : (
                    <div data-card-visual className="absolute inset-0">
                      <BrowserFrame
                        shot={shots[0]}
                        sizes="(min-width: 1024px) 380px, 70vw"
                        className="absolute left-[6%] top-[8%] w-[70%] -rotate-3 transition-transform duration-700 group-hover:-translate-y-1 group-hover:rotate-0"
                      />
                      <BrowserFrame
                        shot={shots[1]}
                        sizes="(min-width: 1024px) 380px, 70vw"
                        className="absolute right-[5%] top-[32%] w-[70%] rotate-2 transition-transform duration-700 group-hover:rotate-0"
                      />
                      <BrowserFrame
                        shot={shots[2]}
                        sizes="(min-width: 1024px) 380px, 70vw"
                        className="absolute bottom-[6%] left-[10%] w-[70%] -rotate-2 transition-transform duration-700 group-hover:translate-y-1 group-hover:rotate-0"
                      />
                    </div>
                  )}
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}
