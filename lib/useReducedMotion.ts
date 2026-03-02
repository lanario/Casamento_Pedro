"use client";

import { useState, useEffect } from "react";

/**
 * Retorna true se o usuário preferir reduzir movimento (acessibilidade).
 * Usado para desabilitar ou simplificar animações.
 */
function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

export { useReducedMotion };
