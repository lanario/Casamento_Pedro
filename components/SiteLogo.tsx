"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Header fixo com a logo. Fica oculto enquanto o hero (imagem do casal)
 * ainda está na tela; aparece somente depois que a seção #topo sai
 * completamente da viewport, e some de novo se o usuário voltar ao topo.
 */
export default function SiteLogo() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("topo");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-x-0 top-0 z-50 flex justify-center bg-cream py-2.5 shadow-sm shadow-sage-950/10"
        >
          <a
            href="#topo"
            aria-label="Marcelle & Pedro — voltar ao topo"
            className="block h-12 w-12"
          >
            <span
              className="block h-full w-full bg-sage-900"
              style={{
                WebkitMaskImage: "url(/logo.svg)",
                maskImage: "url(/logo.svg)",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskSize: "contain",
                maskSize: "contain",
              }}
            />
          </a>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
