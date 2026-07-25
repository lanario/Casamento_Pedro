"use client";

import { motion } from "framer-motion";
import { Navigation } from "lucide-react";
import { WEDDING } from "@/lib/wedding";
import { useGsapReveal } from "@/lib/useGsapReveal";

const venues = [WEDDING.ceremony, WEDDING.reception];

function embedUrl(street: string, neighborhood: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(
    `${street}, ${neighborhood}`,
  )}&output=embed`;
}

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

      <div className="mt-10 space-y-14">
        {venues.map((venue) => (
          <div key={venue.label} id={`localizacao-${venue.slug}`} data-reveal className="scroll-mt-8">
            <p className="text-center text-sm font-bold tracking-widest uppercase text-sage-700">
              {venue.label} · Às {venue.time}
            </p>

            <div className="relative mt-4 overflow-hidden rounded-[2rem] border border-sage-300/40 shadow-xl shadow-sage-900/20">
              <iframe
                src={embedUrl(venue.street, venue.neighborhood)}
                title={`Mapa — ${venue.full}`}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="block aspect-[4/5] w-full border-0 sm:aspect-[16/10]"
              />
            </div>

            <div className="mt-8 text-center">
              <p className="font-bold text-sage-900">{venue.name}</p>
              <p className="mt-1 text-sm font-medium text-sage-700">{venue.full}</p>
              <motion.a
                href={venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.96 }}
                className="mt-6 inline-flex min-h-[52px] items-center gap-2 rounded-full bg-sage-700 px-8 font-bold text-cream shadow-lg transition hover:bg-sage-900"
              >
                <Navigation className="h-4 w-4" aria-hidden />
                {WEDDING.location.cta}
              </motion.a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
