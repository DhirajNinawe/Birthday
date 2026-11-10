import React, { useEffect } from 'react';
import { Heart, RotateCcw, PartyPopper } from 'lucide-react';
import { fireCelebrationConfetti, fireSideCannons } from '../utils/confetti';

interface FinalBlessingSceneProps {
  onRestartExperience: () => void;
}

export const FinalBlessingScene: React.FC<FinalBlessingSceneProps> = ({
  onRestartExperience,
}) => {
  useEffect(() => {
    fireCelebrationConfetti();
    fireSideCannons();

    const interval = setInterval(() => {
      fireSideCannons();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-30 max-w-3xl mx-auto px-4 py-8 flex flex-col items-center text-center select-none animate-fade-in pb-16">
      {/* Warm Golden Spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D6B47A]/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Main Closing Ribbon */}
      <div className="mb-6 space-y-2 relative z-10">
        <span className="py-1 px-5 rounded-full bg-[#D6B47A]/20 border border-[#D6B47A]/40 text-[#D6B47A] text-xs font-bold tracking-widest uppercase">
          A DECADE OF BECOMING ❤️
        </span>
        <h2 className="font-serif-hero text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#D6B47A] tracking-wide pt-2">
          AND THAT'S A WRAP FOR TODAY, SHINAM.
        </h2>
        <p className="font-serif-hero text-lg sm:text-xl text-[#D98C9A] font-semibold italic">
          "Twenty years of memories, lessons, laughter and becoming."
        </p>
      </div>

      {/* BLESSINGS CARD */}
      <div className="w-full bg-[#21182B]/90 backdrop-blur-xl border-2 border-[#D6B47A]/40 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-4 text-[#FFF4E6] text-sm sm:text-base leading-relaxed text-center my-4 relative z-10 font-sans">
        <p className="transition-all hover:text-[#D6B47A]">
          "May the coming decade bring you opportunities bigger than your dreams."
        </p>
        <p className="transition-all hover:text-[#D6B47A]">
          "May you discover abilities you never knew you possessed."
        </p>
        <p className="transition-all hover:text-[#D6B47A]">
          "May you achieve things your younger self could only imagine."
        </p>
        <p className="transition-all hover:text-[#D6B47A]">
          "May you always retain your curiosity, kindness, forgiveness and determination."
        </p>
        <p className="transition-all hover:text-[#D6B47A]">
          "And may you never stop exploring how much more you are capable of becoming."
        </p>

        {/* Grand Final Composition */}
        <div className="pt-8 border-t border-[#D6B47A]/25 flex flex-col items-center space-y-3">
          {/* Her Photograph in Golden Circular Vignette */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-[#D6B47A] via-[#D98C9A] to-[#D6B47A] shadow-xl">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#21182B]">
              <img
                src="/assets/aistudio/bd1_45088bb2.jpg"
                alt="Shinam"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h1 className="font-serif-hero font-extrabold text-3xl sm:text-5xl text-[#D6B47A] flex items-center gap-2 justify-center pt-2">
            <span>HAPPY BIRTHDAY, SHINAM!</span>
            <Heart className="w-8 h-8 text-[#D98C9A] fill-[#D98C9A] animate-bounce" />
          </h1>
          <p className="font-serif-hero text-lg sm:text-2xl text-[#FFF4E6] font-semibold tracking-wide">
            Here's to another decade of becoming. ❤️
          </p>
        </div>
      </div>

      {/* Replay and Confetti Actions */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 relative z-10">
        <button
          onClick={() => {
            fireCelebrationConfetti();
            fireSideCannons();
          }}
          className="px-6 py-3 rounded-xl bg-[#21182B] border border-[#793D50] hover:bg-[#341d31] text-[#FFF4E6] text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
        >
          <PartyPopper className="w-4 h-4 text-[#D6B47A]" />
          <span>Blast More Confetti! 🎊</span>
        </button>

        <button
          onClick={onRestartExperience}
          className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#D6B47A] to-[#D98C9A] hover:brightness-105 text-[#21182B] font-serif-hero font-extrabold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 shadow-xl transition-all active:scale-95 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Relive the Experience ↺</span>
        </button>
      </div>
    </div>
  );
};
