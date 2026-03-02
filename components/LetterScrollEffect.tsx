"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const COUPLE_IMAGE_SELECTOR = "[data-couple-image]";

/**
 * Aplica efeito sutil de scroll (fade-in + leve movimento) na foto do casal
 * quando a carta está visível e o usuário faz scroll. Respeita prefers-reduced-motion.
 */
function LetterScrollEffect({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const target = container.querySelector(COUPLE_IMAGE_SELECTOR);
    if (!target) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        target,
        { opacity: 0.6, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: target,
            start: "top 88%",
            end: "top 40%",
            scrub: 0.8,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return <div ref={containerRef}>{children}</div>;
}

export { LetterScrollEffect };
