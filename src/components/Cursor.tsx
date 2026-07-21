"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Cursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!finePointer || reduced) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const wrap = wrapRef.current;
    const dot = dotRef.current;
    if (!wrap || !dot) return;

    document.documentElement.classList.add("has-cursor");

    const xTo = gsap.quickTo(wrap, "x", { duration: 0.3, ease: "power3" });
    const yTo = gsap.quickTo(wrap, "y", { duration: 0.3, ease: "power3" });

    let hovered = false;
    let pressed = false;
    const updateScale = () => {
      const scale = hovered ? (pressed ? 3.4 : 4.2) : pressed ? 0.75 : 1;
      gsap.to(dot, { scale, duration: 0.35, ease: "power3.out" });
    };

    let lastX = 0;
    let lastY = 0;
    let lastT = performance.now();
    let relaxTimer: ReturnType<typeof setTimeout> | undefined;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);

      // Hıza göre hareket yönünde esneme (sıvı his)
      const now = performance.now();
      const dt = Math.max(now - lastT, 8);
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const speed = Math.hypot(dx, dy) / dt;
      const stretch = Math.min(speed * 0.32, 0.4);
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      gsap.to(wrap, {
        rotation: `${angle}_short`,
        scaleX: 1 + stretch,
        scaleY: 1 - stretch * 0.55,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
      clearTimeout(relaxTimer);
      relaxTimer = setTimeout(() => {
        gsap.to(wrap, {
          scaleX: 1,
          scaleY: 1,
          duration: 0.4,
          ease: "power3.out",
        });
      }, 90);

      lastX = e.clientX;
      lastY = e.clientY;
      lastT = now;

      if (!visible) {
        visible = true;
        gsap.to(wrap, { opacity: 1, duration: 0.3 });
      }
    };

    const isInteractive = (target: EventTarget | null) =>
      target instanceof Element &&
      target.closest("a, button, [data-cursor], input, textarea, select");

    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target)) {
        hovered = true;
        updateScale();
      }
    };
    const onOut = (e: MouseEvent) => {
      if (isInteractive(e.target)) {
        hovered = false;
        updateScale();
      }
    };
    const onDown = () => {
      pressed = true;
      updateScale();
    };
    const onUp = () => {
      pressed = false;
      updateScale();
    };
    const onLeave = () => {
      visible = false;
      gsap.to(wrap, { opacity: 0, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      clearTimeout(relaxTimer);
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-100 opacity-0 mix-blend-difference"
      style={{ marginLeft: "-7px", marginTop: "-7px" }}
    >
      <div
        ref={dotRef}
        className="h-3.5 w-3.5 rounded-full bg-fg"
      />
    </div>
  );
}
