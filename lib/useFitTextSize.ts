"use client";

import { useEffect, useState } from "react";

const REF_PX = 100;

type FitTextOptions = {
  min?: number;
  max?: number;
  margin?: number;
  fontClassName?: string;
};

/**
 * Mede a largura real de um conjunto de textos (com a fonte/peso/tracking já
 * aplicados) e calcula o maior tamanho de fonte comum que ainda cabe em uma
 * linha só na coluna referenciada por `columnSelector` — encontra o limite
 * real em vez de um valor fixo, então continua correto se os textos ou a
 * largura da tela mudarem.
 */
export function useFitTextSize(
  containerRef: React.RefObject<HTMLElement>,
  columnSelector: string,
  texts: readonly string[],
  options: FitTextOptions = {},
) {
  const {
    min = 7,
    max = 16,
    margin = 0.99,
    fontClassName = "font-bold tracking-tight",
  } = options;
  const [fontSize, setFontSize] = useState(min);

  useEffect(() => {
    function recalc() {
      const container = containerRef.current;
      if (!container) return;
      const column = container.querySelector<HTMLElement>(columnSelector);
      if (!column) return;
      const columnWidth = column.clientWidth;
      if (columnWidth <= 0) return;

      const measurer = document.createElement("span");
      measurer.className = fontClassName;
      measurer.style.position = "fixed";
      measurer.style.top = "-9999px";
      measurer.style.left = "-9999px";
      measurer.style.visibility = "hidden";
      measurer.style.whiteSpace = "nowrap";
      measurer.style.pointerEvents = "none";
      measurer.style.fontFamily = "var(--font-sans)";
      measurer.style.fontSize = `${REF_PX}px`;
      document.body.appendChild(measurer);

      let fit = max;
      for (const text of texts) {
        measurer.textContent = text;
        const widthAtRef = measurer.getBoundingClientRect().width;
        const candidate = (columnWidth / widthAtRef) * REF_PX * margin;
        if (candidate < fit) fit = candidate;
      }

      document.body.removeChild(measurer);

      const clamped = Math.max(min, Math.min(max, fit));
      setFontSize(Math.round(clamped * 10) / 10);
    }

    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, [containerRef, columnSelector, texts, min, max, margin, fontClassName]);

  return fontSize;
}
