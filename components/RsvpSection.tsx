"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CircleCheck,
  Loader2,
  Mail,
  Plus,
  SendHorizonal,
  X,
} from "lucide-react";
import { WEDDING } from "@/lib/wedding";
import { useGsapReveal } from "@/lib/useGsapReveal";

type Presence = "accept" | "decline";
type Status = "idle" | "sending" | "success" | "error";

function HeartToggle({ selected }: { selected: boolean }) {
  return (
    <span className={`heart-toggle${selected ? " is-checked" : ""}`} aria-hidden>
      <span className="svg-container">
        <svg viewBox="0 0 24 24" className="svg-outline" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
        </svg>
        <svg viewBox="0 0 24 24" className="svg-filled" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <svg viewBox="0 0 100 100" className="svg-celebrate" xmlns="http://www.w3.org/2000/svg">
          <polygon points="10,10 20,20" />
          <polygon points="90,10 80,20" />
          <polygon points="90,90 80,80" />
          <polygon points="10,90 20,80" />
        </svg>
      </span>
    </span>
  );
}

function XToggle({ selected }: { selected: boolean }) {
  return (
    <span className={`x-toggle${selected ? " is-checked" : ""}`} aria-hidden>
      <span className="x-mark" />
    </span>
  );
}

function PresenceOption({
  label,
  variant,
  selected,
  onSelect,
}: {
  label: string;
  variant: Presence;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      whileTap={{ scale: 0.97 }}
      className={`rsvp-option flex min-h-[64px] flex-1 items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-bold transition-colors ${
        selected
          ? "border-cream/80 bg-cream/20 text-cream"
          : "border-cream/25 bg-cream/5 text-cream/90"
      }`}
    >
      {variant === "accept" ? (
        <HeartToggle selected={selected} />
      ) : (
        <XToggle selected={selected} />
      )}
      {label}
    </motion.button>
  );
}

export default function RsvpSection() {
  const ref = useGsapReveal<HTMLElement>(0.1);
  const [guests, setGuests] = useState<string[]>([""]);
  const [presence, setPresence] = useState<Presence | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const filledGuests = guests.map((g) => g.trim()).filter(Boolean);
  const canSend = filledGuests.length > 0 && presence !== null;

  function updateGuest(index: number, value: string) {
    setGuests((prev) => prev.map((g, i) => (i === index ? value : g)));
  }

  function addGuest() {
    setGuests((prev) => [...prev, ""]);
  }

  function removeGuest(index: number) {
    setGuests((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSend || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ convidados: filledGuests, presenca: presence }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      ref={ref}
      id="rsvp"
      aria-label={WEDDING.rsvp.title}
      className="px-4 py-16 md:py-24"
    >
      <div
        data-reveal
        className="relative mx-auto max-w-xl overflow-hidden rounded-[2rem] bg-gradient-to-b from-sage-500 to-sage-700 px-6 py-12 shadow-xl shadow-sage-900/20 md:px-12"
      >
        {/* Marca d'água decorativa */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-8 -left-8 h-44 w-44 opacity-10"
          style={{
            backgroundColor: "#FAF5E2",
            WebkitMaskImage: "url(/logo.svg)",
            maskImage: "url(/logo.svg)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "contain",
            maskSize: "contain",
          }}
        />

        <div className="relative flex flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cream/30 text-cream">
            <Mail className="h-7 w-7" strokeWidth={1.5} aria-hidden />
          </span>

          <h2 className="mt-5 font-script text-5xl text-cream md:text-6xl">
            {WEDDING.rsvp.title}
          </h2>
          <p className="mt-3 text-sm font-bold text-cream/85">
            {WEDDING.rsvp.deadline}
          </p>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-10 flex flex-col items-center gap-3 pb-2 text-cream"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                >
                  <CircleCheck className="h-14 w-14" strokeWidth={1.5} aria-hidden />
                </motion.span>
                <p className="font-bold">{WEDDING.rsvp.success}</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0, y: -12 }}
                onSubmit={handleSubmit}
                className="mt-8 w-full space-y-4"
              >
                <div className="space-y-3">
                  {guests.map((guest, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={guest}
                        onChange={(e) => updateGuest(index, e.target.value)}
                        placeholder={WEDDING.rsvp.namePlaceholder}
                        aria-label={`${WEDDING.rsvp.namePlaceholder} ${index + 1}`}
                        autoComplete="name"
                        className="w-full rounded-2xl border border-cream/30 bg-cream/10 px-5 py-4 text-sm font-semibold text-cream placeholder:text-cream/60 outline-none transition focus:border-cream/70 focus:bg-cream/15"
                      />
                      {guests.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeGuest(index)}
                          aria-label="Remover convidado"
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-cream/70 transition hover:bg-cream/10 hover:text-cream"
                        >
                          <X className="h-4 w-4" aria-hidden />
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addGuest}
                    className="flex items-center gap-2 text-sm font-bold text-cream/85 transition hover:text-cream"
                  >
                    <Plus className="h-4 w-4" aria-hidden />
                    {WEDDING.rsvp.addGuest}
                  </button>
                </div>

                <div
                  role="radiogroup"
                  aria-label="Confirmação de presença"
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <PresenceOption
                    label={WEDDING.rsvp.accept}
                    variant="accept"
                    selected={presence === "accept"}
                    onSelect={() => setPresence("accept")}
                  />
                  <PresenceOption
                    label={WEDDING.rsvp.decline}
                    variant="decline"
                    selected={presence === "decline"}
                    onSelect={() => setPresence("decline")}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={!canSend || status === "sending"}
                  whileTap={{ scale: 0.97 }}
                  className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-cream/90 px-6 font-bold text-sage-900 shadow-lg transition enabled:hover:bg-cream disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                  ) : (
                    <>
                      {WEDDING.rsvp.send}
                      <SendHorizonal className="h-4 w-4" aria-hidden />
                    </>
                  )}
                </motion.button>

                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    role="alert"
                    className="text-sm font-bold text-cream"
                  >
                    {WEDDING.rsvp.error}
                  </motion.p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
