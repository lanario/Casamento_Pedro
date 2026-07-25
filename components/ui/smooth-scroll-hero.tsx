"use client";
import * as React from "react";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";

interface iISmoothScrollHeroProps {
  /**
   * Height of the scroll section in pixels
   * @default 1500
   */
  scrollHeight: number;
  /**
   * Background image URL for desktop view
   */
  desktopImage: string;
  /**
   * Background image URL for mobile view
   */
  mobileImage: string;
  /**
   * Initial clip path percentage
   * @default 25
   */
  initialClipPercentage: number;
  /**
   * Final clip path percentage
   * @default 75
   */
  finalClipPercentage: number;
  /**
   * CSS background-position for the image (e.g. "center 30%")
   * @default "center"
   */
  backgroundPosition?: string;
  /**
   * Overlay content rendered on top of the sticky background
   */
  children?: React.ReactNode;
}

interface iISmoothScrollHeroBackgroundProps extends iISmoothScrollHeroProps {}

const SmoothScrollHeroBackground: React.FC<
  iISmoothScrollHeroBackgroundProps
> = ({
  scrollHeight,
  desktopImage,
  mobileImage,
  initialClipPercentage,
  finalClipPercentage,
  backgroundPosition = "center",
  children,
}) => {
  const { scrollY } = useScroll();

  const clipStart = useTransform(
    scrollY,
    [0, scrollHeight],
    [initialClipPercentage, 0],
  );
  const clipEnd = useTransform(
    scrollY,
    [0, scrollHeight],
    [finalClipPercentage, 100],
  );

  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;

  // Zoom aplicado via transform (não via background-size em % da largura):
  // background-size "cover" já se adapta corretamente a qualquer proporção
  // de tela, então o zoom por transform não desloca o enquadramento vertical
  // como acontecia antes em telas mais largas (tablet, Fold).
  const bgZoomScale = useTransform(
    scrollY,
    [0, scrollHeight + 500],
    [1.35, 1],
  );

  // Margens ao redor da foto: começam no creme da página e ficam verdes
  // conforme a imagem do casal cresce na tela.
  const marginOpacity = useTransform(
    scrollY,
    [scrollHeight * 0.15, scrollHeight * 0.6],
    [0, 1],
  );

  return (
    <div className="sticky top-0 h-screen w-full">
      {/* Margens: a própria foto do casal esticada por trás, tingida de
          verde, para não parecer uma faixa de cor sólida separada. */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ opacity: marginOpacity }}
      >
        <div
          className="absolute inset-0 md:hidden"
          style={{
            backgroundImage: `url(${mobileImage})`,
            backgroundSize: "cover",
            backgroundPosition,
            backgroundRepeat: "no-repeat",
          }}
        />
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: `url(${desktopImage})`,
            backgroundSize: "cover",
            backgroundPosition,
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 mix-blend-color bg-sage-700" />
        <div className="absolute inset-0 bg-sage-950/25" />
      </motion.div>
      {/* Foto recortada pelo clip-path */}
      <motion.div
        className="absolute inset-0 bg-[#6B805B]"
        style={{
          clipPath,
          willChange: "transform, opacity",
        }}
      >
        {/* Mobile background */}
        <motion.div
          className="absolute inset-0 md:hidden"
          style={{
            backgroundImage: `url(${mobileImage})`,
            backgroundSize: "cover",
            backgroundPosition,
            backgroundRepeat: "no-repeat",
            scale: bgZoomScale,
          }}
        />
        {/* Desktop background */}
        <motion.div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: `url(${desktopImage})`,
            backgroundSize: "cover",
            backgroundPosition,
            backgroundRepeat: "no-repeat",
            scale: bgZoomScale,
          }}
        />
      </motion.div>
      {children}
    </div>
  );
};

/**
 * A smooth scroll hero component with parallax background effect
 * @param props - Component props
 * @returns React component
 */
const SmoothScrollHero: React.FC<iISmoothScrollHeroProps> = ({
  scrollHeight = 1500,
  desktopImage,
  mobileImage,
  initialClipPercentage = 25,
  finalClipPercentage = 75,
  backgroundPosition = "center",
  children,
}) => {
  return (
    <div
      style={{ height: `calc(${scrollHeight}px + 100vh)` }}
      className="relative w-full"
    >
      <SmoothScrollHeroBackground
        scrollHeight={scrollHeight}
        desktopImage={desktopImage}
        mobileImage={mobileImage}
        initialClipPercentage={initialClipPercentage}
        finalClipPercentage={finalClipPercentage}
        backgroundPosition={backgroundPosition}
      >
        {children}
      </SmoothScrollHeroBackground>
    </div>
  );
};
export default SmoothScrollHero;
