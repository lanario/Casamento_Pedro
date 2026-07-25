"use client";

import { WEDDING } from "@/lib/wedding";
import { useGsapReveal } from "@/lib/useGsapReveal";

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

export default function DressCodeSection() {
  const ref = useGsapReveal<HTMLElement>(0.1);
  const { dressCode } = WEDDING;

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

      <div data-reveal className="mt-8 flex justify-center gap-12 md:gap-20">
        {dressCode.colors.map((color) => (
          <div key={color.name} className="flex flex-col items-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sage-500">
              {color.name}
            </span>
            <span
              aria-hidden
              className="mt-3 h-24 w-24 rounded-full shadow-md ring-1 ring-sage-900/15 md:h-28 md:w-28"
              style={{ backgroundColor: color.hex }}
            />
            <span className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-sage-700">
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
