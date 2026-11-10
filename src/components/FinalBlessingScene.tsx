import React, { useEffect } from 'react';
import { Heart, Sparkles, RotateCcw, PartyPopper } from 'lucide-react';
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

    // Trigger intermittent gentle confetti fireworks every 6 seconds
    const interval = setInterval(() => {
      fireSideCannons();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-30 max-w-3xl mx-auto px-4 py-8 flex flex-col items-center text-center select-none animate-fade-in pb-16">
      {/* Golden Aura Spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Main Closing Ribbon */}
      <div className="mb-6 space-y-2 relative z-10">
        <span className="py-1 px-5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-bold tracking-widest uppercase">
          A DECADE OF BECOMING ❤️
        </span>
        <h2 className="font-signika text-3xl sm:text-4xl md:text-5xl font-extrabold text-amber-200 tracking-wide pt-2">
          AND THAT'S A WRAP FOR TODAY!
        </h2>
        <p className="font-signika text-lg sm:text-xl text-rose-300 font-semibold">
          Twenty years of memories, lessons, laughter and becoming.
        </p>
        <p className="text-amber-100 text-base sm:text-lg font-medium italic">
          Here's wishing you an incredible 20th year ahead! ✨
        </p>
      </div>

      {/* BLESSINGS CARD */}
      <div className="w-full bg-slate-900/80 backdrop-blur-xl border border-amber-400/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-4 text-slate-200 text-sm sm:text-base leading-relaxed text-center my-4 relative z-10">
        <p className="transition-all hover:text-amber-200">
          May the coming decade bring you opportunities bigger than your dreams.
        </p>
        <p className="transition-all hover:text-amber-200">
          May you discover abilities you never knew you possessed.
        </p>
        <p className="transition-all hover:text-amber-200">
          May you achieve things that your younger self could only imagine.
        </p>
        <p className="transition-all hover:text-amber-200">
          May you always retain that curiosity, kindness, forgiveness and determination that make you who you are.
        </p>
        <p className="transition-all hover:text-amber-200">
          And most importantly, may you always find reasons to smile, grow and be proud of yourself.
        </p>

        <div className="pt-4 border-t border-white/10">
          <p className="font-signika font-bold text-lg sm:text-xl text-amber-300">
            You deserve every beautiful thing that life has waiting for you.
          </p>
        </div>

        {/* Grand Finale Signature */}
        <div className="pt-6 flex flex-col items-center space-y-2">
          <h1 className="font-signika font-extrabold text-3xl sm:text-4xl text-rose-400 flex items-center gap-2 justify-center">
            <span>HAPPY BIRTHDAY!</span>
            <Heart className="w-7 h-7 text-rose-500 fill-rose-500 animate-bounce" />
          </h1>
          <p className="font-signika text-lg sm:text-xl text-amber-200 font-semibold tracking-wide">
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
          className="px-6 py-3 rounded-full bg-slate-900/90 border border-slate-700 hover:bg-slate-800 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg transition-all active:scale-95"
        >
          <PartyPopper className="w-4 h-4 text-rose-400" />
          <span>Blast More Confetti! 🎊</span>
        </button>

        <button
          onClick={onRestartExperience}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 hover:from-amber-300 hover:to-rose-300 text-slate-950 font-signika font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl transition-all active:scale-95 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Relive the Magic ↺</span>
        </button>
      </div>
    </div>
  );
};
