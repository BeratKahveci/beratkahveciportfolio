import type Lenis from "lenis";

let lenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};

export const getLenis = () => lenis;

export const scrollToId = (id: string) => {
  const target = document.getElementById(id);
  if (!target) return;
  const l = getLenis();
  if (l) {
    l.scrollTo(target, { offset: 0, duration: 1.4 });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
};
