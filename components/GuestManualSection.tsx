"use client";

import {
  CheckCircle2,
  CircleUser,
  Cake,
  Mail,
  Camera,
  Landmark,
  PartyPopper,
  Flower2,
  Clock,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GUEST_MANUAL } from "@/lib/constants";
import { BotanicalSprig } from "@/components/RealisticLeaves";

/** Ícones do manual, na mesma ordem de GUEST_MANUAL.items */
const MANUAL_ICONS: LucideIcon[] = [
  CheckCircle2,   // Confirme sua presença
  CircleUser,     // Branco é a cor da noiva
  Cake,           // Aguarde a liberação da mesa de doces
  Mail,           // Convidado não convida
  Camera,         // Não atrapalhe os fotógrafos
  Landmark,       // Participe da cerimônia
  PartyPopper,    // Aproveite bastante
  Flower2,        // Não leve a decoração para casa
  Clock,          // Não atrase, seja pontual
  Users,          // Não saia sem se despedir dos noivos
];

/**
 * Card "Manual dos Convidados": regras de etiqueta em duas colunas com ícone por item.
 */
function GuestManualSection() {
  const half = Math.ceil(GUEST_MANUAL.items.length / 2);
  const leftItems = GUEST_MANUAL.items.slice(0, half).map((text, i) => ({ text, icon: MANUAL_ICONS[i] }));
  const rightItems = GUEST_MANUAL.items.slice(half).map((text, i) => ({ text, icon: MANUAL_ICONS[half + i] }));

  return (
    <article className="bg-[#FAF5E2] p-8 sm:p-12 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-invite-green-100/30 relative overflow-hidden transition-all duration-300 hover:border-invite-green-300/60">
      <div className="absolute top-0 left-0 p-4 text-invite-green-100/30 pointer-events-none">
        <BotanicalSprig width={40} height={60} className="-rotate-45" />
      </div>

      <div className="relative z-10">
        <h2 className="text-2xl sm:text-3xl font-light font-serif tracking-tight text-invite-green-900 text-center mb-8">
          {GUEST_MANUAL.title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 sm:gap-y-5 max-w-2xl mx-auto text-left">
          <ul className="space-y-4 sm:space-y-5">
            {leftItems.map(({ text, icon: Icon }, i) => (
              <li
                key={i}
                className="text-base sm:text-lg font-extralight text-invite-green-800 leading-snug flex gap-3 items-start"
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-invite-green-600 shrink-0 mt-0.5" strokeWidth={1.5} aria-hidden />
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <ul className="space-y-4 sm:space-y-5">
            {rightItems.map(({ text, icon: Icon }, i) => (
              <li
                key={i}
                className="text-base sm:text-lg font-extralight text-invite-green-800 leading-snug flex gap-3 items-start"
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-invite-green-600 shrink-0 mt-0.5" strokeWidth={1.5} aria-hidden />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export { GuestManualSection };
