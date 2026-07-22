"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Revela com ScrollTrigger todos os filhos marcados com [data-reveal]
 * quando a seção entra na viewport. Respeita prefers-reduced-motion.
 */
export function useGsapReveal<T extends HTMLElement>(stagger = 0.1) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = el.querySelectorAll("[data-reveal]");
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y: 36,
        duration: 0.9,
        ease: "power3.out",
        stagger,
        scrollTrigger: {
          trigger: el,
          start: "top 78%",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [stagger]);

  return ref;
}
