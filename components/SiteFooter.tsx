"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart } from "lucide-react";
import { WEDDING } from "@/lib/wedding";

export default function SiteFooter() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.08]);

  return (
    <footer
      ref={ref}
      className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-sage-950 px-6 py-14 text-center text-cream md:min-h-screen md:py-0"
    >
      <motion.div
        aria-hidden
        className="absolute -inset-y-[10%] inset-x-0"
        style={{ y: bgY, scale: bgScale }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/casal_2.jpeg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-sage-950/45" />

      <div className="relative">
        <div
          aria-hidden
          className="mx-auto h-12 w-12"
          style={{
            backgroundColor: "#FAF5E2",
            WebkitMaskImage: "url(/logo.svg)",
            maskImage: "url(/logo.svg)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        />
        <p
          className="mt-4 whitespace-nowrap font-script"
          style={{ fontSize: "clamp(1.6rem, 7vw, 2.25rem)" }}
        >
          {WEDDING.couple.display}
        </p>
        <p className="mt-2 text-sm font-semibold tracking-[0.3em] text-cream/80">
          {WEDDING.date.short}
        </p>
        <p className="mt-6 flex items-center justify-center gap-1.5 text-xs font-medium text-cream/60">
          Feito com <Heart className="h-3.5 w-3.5 fill-current" aria-hidden /> para
          celebrar nosso grande dia
        </p>
      </div>
    </footer>
  );
}
