"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { InviteContentProps } from "@/lib/types";
import { useReducedMotion } from "@/lib/useReducedMotion";

const DEFAULT_IMAGE_SRC = "/casal.jpeg";
const STAGGER_DURATION = 0.3;
const STAGGER_DELAY = 0.06;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: STAGGER_DELAY, delayChildren: 0.04 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: STAGGER_DURATION, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const itemVariantsReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
};

const containerVariantsReduced = {
  hidden: {},
  visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
};

/**
 * Conteúdo do convite no estilo dos modelos físicos: bênção, nomes em script,
 * texto de convite, data, local, endereço, nota de recepção e RSVP.
 */
function InviteContent({
  groomName,
  brideName,
  blessing,
  openingText,
  dateTimeText,
  dateTime,
  venue,
  address,
  receptionNote,
  rsvpLabel,
  rsvpWebsite,
  coupleImageSrc = DEFAULT_IMAGE_SRC,
  presenceText,
  className = "",
}: InviteContentProps) {
  const reducedMotion = useReducedMotion();
  const displayNames = `${groomName} e ${brideName}`;
  const imageAlt = `${groomName} e ${brideName} — foto do casal`;
  const variants = reducedMotion ? itemVariantsReduced : itemVariants;

  return (
    <motion.article
      className={`flex flex-col text-center ${className}`}
      aria-label="Convite de casamento"
      initial="hidden"
      animate="visible"
      variants={reducedMotion ? containerVariantsReduced : containerVariants}
    >
      {blessing && (
        <motion.p
          className="font-serif text-invite-green-800 text-sm sm:text-base"
          variants={variants}
        >
          {blessing}
        </motion.p>
      )}

      <motion.h1
        className="font-script text-4xl sm:text-5xl md:text-6xl text-invite-green-900 mt-2 sm:mt-4"
        variants={variants}
      >
        {displayNames}
      </motion.h1>

      <motion.p
        className="mt-5 sm:mt-6 font-sans text-invite-green-700 text-sm sm:text-base leading-relaxed max-w-md mx-auto"
        variants={variants}
      >
        {openingText}
      </motion.p>

      {(dateTimeText || dateTime) && (
        <motion.p
          className="mt-4 font-sans text-invite-green-800 text-sm sm:text-base font-medium"
          variants={variants}
        >
          {dateTimeText ?? dateTime}
        </motion.p>
      )}

      {(venue || address) && (
        <motion.div
          className="mt-4 sm:mt-5 font-sans text-invite-green-700 text-sm sm:text-base space-y-0.5"
          variants={variants}
        >
          {venue && <p className="font-medium text-invite-green-900">{venue}</p>}
          {address && <p>{address}</p>}
        </motion.div>
      )}

      {receptionNote && (
        <motion.p
          className="mt-4 font-sans text-invite-green-600 text-xs sm:text-sm"
          variants={variants}
        >
          {receptionNote}
        </motion.p>
      )}

      {(rsvpLabel || rsvpWebsite) && (
        <motion.p
          className="mt-6 font-sans text-invite-green-700 text-xs sm:text-sm"
          variants={variants}
        >
          {rsvpLabel && <span className="block">{rsvpLabel}</span>}
          {rsvpWebsite && (
            <a
              href={rsvpWebsite.startsWith("http") ? rsvpWebsite : `https://${rsvpWebsite}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-invite-green-800 underline underline-offset-2 hover:text-invite-green-900"
            >
              {rsvpWebsite}
            </a>
          )}
        </motion.p>
      )}

      {coupleImageSrc && (
        <motion.div
          className="mt-8 relative w-full aspect-[4/3] max-w-sm mx-auto rounded overflow-hidden border border-invite-green-300/80"
          data-couple-image
          variants={variants}
        >
          <Image
            src={coupleImageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 384px, 448px"
            className="object-cover"
            priority={false}
          />
        </motion.div>
      )}

      {presenceText && (
        <motion.p
          className="mt-6 font-sans text-invite-green-500 text-sm italic"
          variants={variants}
        >
          {presenceText}
        </motion.p>
      )}
    </motion.article>
  );
}

export { InviteContent };
