import React, { useState } from 'react';
import { Lock, Unlock, Sparkles, Heart, ZoomIn, ArrowRight } from 'lucide-react';
import { fireCelebrationConfetti, fireSideCannons } from '../utils/confetti';

interface RewardSketchSceneProps {
  onContinueToGift: () => void;
}

export const RewardSketchScene: React.FC<RewardSketchSceneProps> = ({
  onContinueToGift,
}) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleRedeem = () => {
    setIsUnlocking(true);
    setTimeout(() => {
      setIsUnlocking(false);
      setIsUnlocked(true);
      fireCelebrationConfetti();
      fireSideCannons();
    }, 1500);
  };

  return (
    <div className="relative z-30 max-w-2xl mx-auto px-4 py-6 flex flex-col items-center text-center select-none animate-fade-in w-full">
      {/* Narrative Header */}
      <div className="mb-6 space-y-1">
        <span className="py-1 px-4 rounded-full bg-[#D6B47A]/15 border border-[#D6B47A]/30 text-[#D6B47A] text-xs font-semibold tracking-wider uppercase">
          Secret Treasure Unlocked ★
        </span>
        <h2 className="font-serif-hero text-3xl sm:text-4xl md:text-5xl font-bold text-[#FFF4E6]">
          {!isUnlocked ? 'YOUR SECRET REWARD' : 'A Work of Art, Just for You'}
        </h2>
        <p className="text-[#FFF4E6]/80 text-sm sm:text-base font-sans">
          {!isUnlocked
            ? 'You collected 20 birthday coins! Redeem your treasure below.'
            : 'Made with love, especially for you, Shinam.'}
        </p>
      </div>

      {/* REWARD CARD / ART FRAME */}
      <div className="relative w-full max-w-md bg-[#21182B]/90 border-2 border-[#D6B47A]/50 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center">
        {/* Ambient Warm Golden Aura */}
        <div className="absolute inset-0 bg-[#D6B47A]/10 rounded-3xl blur-xl pointer-events-none" />

        {!isUnlocked ? (
          /* Locked Card State */
          <div className="flex flex-col items-center py-8 space-y-4">
            <div className="w-20 h-20 rounded-2xl bg-[#793D50]/50 border border-[#D98C9A]/40 flex items-center justify-center text-[#D6B47A] shadow-inner">
              <Lock className="w-9 h-9 animate-pulse" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-serif-hero text-xl font-bold text-[#D6B47A]">
                Hand-Drawn Secret Treasure
              </h3>
              <p className="text-xs text-[#FFF4E6]/70 max-w-xs leading-relaxed">
                Cost: 20 Golden Coins. A personal creation made exclusively for Shinam.
              </p>
            </div>

            <button
              onClick={handleRedeem}
              disabled={isUnlocking}
              className="mt-4 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D6B47A] to-[#D98C9A] text-[#21182B] font-bold text-sm uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-70"
            >
              {isUnlocking ? 'Unlocking Treasure...' : 'REDEEM YOUR TREASURE (20 COINS)'}
            </button>
          </div>
        ) : (
          /* Unlocked Original Sketch Artwork */
          <div className="flex flex-col items-center w-full animate-fade-in space-y-4">
            {/* The Ornate Gallery Frame */}
            <div className="relative p-3 sm:p-4 bg-gradient-to-b from-[#FFF4E6] to-[#f5dfc6] rounded-2xl shadow-2xl border-4 border-[#D6B47A] w-full max-w-sm">
              <div
                onClick={() => setIsZoomed(true)}
                className="relative overflow-hidden rounded-lg bg-white border border-slate-300 cursor-zoom-in group"
                title="Click to view full size"
              >
                {/* The exact uploaded sketch */}
                <img
                  src="/assets/aistudio/photo_2026-10-31_00-12-46_2d3d300f.jpg"
                  alt="Original Sketch for Shinam"
                  className="w-full h-64 sm:h-72 object-contain bg-white transition-transform duration-300 group-hover:scale-105"
                />

                {/* Hover zoom cue */}
                <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>

              {/* Gallery Plaque */}
              <div className="mt-3 text-center border-t border-[#793D50]/20 pt-2">
                <p className="font-handwriting text-lg text-[#793D50] font-bold">
                  "Made with love, especially for you, Shinam."
                </p>
                <p className="text-[10px] uppercase tracking-widest text-[#21182B]/60 font-sans mt-0.5">
                  Original Hand-Drawn Birthday Sketch · 2026
                </p>
              </div>
            </div>

            {/* Narrative text & Continue button */}
            <div className="pt-2 text-center space-y-3">
              <p className="text-xs sm:text-sm text-[#F2C5AD] italic font-serif-hero">
                "The little cat has completed its birthday mission!"
                <br />
                "Now let's get back to your surprises, Shinam."
              </p>

              <button
                onClick={onContinueToGift}
                className="px-8 py-3.5 rounded-xl bg-[#D6B47A] hover:bg-[#c5a266] text-[#21182B] font-bold text-sm tracking-wider uppercase shadow-xl flex items-center justify-center gap-2 mx-auto active:scale-95 transition-all cursor-pointer"
              >
                <span>Continue to Your Surprises</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Zoom for Full Sketch View */}
      {isZoomed && (
        <div
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 cursor-zoom-out animate-fade-in"
        >
          <div className="relative max-w-lg max-h-[85vh] bg-white p-3 rounded-2xl shadow-2xl border-4 border-[#D6B47A]">
            <img
              src="/assets/aistudio/photo_2026-10-31_00-12-46_2d3d300f.jpg"
              alt="Original Sketch Full View"
              className="w-full h-auto max-h-[75vh] object-contain rounded"
            />
            <p className="text-center font-handwriting text-[#793D50] text-xl font-bold mt-2">
              Made with love, especially for you, Shinam.
            </p>
          </div>
          <p className="text-white/70 text-xs mt-3">Click anywhere to close</p>
        </div>
      )}
    </div>
  );
};
