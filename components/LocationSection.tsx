"use client";

import { motion } from "framer-motion";
import { Navigation } from "lucide-react";
import { WEDDING } from "@/lib/wedding";
import { useGsapReveal } from "@/lib/useGsapReveal";

const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  `${WEDDING.venue.street}, ${WEDDING.venue.neighborhood}`,
)}&output=embed`;

export default function LocationSection() {
  const ref = useGsapReveal<HTMLElement>(0.12);

  return (
    <section
      ref={ref}
      id="localizacao"
      aria-label={WEDDING.location.title}
      className="mx-auto max-w-3xl px-4 py-16 md:py-24"
    >
      <h2 data-reveal className="text-center font-script text-5xl text-sage-900 md:text-6xl">
        {WEDDING.location.title}
      </h2>
      <p data-reveal className="mt-3 text-center text-sm font-semibold tracking-widest uppercase text-sage-500">
        {WEDDING.location.subtitle}
      </p>

      <div
        data-reveal
        className="relative mt-10 overflow-hidden rounded-[2rem] border border-sage-300/40 shadow-xl shadow-sage-900/20"
      >
        <iframe
          src={MAPS_EMBED_URL}
          title={`Mapa — ${WEDDING.venue.full}`}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="block aspect-[4/5] w-full border-0 sm:aspect-[16/10]"
        />
      </div>

      <div data-reveal className="mt-8 text-center">
        <p className="font-bold text-sage-900">{WEDDING.venue.full}</p>
        <p className="mt-1 text-sm font-medium text-sage-700">{WEDDING.venue.note}</p>
        <motion.a
          href={WEDDING.venue.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.96 }}
          className="mt-6 inline-flex min-h-[52px] items-center gap-2 rounded-full bg-sage-700 px-8 font-bold text-cream shadow-lg transition hover:bg-sage-900"
        >
          <Navigation className="h-4 w-4" aria-hidden />
          {WEDDING.location.cta}
        </motion.a>
      </div>
    </section>
  );
}
