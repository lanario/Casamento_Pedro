"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SmoothScrollHero from "@/components/ui/smooth-scroll-hero";
import { WEDDING } from "@/lib/wedding";

/** Altura do scroll até a foto do hero preencher 100% da tela. */
export const HERO_SCROLL_HEIGHT = 1500;
const SCROLL_HEIGHT = HERO_SCROLL_HEIGHT;

/** Conteúdo sobreposto ao hero: nomes + data, e indicador de scroll. */
function HeroOverlay() {
  const { scrollY } = useScroll();

  // Logo grande na abertura; some com o decorrer do scroll, antes das
  // margens verdes surgirem por completo ao redor da foto.
  const logoOpacity = useTransform(scrollY, [0, SCROLL_HEIGHT * 0.3], [1, 0]);

  const hintOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const titleOpacity = useTransform(
    scrollY,
    [SCROLL_HEIGHT * 0.45, SCROLL_HEIGHT * 0.75],
    [0, 1],
  );
  const titleY = useTransform(
    scrollY,
    [SCROLL_HEIGHT * 0.45, SCROLL_HEIGHT * 0.75],
    [40, 0],
  );

  return (
    <>
      {/* Logo grande no topo da página inicial, some com o scroll */}
      <motion.div
        style={{ opacity: logoOpacity }}
        className="pointer-events-none absolute inset-x-0 top-6 flex justify-center"
      >
        <span
          className="block h-16 w-16 bg-sage-900"
          style={{
            WebkitMaskImage: "url(/logo.svg)",
            maskImage: "url(/logo.svg)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskSize: "contain",
            maskSize: "contain",
          }}
        />
      </motion.div>

      {/* Gradiente para legibilidade do texto */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-sage-950/80 via-sage-950/25 to-transparent" />

      {/* Nomes + data revelados conforme o scroll */}
      <motion.div
        style={{ opacity: titleOpacity, y: titleY }}
        className="pointer-events-none absolute inset-x-0 bottom-16 flex flex-col items-center px-6 text-center text-cream"
      >
        <h1
          className="whitespace-nowrap font-script leading-tight drop-shadow-lg"
          // min() em vez de clamp(): sem piso em rem, a linha única sempre
          // encolhe junto com a viewport e nunca alarga a página.
          style={{ fontSize: "min(8vw, 4rem)" }}
        >
          {WEDDING.couple.display}
        </h1>
        <p className="mt-3 text-sm font-semibold tracking-[0.35em] text-cream/90 md:text-base">
          {WEDDING.date.short}
        </p>
      </motion.div>

      {/* Indicador de scroll, some ao rolar */}
      <motion.div
        style={{ opacity: hintOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-1 text-cream/90"
      >
        <span className="text-xs font-medium tracking-[0.25em] uppercase">
          Deslize
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5" aria-hidden />
        </motion.span>
      </motion.div>
    </>
  );
}

export default function HeroSection() {
  return (
    <section id="topo" aria-label="Abertura do convite">
      <SmoothScrollHero
        scrollHeight={SCROLL_HEIGHT}
        desktopImage="/casal_3.jpeg"
        mobileImage="/casal_3.jpeg"
        initialClipPercentage={25}
        finalClipPercentage={75}
        backgroundPosition="center 50%"
      >
        <HeroOverlay />
      </SmoothScrollHero>
    </section>
  );
}
