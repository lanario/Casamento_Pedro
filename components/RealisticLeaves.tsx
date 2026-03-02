"use client";

import { useId } from "react";

/**
 * Folhas em SVG com formas orgânicas para decoração do convite.
 * Estilo eucalipto/ramo natural, sem aparência de ícone.
 */

const leafColors = {
  light: "rgba(163, 198, 156, 0.52)",
  medium: "rgba(140, 174, 134, 0.58)",
  dark: "rgba(117, 151, 111, 0.5)",
} as const;

/** Verde sálvia/desaturado para o estilo desenho botânico (linha fina + preenchimento suave) */
const botanicalColors = {
  stroke: "rgba(118, 138, 118, 0.65)",
  fill: "rgba(163, 178, 163, 0.25)",
  vein: "rgba(118, 138, 118, 0.35)",
} as const;

/**
 * Ramo no estilo desenho botânico: caule com folhas alongadas e pontiagudas
 * (estilo oliveira), alternadas, linha fina, preenchimento suave e nervuras discretas.
 */
function BotanicalSprig({
  className = "",
  width = 80,
  height = 120,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  const strokeWidth = Math.max(0.4, (width / 80) * 0.4);
  return (
    <svg
      viewBox="0 0 80 120"
      width={width}
      height={height}
      className={className}
      aria-hidden
    >
      {/* Caule — linha fina */}
      <path
        d="M40 6 Q39 50 40 95 L40 114"
        fill="none"
        stroke={botanicalColors.stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Folha 1 — esquerda: alongada, pontas finas (estilo oliveira) */}
      <path
        d="M40 16 L24 24 L26 32 L24 40 L40 48 L56 40 L54 32 L56 24 Z"
        fill={botanicalColors.fill}
        stroke={botanicalColors.stroke}
        strokeWidth={strokeWidth}
      />
      <path d="M40 18 L40 46" stroke={botanicalColors.vein} strokeWidth={strokeWidth * 0.45} fill="none" />
      {/* Folha 2 — direita */}
      <path
        d="M40 46 L56 54 L54 62 L56 70 L40 78 L24 70 L26 62 L24 54 Z"
        fill={botanicalColors.fill}
        stroke={botanicalColors.stroke}
        strokeWidth={strokeWidth}
      />
      <path d="M40 48 L40 76" stroke={botanicalColors.vein} strokeWidth={strokeWidth * 0.45} fill="none" />
      {/* Folha 3 — esquerda */}
      <path
        d="M40 76 L24 84 L26 92 L24 100 L40 108 L56 100 L54 92 L56 84 Z"
        fill={botanicalColors.fill}
        stroke={botanicalColors.stroke}
        strokeWidth={strokeWidth}
      />
      <path d="M40 78 L40 106" stroke={botanicalColors.vein} strokeWidth={strokeWidth * 0.45} fill="none" />
      {/* Folha 4 (topo) — central, menor */}
      <path
        d="M40 104 L30 110 L32 116 L40 118 L48 116 L50 110 Z"
        fill={botanicalColors.fill}
        stroke={botanicalColors.stroke}
        strokeWidth={strokeWidth}
      />
      <path d="M40 106 L40 116" stroke={botanicalColors.vein} strokeWidth={strokeWidth * 0.45} fill="none" />
    </svg>
  );
}

/** Folha alongada (estilo eucalipto) — path orgânico com nervura central */
function LeafEucalyptus({
  className = "",
  width = 48,
  height = 24,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 48 24"
      width={width}
      height={height}
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={`leaf-euc-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={leafColors.light} />
          <stop offset="100%" stopColor={leafColors.medium} />
        </linearGradient>
      </defs>
      <path
        d="M2 12 Q8 4 24 2 Q40 4 46 12 Q40 20 24 22 Q8 20 2 12 Z"
        fill={`url(#leaf-euc-${id})`}
        stroke="rgba(117, 151, 111, 0.22)"
        strokeWidth="0.4"
      />
      <path
        d="M24 3 L24 21"
        stroke="rgba(71, 103, 66, 0.18)"
        strokeWidth="0.35"
        fill="none"
      />
    </svg>
  );
}

/** Folha mais arredondada (estilo oliveira/hera) */
function LeafRound({
  className = "",
  width = 32,
  height = 28,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      viewBox="0 0 32 28"
      width={width}
      height={height}
      className={className}
      aria-hidden
    >
      <path
        d="M16 2 C8 6 4 14 6 20 C8 26 14 27 16 26 C18 27 24 26 26 20 C28 14 24 6 16 2 Z"
        fill={leafColors.medium}
        stroke="rgba(117, 151, 111, 0.2)"
        strokeWidth="0.3"
      />
      <path
        d="M16 5 L16 24"
        stroke="rgba(71, 103, 66, 0.15)"
        strokeWidth="0.3"
        fill="none"
      />
    </svg>
  );
}

/** Ramo com folhas orgânicas — para cantos e decoração */
function LeafSprig({
  className = "",
  size = 64,
}: {
  className?: string;
  size?: number;
}) {
  const id = useId().replace(/:/g, "");
  const s = size / 64;
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={`sprig-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={leafColors.light} />
          <stop offset="100%" stopColor={leafColors.dark} />
        </linearGradient>
      </defs>
      {/* Folha central — formato mais natural */}
      <path
        d="M32 6 C22 10 14 22 16 36 C18 48 26 56 32 55 C38 56 46 48 48 36 C50 22 42 10 32 6 Z"
        fill={`url(#sprig-${id})`}
        stroke="rgba(94, 127, 89, 0.18)"
        strokeWidth={0.5 * s}
      />
      <path d="M32 10 L32 53" stroke="rgba(71, 103, 66, 0.1)" strokeWidth={0.28 * s} fill="none" />
      {/* Folha lateral esquerda */}
      <path
        d="M20 26 C16 30 18 38 24 42 C28 40 28 34 26 30 C24 27 22 26 20 26 Z"
        fill={leafColors.medium}
        stroke="rgba(117, 151, 111, 0.15)"
        strokeWidth={0.28 * s}
        transform="rotate(-28 22 34)"
      />
      {/* Folha lateral direita */}
      <path
        d="M44 28 C48 32 46 40 40 44 C36 42 36 36 38 32 C40 29 42 28 44 28 Z"
        fill={leafColors.medium}
        stroke="rgba(117, 151, 111, 0.15)"
        strokeWidth={0.28 * s}
        transform="rotate(28 42 36)"
      />
    </svg>
  );
}

/** Decoração de canto: ramo botânico (estilo desenho — caule e folhas alternadas) */
function CornerLeaves({
  position,
  className = "",
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}) {
  const rotations = {
    "top-left": "-rotate-45",
    "top-right": "rotate-45",
    "bottom-left": "-rotate-[225deg]",
    "bottom-right": "rotate-[225deg]",
  };
  const positions = {
    "top-left": "top-4 left-4 sm:top-6 sm:left-6",
    "top-right": "top-4 right-4 sm:top-6 sm:right-6",
    "bottom-left": "bottom-4 left-4 sm:bottom-6 sm:left-6",
    "bottom-right": "bottom-4 right-4 sm:bottom-6 sm:right-6",
  };
  return (
    <div
      className={`absolute ${positions[position]} ${rotations[position]} ${className}`}
      aria-hidden
    >
      <BotanicalSprig width={56} height={84} />
    </div>
  );
}

/** Ramo botânico atrás da foto do casal */
function PhotoAccentLeaf({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <BotanicalSprig width={64} height={96} className="opacity-70" />
    </div>
  );
}

/**
 * Moldura densa de folhagem cercando todo o convite (bordas floridas).
 * Múltiplos ramos ao longo do topo, base e laterais, com sobreposição e tons de verde.
 */
function FoliageBorder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[2rem] ${className}`}
      aria-hidden
    >
      {/* Linha interna sutil */}
      <div className="absolute inset-3 sm:inset-5 border border-invite-green-100/25 rounded-[1.5rem]" />

      {/* Topo — fileira densa de ramos */}
      <div className="absolute top-0 left-0 right-0 h-24 flex justify-around items-start">
        <BotanicalSprig width={52} height={78} className="-translate-y-10 rotate-180 opacity-80" />
        <BotanicalSprig width={48} height={72} className="-translate-y-8 rotate-180 opacity-75 scale-95" />
        <BotanicalSprig width={56} height={84} className="-translate-y-12 rotate-180 opacity-85" />
        <BotanicalSprig width={44} height={66} className="-translate-y-6 rotate-180 opacity-70 scale-90" />
        <BotanicalSprig width={50} height={75} className="-translate-y-10 rotate-180 opacity-80" />
      </div>
      {/* Base */}
      <div className="absolute bottom-0 left-0 right-0 h-24 flex justify-around items-end">
        <BotanicalSprig width={50} height={75} className="translate-y-10 opacity-80" />
        <BotanicalSprig width={46} height={69} className="translate-y-8 opacity-75 scale-95" />
        <BotanicalSprig width={54} height={81} className="translate-y-12 opacity-85" />
        <BotanicalSprig width={42} height={63} className="translate-y-6 opacity-70 scale-90" />
        <BotanicalSprig width={48} height={72} className="translate-y-10 opacity-80" />
      </div>
      {/* Lateral esquerda — ramos empilhados */}
      <div className="absolute left-0 top-0 bottom-0 w-20 flex flex-col justify-around items-start">
        <BotanicalSprig width={38} height={57} className="-translate-x-8 -rotate-90 opacity-75" />
        <BotanicalSprig width={42} height={63} className="-translate-x-6 -rotate-90 opacity-80" />
        <BotanicalSprig width={36} height={54} className="-translate-x-10 -rotate-90 opacity-70" />
        <BotanicalSprig width={40} height={60} className="-translate-x-7 -rotate-90 opacity-78" />
      </div>
      {/* Lateral direita */}
      <div className="absolute right-0 top-0 bottom-0 w-20 flex flex-col justify-around items-end">
        <BotanicalSprig width={38} height={57} className="translate-x-8 rotate-90 opacity-75" />
        <BotanicalSprig width={42} height={63} className="translate-x-6 rotate-90 opacity-80" />
        <BotanicalSprig width={36} height={54} className="translate-x-10 rotate-90 opacity-70" />
        <BotanicalSprig width={40} height={60} className="translate-x-7 rotate-90 opacity-78" />
      </div>

      {/* Cantos mais densos — clusters sobrepostos */}
      <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
        <BotanicalSprig width={64} height={96} className="-rotate-45 opacity-85" />
        <BotanicalSprig width={48} height={72} className="-rotate-30 opacity-65 translate-x-2 translate-y-1" />
      </div>
      <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
        <BotanicalSprig width={64} height={96} className="rotate-45 opacity-85" />
        <BotanicalSprig width={48} height={72} className="rotate-30 opacity-65 -translate-x-2 translate-y-1" />
      </div>
      <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
        <BotanicalSprig width={64} height={96} className="-rotate-[225deg] opacity-85" />
        <BotanicalSprig width={48} height={72} className="-rotate-[210deg] opacity-65 translate-x-2 -translate-y-1" />
      </div>
      <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3">
        <BotanicalSprig width={64} height={96} className="rotate-[225deg] opacity-85" />
        <BotanicalSprig width={48} height={72} className="rotate-[210deg] opacity-65 -translate-x-2 -translate-y-1" />
      </div>
    </div>
  );
}

export { BotanicalSprig, CornerLeaves, PhotoAccentLeaf, FoliageBorder, LeafSprig, LeafEucalyptus, LeafRound };
