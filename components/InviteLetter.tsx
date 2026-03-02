import type { InviteLetterProps } from "@/lib/types";

/**
 * Cartão do convite: fundo off-white, moldura interna (borda fina),
 * estilo convite físico elegante.
 */
function InviteLetter({ children, className = "" }: InviteLetterProps) {
  return (
    <div
      className={`relative bg-[#faf9f6] rounded-sm p-6 sm:p-10 md:p-12 max-w-[min(100%,32rem)] mx-auto ${className}`}
      style={{
        boxShadow: "0 4px 28px rgba(71,103,66,0.14), 0 0 0 1px rgba(71,103,66,0.08)",
      }}
      role="article"
      aria-label="Convite de casamento"
    >
      {/* Moldura interna (estilo convite físico) */}
      <div
        className="absolute inset-4 sm:inset-6 pointer-events-none rounded-sm border border-invite-green-300/80"
        aria-hidden
      />
      <div className="relative">{children}</div>
    </div>
  );
}

export { InviteLetter };
