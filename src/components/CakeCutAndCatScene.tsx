import React, { useState } from 'react';
import { Utensils, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { fireMiniBurst, fireCelebrationConfetti } from '../utils/confetti';

interface CakeCutAndCatSceneProps {
  onProceedToGift: () => void;
}

export const CakeCutAndCatScene: React.FC<CakeCutAndCatSceneProps> = ({
  onProceedToGift,
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
        <span className="py-1 px-4 rounded-full bg-amber-400/10 border border-amber-300/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
          Birthday Ritual 🍰
        </span>
        <h2 className="font-signika text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-200">
          {!hasCut
            ? "Enough staring at the cake. It's time to cut it!"
            : !isCatFed
            ? 'Someone else is waiting for their birthday treat...'
            : 'Look who is happier than the birthday girl! 🥰'}
        </h2>
        <p className="text-slate-300 text-sm sm:text-base font-medium">
          {!hasCut
            ? 'Tap or slice the cake with the knife below!'
            : !isCatFed
            ? 'Feed the cat! 🐱'
            : 'Purrs of pure happiness and birthday love!'}
        </p>
      </div>

      {/* INTERACTIVE STAGE: CAKE & WAITING CAT */}
      <div className="relative w-full max-w-xl min-h-[300px] sm:min-h-[340px] bg-slate-900/60 backdrop-blur-md border border-slate-700/60 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-around gap-6 shadow-2xl">
        {/* Cake Side */}
        <div className="flex flex-col items-center">
          <div
            onClick={handleCut}
            className={`relative w-48 h-40 flex flex-col items-center justify-end cursor-pointer group transition-transform ${
              !hasCut ? 'hover:scale-105 active:scale-95' : ''
            }`}
            title={!hasCut ? 'Click to cut a slice!' : 'Cake sliced!'}
          >
            {/* Knife indicator when not cut */}
            {!hasCut && (
              <div className="absolute top-2 right-4 text-3xl animate-bounce filter drop-shadow-md">
                🔪
              </div>
            )}

            {/* Whole Cake or Sliced Cake */}
            <div className="relative w-40 h-28 bg-gradient-to-b from-amber-100 via-amber-200 to-[#542813] rounded-t-2xl shadow-xl border-t-2 border-white flex flex-col justify-between overflow-hidden">
              {/* White frosting */}
              <div className="h-4 bg-white/95 rounded-t-2xl flex justify-around px-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-2.5 h-3 bg-white rounded-b-full" />
                ))}
              </div>

              {/* Incision Line when cut */}
              {hasCut && (
                <div className="absolute inset-y-0 right-12 w-1.5 bg-amber-400 shadow-[0_0_10px_#f59e0b] animate-pulse" />
              )}

              {/* Chocolate Base text */}
              <div className="text-[10px] font-bold text-amber-200 tracking-wider text-center py-2 bg-black/30">
                20 YEARS SWEET
              </div>
            </div>

            {/* Cake Plate */}
            <div className="w-48 h-3 bg-gradient-to-r from-slate-300 via-white to-slate-400 rounded-full shadow-md mt-1" />
          </div>

          <span className="text-xs text-slate-400 mt-2 font-medium">
            {!hasCut ? 'Tap cake to cut a slice 🔪' : 'Delicious slice ready! 🍰'}
          </span>
        </div>

        {/* Golden Slice Ready to Feed */}
        {hasCut && !isCatFed && (
          <div className="flex flex-col items-center animate-fade-in">
            <div
              onClick={handleFeedCat}
              className="p-3.5 bg-amber-500/20 border-2 border-amber-400 rounded-2xl shadow-xl cursor-pointer hover:scale-110 active:scale-95 transition-transform flex flex-col items-center group animate-pulse"
              title="Click to feed the cat!"
            >
              <span className="text-4xl group-hover:rotate-12 transition-transform">
                🍰
              </span>
              <span className="text-xs font-bold text-amber-300 mt-1">
                Feed Slice 🐱
              </span>
            </div>
            <span className="text-[11px] text-amber-200/80 mt-1.5">
              Click slice to feed
            </span>
          </div>
        )}

        {/* CAT SIDE: ANIMATED FELINE CELEBRANT */}
        <div className="flex flex-col items-center">
          <div className="relative w-36 h-36 flex flex-col items-center justify-center">
            {/* Floating Hearts when cat is happy */}
            {(isCatFed || isEating) && (
              <div className="absolute -top-4 inset-x-0 flex justify-center gap-2 pointer-events-none">
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-bounce" />
                <Heart
                  className="w-5 h-5 text-pink-400 fill-pink-400 animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                />
                <Heart
                  className="w-4 h-4 text-rose-400 fill-rose-400 animate-bounce"
                  style={{ animationDelay: '0.4s' }}
                />
              </div>
            )}

            {/* Cat Avatar with animated facial expressions */}
            <div
              className={`w-28 h-28 rounded-full bg-gradient-to-b from-amber-200 via-orange-200 to-amber-300 border-4 border-amber-300 shadow-xl flex flex-col items-center justify-center text-5xl transition-transform duration-300 ${
                isEating
                  ? 'animate-pulse scale-105'
                  : isCatFed
                  ? 'scale-110'
                  : 'hover:scale-105'
              }`}
            >
              {isEating ? '😋' : isCatFed ? '😻' : '🐱'}
            </div>

            {/* Birthday Party Hat on Cat */}
            <div className="absolute -top-2 text-2xl rotate-12 pointer-events-none">
              🎉
            </div>
          </div>

          <div className="mt-2 text-center">
            <span className="text-xs font-signika font-bold text-amber-300">
              {isEating
                ? 'Nom nom nom... 🍰'
                : isCatFed
                ? 'Happiest Cat on Earth! Purrr 🐾'
                : 'Waiting for Birthday Treat...'}
            </span>
          </div>
        </div>
      </div>

      {/* NEXT STEP BUTTON AFTER CAT IS FED */}
      {isCatFed && (
        <div className="mt-6 animate-fade-in">
          <button
            onClick={onProceedToGift}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-rose-400 to-amber-300 hover:from-amber-300 hover:to-rose-300 text-slate-950 font-signika font-bold text-base shadow-xl flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <span>Proceed to Your Main Gift 🎁</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
