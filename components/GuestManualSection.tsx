"use client";

import {
  Cake,
  Camera,
  CircleCheck,
  CircleUserRound,
  Clock,
  Flower2,
  Landmark,
  Mail,
  PartyPopper,
  Users,
  type LucideIcon,
} from "lucide-react";
import { WEDDING } from "@/lib/wedding";
import { useGsapReveal } from "@/lib/useGsapReveal";

const MANUAL_ICONS: LucideIcon[] = [
  CircleCheck, // Confirme sua presença
  CircleUserRound, // Branco é a cor da noiva
  Cake, // Aguarde a liberação da mesa de doces
  Mail, // Convidado não convida
  Camera, // Não atrapalhe os fotógrafos
  Landmark, // Participe da cerimônia
  PartyPopper, // Aproveite bastante
  Flower2, // Não leve a decoração para casa
  Clock, // Não atrase, seja pontual
  Users, // Não saia sem se despedir dos noivos
];

export default function GuestManualSection() {
  const ref = useGsapReveal<HTMLElement>(0.08);

  return (
    <section
      ref={ref}
      aria-label={WEDDING.manual.title}
      className="px-4 py-16 md:py-24"
    >
      <div
        data-reveal
        className="mx-auto max-w-3xl rounded-[2rem] bg-gradient-to-b from-sage-500 to-sage-700 px-6 py-12 shadow-xl shadow-sage-900/20 md:px-14"
      >
        <h2 className="text-center font-script text-5xl text-cream md:text-6xl">
          {WEDDING.manual.title}
        </h2>

        <ul className="mt-12 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
          {WEDDING.manual.items.map((item, i) => {
            const Icon = MANUAL_ICONS[i];
            return (
              <li key={item} className="flex items-start gap-3.5">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream/15 text-cream">
                  <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                </span>
                <span className="pt-1.5 font-semibold text-cream/95">{item}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
