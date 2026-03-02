"use client";

import { DRESS_CODE } from "@/lib/constants";
import { BotanicalSprig } from "@/components/RealisticLeaves";

/**
 * Seção "Traje Sugerido": cores a evitar e dica de conforto.
 */
function DressCodeSection() {
  return (
    <article className="bg-[#FAF5E2] p-8 sm:p-12 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-invite-green-100/30 flex flex-col items-center text-center relative overflow-hidden transition-all duration-300 hover:border-invite-green-300/60">
      <div className="absolute top-0 right-0 p-4 text-invite-green-100/30 pointer-events-none">
        <BotanicalSprig width={48} height={72} className="rotate-45" />
      </div>
      <div className="absolute bottom-0 left-0 p-4 text-invite-green-100/25 pointer-events-none">
        <BotanicalSprig width={32} height={48} className="-rotate-12" />
      </div>

      <div className="relative z-10 w-full max-w-xl mx-auto space-y-6">
        <h2 className="text-2xl sm:text-3xl font-light font-serif tracking-tight text-invite-green-900">
          {DRESS_CODE.title}
        </h2>

        <p className="text-base sm:text-lg font-extralight text-invite-green-800">
          {DRESS_CODE.avoidInstruction}
        </p>

        <div className="grid grid-cols-4 gap-2 sm:gap-6 justify-items-center">
          {DRESS_CODE.colors.map((color) => (
            <div
              key={color.name}
              className="flex flex-col items-center gap-1 sm:gap-2 min-w-0"
            >
              <div
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-invite-green-300/40 shadow-sm shrink-0"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
              <span className="text-xs sm:text-sm font-extralight text-invite-green-800 capitalize text-center leading-tight">
                {color.name}
              </span>
            </div>
          ))}
        </div>

        <p className="text-sm sm:text-base font-extralight text-invite-green-700 italic">
          {DRESS_CODE.whiteNote}
        </p>

        <p className="text-base sm:text-lg font-extralight text-invite-green-800 leading-relaxed">
          {DRESS_CODE.comfortAdvice}
        </p>

        <p className="text-xs sm:text-sm font-extralight text-invite-green-600 tracking-wider">
          {DRESS_CODE.disclaimer}
        </p>
      </div>
    </article>
  );
}

export { DressCodeSection };
