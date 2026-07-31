"use client";

import { useRef } from "react";
import { WEDDING } from "@/lib/wedding";
import { useGsapReveal } from "@/lib/useGsapReveal";
import { useFitTextSize } from "@/lib/useFitTextSize";

/**
 * As ilustrações são servidas como <img> comum, sem next/image: o fundo delas já
 * foi achatado para exatamente o creme da página (#FAF5E2), e reencodar no
 * otimizador poderia deslocar essa cor e revelar a moldura da imagem.
 */
const ROWS = [
  {
    src: "/trajes_mulheres.webp",
    alt: "Três convidadas em traje esporte fino: vestido midi rosé, vestido longo azul-marinho e vestido transpassado bege",
  },
  {
    src: "/trajes_homens.webp",
    alt: "Três convidados em traje esporte fino: camisa social bege, azul-claro e cinza com calça de alfaiataria",
  },
];

const COLOR_NAMES = WEDDING.dressCode.colors.map((color) => color.name);
const COLOR_NAME_FIT_OPTIONS = { min: 8, max: 13, margin: 0.95 };

export default function DressCodeSection() {
  const ref = useGsapReveal<HTMLElement>(0.1);
  const { dressCode } = WEDDING;
  const colorsRowRef = useRef<HTMLDivElement>(null);
  const colorNameFontSize = useFitTextSize(
    colorsRowRef,
    "[data-color-col]",
    COLOR_NAMES,
    COLOR_NAME_FIT_OPTIONS,
  );

  return (
    <section
      ref={ref}
      aria-label={dressCode.title}
      className="mx-auto max-w-4xl px-6 py-16 text-center md:py-24"
    >
      <h2 data-reveal className="font-script text-5xl text-sage-900 md:text-6xl">
        {dressCode.title}
      </h2>

      <p
        data-reveal
        className="mt-5 text-lg font-bold uppercase tracking-[0.3em] text-sage-700 md:text-xl"
      >
        {dressCode.dress}
      </p>

      <p
        data-reveal
        className="mt-12 text-sm font-bold uppercase tracking-[0.14em] text-sage-900 md:text-base"
      >
        {dressCode.avoidTitle}
      </p>

      <div
        ref={colorsRowRef}
        data-reveal
        className="mt-8 flex flex-nowrap justify-center gap-x-2 sm:gap-x-8 md:gap-x-16"
      >
        {dressCode.colors.map((color) => (
          <div
            key={color.name}
            data-color-col
            className="flex w-14 flex-col items-center sm:w-24 md:w-28"
          >
            <span
              className="whitespace-nowrap font-bold uppercase tracking-tight text-sage-500 sm:tracking-[0.2em]"
              style={{ fontSize: colorNameFontSize }}
            >
              {color.name}
            </span>
            <span
              aria-hidden
              className="mt-2 h-14 w-14 rounded-full shadow-md ring-1 ring-sage-900/15 sm:mt-3 sm:h-24 sm:w-24 md:h-28 md:w-28"
              style={{ backgroundColor: color.hex }}
            />
            <span className="mt-2 text-[9px] font-bold uppercase leading-tight tracking-tight text-sage-700 sm:mt-3 sm:text-xs sm:tracking-[0.14em]">
              {color.note}
            </span>
          </div>
        ))}
      </div>

      <p
        data-reveal
        className="mx-auto mt-14 max-w-xl text-sm font-bold uppercase leading-relaxed tracking-[0.1em] text-sage-900 md:text-base"
      >
        {dressCode.comfort}
      </p>

      <div
        data-reveal
        className="mt-12 flex flex-col items-center gap-2 md:mt-14 md:flex-row md:items-end md:justify-center md:gap-4"
      >
        {ROWS.map((row) => (
          // eslint-disable-next-line @next/next/no-img-element -- ver nota acima
          <img
            key={row.src}
            src={row.src}
            alt={row.alt}
            width={1000}
            height={881}
            loading="lazy"
            decoding="async"
            className="h-auto w-full max-w-[420px] md:max-w-none md:flex-1"
          />
        ))}
      </div>

      <p
        data-reveal
        className="mt-8 text-[11px] font-bold uppercase tracking-[0.2em] text-sage-500"
      >
        {dressCode.disclaimer}
      </p>
    </section>
  );
}
