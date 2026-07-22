"use client";

import { WEDDING } from "@/lib/wedding";
import { useGsapReveal } from "@/lib/useGsapReveal";

export default function GiftListSection() {
  const ref = useGsapReveal<HTMLElement>(0.08);

  function handleOpenGiftList() {
    window.open(WEDDING.giftList.url, "_blank", "noopener,noreferrer");
  }

  return (
    <section
      ref={ref}
      aria-label={WEDDING.giftList.title}
      className="px-4 py-16 md:py-24"
    >
      <div
        data-reveal
        className="mx-auto max-w-3xl rounded-[2rem] bg-gradient-to-b from-sage-500 to-sage-700 px-6 py-12 text-center shadow-xl shadow-sage-900/20 md:px-14"
      >
        <h2 className="text-center font-script text-5xl text-cream md:text-6xl">
          {WEDDING.giftList.title}
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm font-medium text-cream/85 md:text-base">
          {WEDDING.giftList.subtitle}
        </p>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={handleOpenGiftList}
            className="gift-sparkle-btn"
            aria-label={WEDDING.giftList.cta}
          >
            <span className="gift-sparkle-btn__dots" aria-hidden />

            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="gift-sparkle-btn__icon"
            >
              <rect
                className="gift-sparkle-btn__icon-path"
                x="3"
                y="8"
                width="18"
                height="4"
                rx="1"
              />
              <path
                className="gift-sparkle-btn__icon-path"
                d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8"
              />
              <path
                className="gift-sparkle-btn__icon-path"
                d="M16.5 8a2.5 2.5 0 0 0 0-5C13 3 12 8 12 8"
              />
              <path
                className="gift-sparkle-btn__icon-path"
                d="M12 8v13"
              />
              <path
                className="gift-sparkle-btn__icon-path"
                d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"
              />
            </svg>

            <span className="gift-sparkle-btn__text">{WEDDING.giftList.cta}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
