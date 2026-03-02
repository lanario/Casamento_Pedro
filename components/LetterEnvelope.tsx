"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LetterEnvelopeProps } from "@/lib/types";
import { INVITE_CTA, INVITE_COUPLE_NAMES } from "@/lib/constants";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { LetterScrollEffect } from "@/components/LetterScrollEffect";

const FLAP_OPEN_DURATION = 0.7;
const DELAY_BEFORE_LETTER = 900;
const LETTER_ENTER_DURATION = 0.5;
const EASE_OUT_SMOOTH = [0.25, 0.46, 0.45, 0.94];

type EnvelopeState = "closed" | "flapOpen" | "letterVisible";

function LetterEnvelope({
  isOpen,
  onOpen,
  className = "",
  children,
}: LetterEnvelopeProps) {
  const [state, setState] = useState<EnvelopeState>(
    isOpen ? "letterVisible" : "closed"
  );
  const reducedMotion = useReducedMotion();

  function handleOpen() {
    if (state !== "closed") return;
    onOpen?.();
    if (reducedMotion) {
      setState("letterVisible");
      return;
    }
    setState("flapOpen");
  }

  useEffect(() => {
    if (state !== "flapOpen") return;
    const t = setTimeout(() => setState("letterVisible"), DELAY_BEFORE_LETTER);
    return () => clearTimeout(t);
  }, [state]);

  const showLetter = state === "letterVisible";

  // Dimensões do envelope
  const W = 320; 
  const H = 210; 
  const flapH = 115; 

  return (
    <div className={`flex flex-col items-center justify-center min-h-[70vh] p-4 ${className}`}>
      <AnimatePresence mode="wait">
        {!showLetter ? (
          <motion.div
            key="envelope"
            className="flex flex-col items-center w-full max-w-[320px] cursor-pointer focus:outline-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={handleOpen}
            role="button"
            tabIndex={0}
            aria-label={INVITE_CTA.openEnvelope}
          >
            <div
              className="relative transition-transform duration-300 hover:scale-[1.01] mx-auto"
              style={{
                width: W,
                height: H,
                perspective: "1000px",
              }}
            >
              {/* 1. Corpo do Envelope (Fundo Verde) */}
              <div
                className="absolute inset-0 z-0 rounded-sm bg-invite-green-900 shadow-[0_15px_35px_rgba(0,0,0,0.25)]"
                style={{
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1)",
                }}
              />

              {/*
                2. Texto Centralizado (POR CIMA DE TUDO) 
                z-index: 40 garante que fique acima da aba (z-20) e do selo (z-30)
              */}
              <motion.div
                className="absolute z-40 inset-x-0 flex flex-col items-center justify-center text-center pointer-events-none"
                style={{ top: "35px" }}
                animate={state === "flapOpen" ? { opacity: 0, y: -15 } : { opacity: 1, y: 0 }}
              >
                <p className="font-script text-2xl font-medium text-white tracking-wide drop-shadow-md">
                  Convite de Casamento
                </p>
                <p className="font-script text-2xl font-medium text-white tracking-wide drop-shadow-md mt-24">
                  {INVITE_COUPLE_NAMES.display}
                </p>
              </motion.div>

              {/* 3. Aba Triangular (Topo) */}
              <motion.div
                className="absolute z-20"
                style={{
                  left: 0,
                  top: 0,
                  width: 0,
                  height: 0,
                  borderLeft: `${W / 2}px solid transparent`,
                  borderRight: `${W / 2}px solid transparent`,
                  borderTop: `${flapH}px solid #3d5e38`,
                  transformOrigin: "top center",
                  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
                }}
                animate={{ rotateX: state === "flapOpen" ? -170 : 0 }}
                transition={{ duration: FLAP_OPEN_DURATION, ease: "easeInOut" }}
              />

              {/* 4. Selo Dourado (Centralizado na ponta da aba) */}
              <motion.div
                className="absolute z-30 flex items-center justify-center rounded-full"
                style={{
                  width: 56,
                  height: 56,
                  left: "50%",
                  top: flapH, 
                  marginLeft: -28, 
                  marginTop: -28,  
                  background: "radial-gradient(circle at 30% 30%, #e5c064, #b8860b 45%, #7a5a0d)",
                  boxShadow: "0 6px 15px rgba(0,0,0,0.4), inset 0 2px 1px rgba(255,255,255,0.3)",
                  border: "1px solid #8b6914",
                }}
                animate={state === "flapOpen" ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
              >
                <div className="w-6 h-6 opacity-40" style={{ filter: "brightness(0.2)" }}>
                   <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C10.3 2 9 3.3 9 5c0 1.1.6 2.1 1.5 2.6L10 15l-2 2v2h8v-2l-2-2-.5-7.4c.9-.5 1.5-1.5 1.5-2.6 0-1.7-1.3-3-3-3zm0 2c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z"/></svg>
                </div>
              </motion.div>
            </div>

            <p className="mt-10 w-full text-center font-sans text-sm font-medium text-invite-green-800 tracking-[0.2em] uppercase opacity-90">
              {INVITE_CTA.openEnvelope}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: LETTER_ENTER_DURATION, ease: EASE_OUT_SMOOTH }}
          >
            <LetterScrollEffect>{children}</LetterScrollEffect>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { LetterEnvelope };