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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#D6B47A]/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Header text */}
      <div className="mb-8 space-y-2 relative z-10">
        <span className="py-1 px-4 rounded-full bg-[#D6B47A]/15 border border-[#D6B47A]/30 text-[#D6B47A] text-xs font-semibold tracking-wider uppercase">
          The Personal Gift 💫
        </span>
        <h2 className="font-serif-hero text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#D6B47A]">
          "Shinam, there's still one more thing..."
        </h2>
        <p className="text-[#FFF4E6]/85 text-base sm:text-lg font-serif-hero italic">
          "Something that can't be collected with coins."
        </p>
      </div>

      {/* 3D FLOATING GIFT BOX */}
      <div
        onClick={handleClick}
        className={`relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center cursor-pointer group transition-transform duration-500 my-4 ${
          opening ? 'scale-125 opacity-90' : 'hover:scale-105 active:scale-95'
        }`}
      >
        <div className="absolute -top-4 -left-4 text-[#D6B47A] text-xl animate-bounce">
          ✨
        </div>
        <div
          className="absolute -bottom-2 -right-4 text-[#D98C9A] text-xl animate-bounce"
          style={{ animationDelay: '0.4s' }}
        >
          ✨
        </div>

        {/* Gift Box Container */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 animate-bounce" style={{ animationDuration: '3.5s' }}>
          {/* Box Lid */}
          <div
            className={`absolute top-0 inset-x-0 h-14 rounded-2xl bg-gradient-to-r from-[#793D50] via-[#8c475d] to-[#793D50] border-2 border-[#D6B47A]/80 shadow-2xl z-20 flex items-center justify-center transition-all duration-700 ${
              opening ? '-translate-y-16 rotate-12 opacity-0' : ''
            }`}
          >
            <div className="w-8 h-full bg-[#D6B47A] shadow-md border-x border-[#c4a166]" />

            {/* Silk Bow */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-1">
              <div className="w-7 h-7 rounded-full bg-[#D6B47A] border-2 border-[#c4a166] rotate-45 shadow-lg transform -translate-x-1" />
              <div className="w-7 h-7 rounded-full bg-[#D6B47A] border-2 border-[#c4a166] -rotate-45 shadow-lg transform translate-x-1" />
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#D6B47A] shadow-md" />
            </div>
          </div>

          {/* Box Body */}
          <div className="absolute bottom-0 inset-x-2 h-34 rounded-2xl bg-gradient-to-b from-[#602d3d] via-[#4d2230] to-[#391723] border-2 border-[#D6B47A]/50 shadow-2xl flex items-center justify-center overflow-hidden">
            <div className="w-8 h-full bg-[#D6B47A] border-x border-[#c4a166] shadow-inner" />
          </div>

          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-5 bg-black/60 rounded-full blur-md" />
        </div>
      </div>

      {/* Button to Open */}
      <div className="mt-6 relative z-10">
        <button
          onClick={handleClick}
          disabled={opening}
          className="px-10 py-4 rounded-xl bg-gradient-to-r from-[#D6B47A] via-[#D98C9A] to-[#D6B47A] hover:brightness-110 text-[#21182B] font-serif-hero font-extrabold text-lg sm:text-xl tracking-wider uppercase shadow-[0_10px_35px_rgba(214,180,122,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer disabled:opacity-80"
        >
          <Sparkles className="w-5 h-5 text-[#21182B]" />
          <span>{opening ? 'Unwrapping Memories...' : 'OPEN YOUR GIFT'}</span>
        </button>
      </div>
    </div>
  );
};
