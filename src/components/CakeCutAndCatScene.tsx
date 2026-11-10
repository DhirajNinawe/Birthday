import React, { useState } from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { fireMiniBurst, fireCelebrationConfetti } from '../utils/confetti';

interface CakeCutAndCatSceneProps {
  onProceedToGame: () => void;
}

export const CakeCutAndCatScene: React.FC<CakeCutAndCatSceneProps> = ({
  onProceedToGame,
}) => {
  const [hasCut, setHasCut] = useState(false);
  const [isCatFed, setIsCatFed] = useState(false);
  const [isEating, setIsEating] = useState(false);

  const handleCut = (e: React.MouseEvent) => {
    if (!hasCut) {
      setHasCut(true);
      fireMiniBurst(e.clientX, e.clientY);
    }
  };

  const handleFeedCat = () => {
    setIsEating(true);
    setTimeout(() => {
      setIsEating(false);
      setIsCatFed(true);
      fireCelebrationConfetti();
    }, 1600);
  };

  return (
    <div className="relative z-30 max-w-2xl mx-auto px-4 py-6 flex flex-col items-center text-center select-none animate-fade-in">
      {/* Narrative Headers */}
      <div className="mb-4 space-y-1">
        <span className="py-1 px-4 rounded-full bg-[#D6B47A]/15 border border-[#D6B47A]/30 text-[#D6B47A] text-xs font-semibold tracking-wider uppercase">
          Birthday Ritual 🍰
        </span>
        <h2 className="font-serif-hero text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#D6B47A]">
          {!hasCut
            ? "Birthday girl, it's time to cut your cake!"
            : !isCatFed
            ? 'Wait... someone else wants a birthday treat.'
            : 'Well, the cat is officially happier than everyone else.'}
        </h2>
        <p className="text-[#FFF4E6]/85 text-sm sm:text-base font-sans">
          {!hasCut
            ? 'Tap or slice the cake with the knife below!'
            : !isCatFed
            ? 'Feed the cake slice to the birthday cat! 🐱'
            : 'Purrs of pure feline happiness for Shinam!'}
        </p>
      </div>

      {/* INTERACTIVE STAGE: CAKE & WAITING CAT */}
      <div className="relative w-full max-w-xl min-h-[300px] sm:min-h-[330px] bg-[#21182B]/80 backdrop-blur-md border border-[#793D50]/60 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-around gap-6 shadow-2xl">
        {/* Cake Side */}
        <div className="flex flex-col items-center">
          <div
            onClick={handleCut}
            className={`relative w-48 h-40 flex flex-col items-center justify-end cursor-pointer group transition-transform ${
              !hasCut ? 'hover:scale-105 active:scale-95' : ''
            }`}
            title={!hasCut ? 'Click to cut a slice!' : 'Cake sliced!'}
          >
            {!hasCut && (
              <div className="absolute top-2 right-4 text-3xl animate-bounce filter drop-shadow-md">
                🔪
              </div>
            )}

            {/* Whole Cake or Sliced Cake */}
            <div className="relative w-40 h-28 bg-gradient-to-b from-[#FFF4E6] via-[#eddcc7] to-[#3a1c2a] rounded-t-2xl shadow-xl border-t-2 border-[#D6B47A] flex flex-col justify-between overflow-hidden">
              <div className="h-4 bg-white/95 rounded-t-2xl flex justify-around px-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-2.5 h-3 bg-white rounded-b-full" />
                ))}
              </div>

              {hasCut && (
                <div className="absolute inset-y-0 right-12 w-1.5 bg-[#D6B47A] shadow-[0_0_10px_#D6B47A] animate-pulse" />
              )}

              <div className="text-[10px] font-serif-hero font-bold text-[#D6B47A] tracking-wider text-center py-2 bg-black/40">
                SHINAM'S CAKE
              </div>
            </div>

            <div className="w-48 h-3 bg-gradient-to-r from-slate-300 via-white to-slate-400 rounded-full shadow-md mt-1" />
          </div>

          <span className="text-xs text-[#FFF4E6]/70 mt-2 font-medium">
            {!hasCut ? 'Tap cake to slice 🔪' : 'Sweet slice served! 🍰'}
          </span>
        </div>

        {/* Slice to Feed */}
        {hasCut && !isCatFed && (
          <div className="flex flex-col items-center animate-fade-in">
            <div
              onClick={handleFeedCat}
              className="p-3.5 bg-[#D6B47A]/20 border-2 border-[#D6B47A] rounded-2xl shadow-xl cursor-pointer hover:scale-110 active:scale-95 transition-transform flex flex-col items-center group animate-pulse"
              title="Click to feed the cat!"
            >
              <span className="text-4xl group-hover:rotate-12 transition-transform">
                🍰
              </span>
              <span className="text-xs font-bold text-[#D6B47A] mt-1">
                Feed Slice 🐱
              </span>
            </div>
            <span className="text-[11px] text-[#F2C5AD] mt-1.5">
              Click slice to feed
            </span>
          </div>
        )}

        {/* CAT SIDE: ANIMATED FELINE CELEBRANT */}
        <div className="flex flex-col items-center">
          <div className="relative w-36 h-36 flex flex-col items-center justify-center">
            {(isCatFed || isEating) && (
              <div className="absolute -top-4 inset-x-0 flex justify-center gap-2 pointer-events-none">
                <Heart className="w-4 h-4 text-[#D98C9A] fill-[#D98C9A] animate-bounce" />
                <Heart
                  className="w-5 h-5 text-[#D6B47A] fill-[#D6B47A] animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                />
                <Heart
                  className="w-4 h-4 text-[#D98C9A] fill-[#D98C9A] animate-bounce"
                  style={{ animationDelay: '0.4s' }}
                />
              </div>
            )}

            <div
              className={`w-28 h-28 rounded-full bg-gradient-to-b from-[#FFF4E6] via-[#f7e8d6] to-[#eddcc7] border-4 border-[#D6B47A] shadow-xl flex flex-col items-center justify-center text-5xl transition-transform duration-300 ${
                isEating
                  ? 'animate-pulse scale-105'
                  : isCatFed
                  ? 'scale-110'
                  : 'hover:scale-105'
              }`}
            >
              {isEating ? '😋' : isCatFed ? '😻' : '🐱'}
            </div>

            <div className="absolute -top-2 text-2xl rotate-12 pointer-events-none">
              🎉
            </div>
          </div>

          <div className="mt-2 text-center">
            <span className="text-xs font-serif-hero font-bold text-[#D6B47A]">
              {isEating
                ? 'Nom nom nom... 🍰'
                : isCatFed
                ? 'Happiest Cat on Earth! Purrr 🐾'
                : 'Waiting for Birthday Treat...'}
            </span>
          </div>
        </div>
      </div>

      {/* Button to Proceed to SHINAM RUN Mini-Game */}
      {isCatFed && (
        <div className="mt-6 animate-fade-in">
          <button
            onClick={onProceedToGame}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D6B47A] to-[#D98C9A] hover:brightness-105 text-[#21182B] font-serif-hero font-extrabold text-base tracking-wider uppercase shadow-xl flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <span>Play "SHINAM RUN" Mini-Game 🎮</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
