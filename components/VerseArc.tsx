type VerseArcProps = {
  quote: string;
  reference: string;
};

/** Versículo com a citação em arco, como em convites impressos tradicionais. */
export default function VerseArc({ quote, reference }: VerseArcProps) {
  return (
    <div data-reveal className="mx-auto max-w-md md:max-w-lg">
      <span className="sr-only">
        &ldquo;{quote}&rdquo; — {reference}
      </span>

      <svg
        viewBox="0 0 640 130"
        className="mx-auto w-full text-sage-700"
        aria-hidden="true"
      >
        <defs>
          <path id="verse-arc-path" d="M 15 110 Q 320 10 625 110" fill="none" />
        </defs>
        <text
          className="fill-current italic"
          style={{ fontFamily: "var(--font-sans)" }}
          fontSize="25"
          fontWeight={500}
        >
          <textPath href="#verse-arc-path" startOffset="50%" textAnchor="middle">
            &ldquo;{quote}&rdquo;
          </textPath>
        </text>
      </svg>

      <p
        aria-hidden="true"
        className="-mt-1 text-center text-sm font-semibold not-italic text-sage-500"
      >
        — {reference}
      </p>
    </div>
  );
}
