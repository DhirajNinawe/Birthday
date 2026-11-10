import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { fireCelebrationConfetti, fireSideCannons } from '../utils/confetti';

interface GiftBoxSceneProps {
  onOpenGift: () => void;
}

export const GiftBoxScene: React.FC<GiftBoxSceneProps> = ({ onOpenGift }) => {
  const [opening, setOpening] = useState(false);

  const handleClick = () => {
    setOpening(true);
    fireCelebrationConfetti();
    fireSideCannons();
    setTimeout(() => {
      onOpenGift();
    }, 1500);
  };

  return (
    <div className="relative z-30 max-w-xl mx-auto px-4 py-8 flex flex-col items-center text-center select-none animate-fade-in">
      {/* Soft Cinematic Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Header text */}
      <div className="mb-8 space-y-2 relative z-10">
        <span className="py-1 px-4 rounded-full bg-rose-500/10 border border-rose-400/30 text-rose-300 text-xs font-semibold tracking-wider uppercase">
          The Main Surprise 💫
        </span>
        <h2 className="font-signika text-3xl sm:text-4xl md:text-5xl font-extrabold text-amber-200">
          One last surprise...
        </h2>
        <p className="text-slate-300 text-sm sm:text-base font-medium">
          A personal token celebrating twenty unforgettable years.
        </p>
      </div>

      {/* 3D FLOATING GIFT BOX */}
      <div
        onClick={handleClick}
        className={`relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center cursor-pointer group transition-transform duration-500 my-4 ${
          opening ? 'scale-125 opacity-90' : 'hover:scale-105 active:scale-95'
        }`}
      >
        {/* Sparkle particles floating around */}
        <div className="absolute -top-4 -left-4 text-amber-300 text-xl animate-bounce">
          ✨
        </div>
        <div
          className="absolute -bottom-2 -right-4 text-rose-300 text-xl animate-bounce"
          style={{ animationDelay: '0.4s' }}
        >
          ✨
        </div>
        <div
          className="absolute top-1/2 -right-6 text-amber-200 text-lg animate-ping"
          style={{ animationDelay: '0.8s' }}
        >
          ✨
        </div>

        {/* Gift Box Container with float sway */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 animate-bounce" style={{ animationDuration: '3.5s' }}>
          {/* Box Lid with Silk Bow Ribbon */}
          <div
            className={`absolute top-0 inset-x-0 h-14 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 border-2 border-rose-300/80 shadow-2xl z-20 flex items-center justify-center transition-all duration-700 ${
              opening ? '-translate-y-16 rotate-12 opacity-0' : ''
            }`}
          >
            {/* Horizontal Ribbon on Lid */}
            <div className="w-8 h-full bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 shadow-md border-x border-amber-500/40" />

            {/* Silk Bow Ties */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-1">
              <div className="w-7 h-7 rounded-full bg-amber-300 border-2 border-amber-400 rotate-45 shadow-lg transform -translate-x-1" />
              <div className="w-7 h-7 rounded-full bg-amber-300 border-2 border-amber-400 -rotate-45 shadow-lg transform translate-x-1" />
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-400 shadow-md" />
            </div>
          </div>

          {/* Box Body */}
          <div className="absolute bottom-0 inset-x-2 h-34 rounded-2xl bg-gradient-to-b from-rose-700 via-rose-600 to-rose-800 border-2 border-rose-400/60 shadow-2xl flex items-center justify-center overflow-hidden">
            {/* Vertical Ribbon */}
            <div className="w-8 h-full bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 border-x border-amber-500/40 shadow-inner" />

            {/* Subtle box patterns */}
            <div className="absolute inset-0 bg-radial from-white/10 to-transparent pointer-events-none" />
          </div>

          {/* Box Base Shadow */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-5 bg-black/50 rounded-full blur-md" />
        </div>
      </div>

      {/* Button to Open */}
      <div className="mt-6 relative z-10">
        <button
          onClick={handleClick}
          disabled={opening}
          className="px-9 py-4 rounded-full bg-gradient-to-r from-amber-400 via-rose-400 to-amber-300 hover:from-amber-300 hover:to-rose-300 text-slate-950 font-signika font-bold text-lg sm:text-xl shadow-[0_0_35px_rgba(244,63,94,0.4)] hover:shadow-[0_0_50px_rgba(244,63,94,0.7)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer disabled:opacity-80"
        >
          <Sparkles className="w-5 h-5 text-slate-950" />
          <span>{opening ? 'Unwrapping Memories...' : 'OPEN YOUR GIFT 🎁'}</span>
        </button>
      </div>
    </div>
  );
};
