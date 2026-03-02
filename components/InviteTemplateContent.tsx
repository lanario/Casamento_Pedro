"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { CalendarDays, MapPin, Wine, MailOpen, Send } from "lucide-react";
import { INVITE_COUPLE_NAMES, INVITE_TEMPLATE } from "@/lib/constants";
import { PhotoAccentLeaf, BotanicalSprig } from "@/components/RealisticLeaves";

const TILT_MAX_DEG = 10;
const TILT_PERSPECTIVE = 1000;

/**
 * Conteúdo do convite: cartão com moldura de folhagem, foto em arco, data 25/09/2026 19h.
 */
function InviteTemplateContent() {
  const ceremonyCardRef = useRef<HTMLAnchorElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleCeremonyMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const el = ceremonyCardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const xNorm = (e.clientX - centerX) / (rect.width / 2);
      const yNorm = (e.clientY - centerY) / (rect.height / 2);
      setTilt({
        y: Math.max(-1, Math.min(1, xNorm)) * TILT_MAX_DEG,
        x: Math.max(-1, Math.min(1, -yNorm)) * TILT_MAX_DEG,
      });
    },
    []
  );

  const handleCeremonyMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  type RsvpStatus = "idle" | "loading" | "success" | "error";
  const [rsvpStatus, setRsvpStatus] = useState<RsvpStatus>("idle");
  const [rsvpMessage, setRsvpMessage] = useState("");

  async function handleRsvpSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const nome = (formData.get("guestName") as string)?.trim();
    const attendance = formData.get("attendance") as string | null;

    if (!nome) {
      setRsvpStatus("error");
      setRsvpMessage("Por favor, informe o(s) nome(s) do(s) convidado(s).");
      return;
    }
    if (attendance !== "accept" && attendance !== "decline") {
      setRsvpStatus("error");
      setRsvpMessage("Por favor, escolha se aceita ou não poderá comparecer.");
      return;
    }

    setRsvpStatus("loading");
    setRsvpMessage("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          presenca: attendance,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setRsvpStatus("error");
        setRsvpMessage(data.error || data.detail || "Não foi possível enviar. Tente de novo.");
        return;
      }

      setRsvpStatus("success");
      setRsvpMessage("Resposta enviada com sucesso! Obrigado.");
      form.reset();
    } catch {
      setRsvpStatus("error");
      setRsvpMessage("Erro de conexão. Verifique a internet e tente novamente.");
    }
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8 sm:space-y-12 z-10">
      <div
        className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-invite-green-100/10 via-transparent to-transparent pointer-events-none -z-10"
        aria-hidden
      />

      {/* Convite sobre o fundo floral (flores.jpg) — sem painel branco */}
      <article
        className="rounded-[2.5rem] px-6 py-12 sm:px-16 sm:py-16 text-center flex flex-col items-center relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] group"
        style={{
          backgroundImage: "url(/flores.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 flex flex-col items-center">
          {/* Foto em moldura arqueada (arco em cima, base reta) */}
          <div className="mb-10 relative w-full max-w-[15rem] sm:max-w-[18rem] mx-auto group/img">
            <div className="relative w-full aspect-[3/4] rounded-t-[10rem] rounded-b-none overflow-hidden shadow-[0_8px_24px_rgb(0,0,0,0.12)] ring-4 ring-white/90 z-10">
              <Image
                src="/casal.jpeg"
                alt={`${INVITE_COUPLE_NAMES.bride} e ${INVITE_COUPLE_NAMES.groom}`}
                fill
                sizes="(max-width: 640px) 15rem, 18rem"
                className="object-cover transition-transform duration-1000 ease-out group-hover/img:scale-105"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 z-0">
              <PhotoAccentLeaf className="rotate-12" />
            </div>
          </div>

          {/* Fonte explícita (font-sans) evita FOUT e reflow durante a animação do bloco da carta */}
          <span className="font-sans text-sm sm:text-base font-normal tracking-[0.2em] uppercase text-invite-green-800 mb-5 drop-shadow-sm">
            {INVITE_TEMPLATE.heroInviteLine}
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light font-serif text-invite-green-900 tracking-tight mb-3 drop-shadow-sm">
            {INVITE_COUPLE_NAMES.bride}
            <span className="italic font-extralight text-invite-green-700 mx-2">&</span>
            {INVITE_COUPLE_NAMES.groom}
          </h1>

          <p className="text-lg sm:text-xl font-extralight text-invite-green-800/90 mt-1 mb-8 drop-shadow-sm">
            {INVITE_TEMPLATE.heroSubline}
          </p>

          <div className="w-16 h-px bg-invite-green-700/50 mb-8" />

          <div className="flex flex-col items-center">
            <CalendarDays className="w-9 h-9 text-invite-green-700 mb-4 drop-shadow-sm" strokeWidth={1.5} />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-light font-serif tracking-tight text-invite-green-900 mb-1 drop-shadow-sm">
              {INVITE_TEMPLATE.dateLine1}
            </h2>
            <p className="text-base sm:text-lg font-extralight text-invite-green-800/90 drop-shadow-sm">
              {INVITE_TEMPLATE.dateLine2}
            </p>
            <p className="text-base sm:text-lg font-extralight text-invite-green-800/90 mt-0.5 drop-shadow-sm">
              {INVITE_TEMPLATE.dateLine3}
            </p>
          </div>
        </div>
      </article>

      {/* Grid Cerimônia + Recepção */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <a
          ref={ceremonyCardRef}
          href={INVITE_TEMPLATE.ceremonyMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseMove={handleCeremonyMouseMove}
          onMouseLeave={handleCeremonyMouseLeave}
          className="bg-[#FAF5E2] p-8 sm:p-12 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-invite-green-100/30 flex flex-col items-center text-center transition-[border-color,box-shadow,background-color] duration-300 hover:border-invite-green-300/60 hover:shadow-[0_6px_24px_rgb(0,0,0,0.06)] hover:bg-invite-green-100/5 relative overflow-hidden block no-underline text-inherit"
          style={{
            transform: `perspective(${TILT_PERSPECTIVE}px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: "preserve-3d",
            transition: "transform 0.15s ease-out",
          }}
        >
          <div className="absolute top-0 right-0 p-4 text-invite-green-100/30 pointer-events-none">
            <BotanicalSprig width={40} height={60} className="rotate-45" />
          </div>
          <div className="w-16 h-16 rounded-2xl bg-invite-green-100/10 flex items-center justify-center mb-6 text-invite-green-500 relative z-10">
            <MapPin className="w-8 h-8" strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl sm:text-3xl font-light font-serif tracking-tight text-invite-green-900 mb-3 relative z-10">
            {INVITE_TEMPLATE.ceremonyTitle}
          </h3>
          <p className="text-xl sm:text-2xl font-normal text-invite-green-900 mb-2 relative z-10">
            {INVITE_TEMPLATE.ceremonyVenue}
          </p>
          <p className="text-lg sm:text-xl font-extralight text-invite-green-700 leading-relaxed relative z-10">
            {INVITE_TEMPLATE.ceremonyAddress}
          </p>
        </a>

        <article className="bg-[#FAF5E2] p-8 sm:p-12 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-invite-green-100/30 flex flex-col items-center text-center transition-all duration-300 hover:border-invite-green-300/60 relative overflow-hidden">
          <div className="absolute top-0 left-0 p-4 text-invite-green-100/30 pointer-events-none">
            <BotanicalSprig width={40} height={60} className="-rotate-45" />
          </div>
          <div className="w-16 h-16 rounded-2xl bg-invite-green-100/10 flex items-center justify-center mb-6 text-invite-green-500 relative z-10">
            <Wine className="w-8 h-8" strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl sm:text-3xl font-light font-serif tracking-tight text-invite-green-900 mb-3 relative z-10">
            {INVITE_TEMPLATE.receptionTitle}
          </h3>
          <p className="text-xl sm:text-2xl font-normal text-invite-green-900 mb-2 relative z-10">
            {INVITE_TEMPLATE.receptionVenue}
          </p>
          <p className="text-lg sm:text-xl font-extralight text-invite-green-700 leading-relaxed relative z-10">
            {INVITE_TEMPLATE.receptionNote}
          </p>
        </article>
      </div>

      {/* Seção RSVP */}
      <article className="bg-invite-green-700 rounded-[2.5rem] shadow-lg border border-invite-green-900/20 overflow-hidden text-white relative">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(163,198,156,0.15)_0%,transparent_60%)] pointer-events-none"
          aria-hidden
        />
        <div className="absolute bottom-0 left-0 text-invite-green-100/20 pointer-events-none transform -translate-x-1/4 translate-y-1/4">
          <BotanicalSprig width={100} height={150} className="opacity-60" />
        </div>

        <div className="px-6 py-14 sm:px-16 sm:py-20 flex flex-col items-center text-center relative z-10">
          <MailOpen className="w-12 h-12 text-invite-green-100 mb-6" strokeWidth={1.5} />
          <h2 className="text-4xl sm:text-5xl font-light font-serif tracking-tight mb-3">
            {INVITE_TEMPLATE.rsvpTitle}
          </h2>
          <p className="text-lg sm:text-xl font-extralight text-invite-green-100 mb-10">
            {INVITE_TEMPLATE.rsvpBy}
          </p>

          {rsvpStatus === "success" ? (
            <div className="w-full max-w-lg rounded-2xl border-2 border-invite-green-100/50 bg-white/10 px-8 py-12 text-center">
              <p className="text-3xl sm:text-4xl font-light font-serif tracking-tight text-invite-green-100">
                Enviado
              </p>
              <p className="mt-3 text-lg font-extralight text-white/90">
                Sua resposta foi registrada. Obrigado!
              </p>
            </div>
          ) : (
          <form
            className="w-full max-w-lg space-y-5"
            onSubmit={handleRsvpSubmit}
          >
            <div className="text-left">
              <label htmlFor="guest-name" className="sr-only">
                Nome completo
              </label>
              <input
                type="text"
                id="guest-name"
                name="guestName"
                placeholder={INVITE_TEMPLATE.rsvpNamePlaceholder}
                className="w-full bg-white/5 border border-invite-green-300/40 rounded-2xl px-5 py-4 text-lg font-extralight text-white placeholder-invite-green-100/70 focus:outline-none focus:ring-2 focus:ring-invite-green-100 focus:border-transparent transition-all hover:bg-white/10 backdrop-blur-sm"
                disabled={rsvpStatus === "loading"}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="relative flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-invite-green-300/40 bg-white/5 p-5 hover:bg-white/10 transition-all focus-within:ring-2 focus-within:ring-invite-green-100 backdrop-blur-sm [&:has(input:checked)]:border-invite-green-100 [&:has(input:checked)]:bg-white/15 [&:has(input:checked)]:ring-2 [&:has(input:checked)]:ring-invite-green-100">
                <input
                  type="radio"
                  name="attendance"
                  className="peer sr-only"
                  value="accept"
                  disabled={rsvpStatus === "loading"}
                />
                <div className="relative flex h-6 w-6 shrink-0 items-center justify-center peer-checked:[&_.rsvp-dot]:scale-100 peer-checked:[&>div:first-of-type]:border-invite-green-100">
                  <div className="h-6 w-6 rounded-full border-2 border-invite-green-300 transition-colors" />
                  <div className="rsvp-dot absolute h-3 w-3 rounded-full bg-invite-green-100 scale-0 transition-transform duration-300 ease-out" />
                </div>
                <span className="text-lg font-extralight text-white">
                  {INVITE_TEMPLATE.rsvpAccept}
                </span>
              </label>
              <label className="relative flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-invite-green-300/40 bg-white/5 p-5 hover:bg-white/10 transition-all focus-within:ring-2 focus-within:ring-invite-green-100 backdrop-blur-sm [&:has(input:checked)]:border-invite-green-100 [&:has(input:checked)]:bg-white/15 [&:has(input:checked)]:ring-2 [&:has(input:checked)]:ring-invite-green-100">
                <input
                  type="radio"
                  name="attendance"
                  className="peer sr-only"
                  value="decline"
                  disabled={rsvpStatus === "loading"}
                />
                <div className="relative flex h-6 w-6 shrink-0 items-center justify-center peer-checked:[&_.rsvp-dot]:scale-100 peer-checked:[&>div:first-of-type]:border-invite-green-100">
                  <div className="h-6 w-6 rounded-full border-2 border-invite-green-300 transition-colors" />
                  <div className="rsvp-dot absolute h-3 w-3 rounded-full bg-invite-green-100 scale-0 transition-transform duration-300 ease-out" />
                </div>
                <span className="text-lg font-extralight text-white">
                  {INVITE_TEMPLATE.rsvpDecline}
                </span>
              </label>
            </div>

            {rsvpStatus === "error" && rsvpMessage && (
              <p role="alert" className="text-sm text-red-200">
                {rsvpMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={rsvpStatus === "loading"}
              className="w-full flex items-center justify-center gap-3 bg-invite-green-100 hover:bg-invite-green-300 text-invite-green-900 font-normal text-lg py-4 px-8 rounded-2xl transition-all duration-300 mt-4 shadow-[0_0_20px_rgba(163,198,156,0.4)] hover:shadow-[0_0_24px_rgba(163,198,156,0.5)] transform hover:-translate-y-0.5 disabled:opacity-70 disabled:pointer-events-none border border-invite-green-300/30"
            >
              {/* Spinner à esquerda (padrão Aura): anel com destaque que gira ao enviar */}
              <span className="flex shrink-0 w-6 h-6 items-center justify-center" aria-hidden>
                <span
                  className={`block w-5 h-5 rounded-full border-2 border-invite-green-900/25 ${
                    rsvpStatus === "loading"
                      ? "border-t-invite-green-900 border-r-invite-green-900/60 animate-spin"
                      : "border-t-transparent border-r-transparent"
                  }`}
                />
              </span>
              <span className="flex-1 text-center">
                {rsvpStatus === "loading"
                  ? "Enviando..."
                  : INVITE_TEMPLATE.rsvpSend}
              </span>
              {/* Ícone à direita (envio / ação) */}
              <span className="flex shrink-0 w-6 h-6 flex items-center justify-center" aria-hidden>
                <Send className="w-5 h-5 text-invite-green-900/90" strokeWidth={2} />
              </span>
            </button>
          </form>
          )}
        </div>
      </article>
    </main>
  );
}

export { InviteTemplateContent };
