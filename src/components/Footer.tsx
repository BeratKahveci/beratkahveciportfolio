"use client";

import { useEffect, useState } from "react";
import { scrollToId } from "@/lib/scroll";
import { person, type Dict, type Locale } from "@/lib/dictionaries";

export default function Footer({
  dict,
  locale,
}: {
  dict: Dict["footer"];
  locale: Locale;
}) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", {
      timeZone: "Europe/Istanbul",
      hour: "2-digit",
      minute: "2-digit",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [locale]);

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 text-center font-mono text-xs text-muted sm:flex-row sm:px-10 sm:text-left">
        <p>
          © {new Date().getFullYear()} {person.name} — {dict.rights}
        </p>
        <p className="flex items-center gap-2">
          <span className="text-accent">✦</span> {dict.builtWith}
        </p>
        <div className="flex items-center gap-6">
          <span suppressHydrationWarning>
            {dict.localTime} {time}
          </span>
          <button
            onClick={() => scrollToId("top")}
            className="text-fg transition-colors hover:text-accent"
          >
            {dict.backToTop} ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
