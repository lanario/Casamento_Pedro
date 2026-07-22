"use client";

import { useEffect, useState } from "react";
import { CalendarHeart, Clock3, MapPin } from "lucide-react";
import { WEDDING } from "@/lib/wedding";
import { useGsapReveal } from "@/lib/useGsapReveal";
import VerseArc from "@/components/VerseArc";

type Countdown = { dias: number; horas: number; min: number; seg: number };

function getCountdown(): Countdown | null {
  const diff = new Date(WEDDING.date.iso).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    dias: Math.floor(diff / 86_400_000),
    horas: Math.floor(diff / 3_600_000) % 24,
    min: Math.floor(diff / 60_000) % 60,
    seg: Math.floor(diff / 1_000) % 60,
  };
}

function CountdownChips() {
  // Inicia vazio para evitar divergência de hidratação
  const [count, setCount] = useState<Countdown | null>(null);

  useEffect(() => {
    setCount(getCountdown());
    const id = setInterval(() => setCount(getCountdown()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!count) return <div className="h-[74px]" aria-hidden />;

  const entries = Object.entries(count) as [keyof Countdown, number][];

  return (
    <div className="flex justify-center gap-3" role="timer" aria-label="Contagem regressiva para o casamento">
      {entries.map(([label, value]) => (
        <div
          key={label}
          className="flex w-[72px] flex-col items-center rounded-2xl border border-sage-300/50 bg-white/50 py-2.5 shadow-sm backdrop-blur-sm"
        >
          <span className="text-2xl font-bold tabular-nums text-sage-900">
            {String(value).padStart(2, "0")}
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-sage-500">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function InfoSection() {
  const ref = useGsapReveal<HTMLElement>(0.12);

  return (
    <section
      ref={ref}
      aria-label="Informações do casamento"
      className="mx-auto max-w-2xl px-6 pt-8 pb-20 text-center md:pt-12 md:pb-28"
    >
      <VerseArc
        quote={WEDDING.blessingVerse.quote}
        reference={WEDDING.blessingVerse.reference}
      />

      <h2
        data-reveal
        className="mt-6 whitespace-nowrap font-script leading-tight text-sage-900"
        style={{ fontSize: "clamp(1.9rem, 9vw, 4.5rem)" }}
      >
        {WEDDING.couple.display}
      </h2>

      <p
        data-reveal
        className="mt-6 whitespace-nowrap px-2 font-bold uppercase text-sage-700"
        style={{
          fontSize: "clamp(0.55rem, 2.6vw, 0.875rem)",
          letterSpacing: "clamp(0.05em, 1vw, 0.3em)",
        }}
      >
        {WEDDING.blessing}
      </p>

      <div data-reveal className="mx-auto mt-8 grid max-w-md grid-cols-2 divide-x divide-sage-300/60">
        <div className="text-center">
          <p className="flex items-center justify-center gap-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-sage-400">
            <span className="h-1 w-1 rounded-full bg-sage-400" aria-hidden />
            Pais da noiva
          </p>
          <p className="mt-1.5 text-sm font-bold text-sage-900">
            {WEDDING.parents.bride.names[0]}
          </p>
          <p className="text-sm font-bold text-sage-900">
            {WEDDING.parents.bride.names[1]}
          </p>
        </div>

        <div className="text-center">
          <p className="flex items-center justify-center gap-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-sage-400">
            <span className="h-1 w-1 rounded-full bg-sage-400" aria-hidden />
            Pais do noivo
          </p>
          <p className="mt-1.5 text-sm font-bold text-sage-900">
            {WEDDING.parents.groom.names[0]}
          </p>
          <p className="text-sm font-bold text-sage-900">
            {WEDDING.parents.groom.names[1]}
          </p>
        </div>
      </div>

      <p data-reveal className="mt-10 text-base font-medium text-sage-700 italic md:text-lg">
        {WEDDING.opening}
      </p>

      <div data-reveal className="mx-auto mt-10 max-w-xs space-y-5 rounded-2xl border border-sage-300/50 bg-white/40 px-6 py-6">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-sage-400">
            Quando
          </p>
          <p className="mt-1.5 flex items-center justify-center gap-2 text-lg font-bold text-sage-900">
            <CalendarHeart className="h-5 w-5 text-sage-500" aria-hidden />
            {WEDDING.date.weekdayLine}
          </p>
          <p className="mt-0.5 text-sm font-semibold tracking-widest uppercase text-sage-500">
            {WEDDING.date.yearLine}
          </p>
        </div>

        <div className="border-t border-sage-300/50 pt-5">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-sage-400">
            Horário
          </p>
          <p className="mt-1.5 flex items-center justify-center gap-2 text-lg font-bold text-sage-900">
            <Clock3 className="h-5 w-5 text-sage-500" aria-hidden />
            {WEDDING.date.timeLine}
          </p>
        </div>

        <div className="border-t border-sage-300/50 pt-5">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-sage-400">
            Onde
          </p>
          <p className="mt-1.5 flex items-center justify-center gap-2 text-sm font-bold text-sage-900">
            <MapPin className="h-4 w-4 text-sage-500 shrink-0" aria-hidden />
            {WEDDING.venue.full}
          </p>
        </div>
      </div>

      <div data-reveal className="mt-12">
        <CountdownChips />
      </div>
    </section>
  );
}
