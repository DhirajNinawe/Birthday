import React, { useEffect } from 'react';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';
import { fireCelebrationConfetti, fireSideCannons } from '../utils/confetti';

interface GrandWishingSceneProps {
  onProceedToCakeCut: () => void;
}

export const GrandWishingScene: React.FC<GrandWishingSceneProps> = ({
  onProceedToCakeCut,
}) => {
  useEffect(() => {
    fireCelebrationConfetti();
    fireSideCannons();
  }, []);

  return (
    <div className="relative z-30 w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center text-center select-none animate-fade-in">
      {/* Warm Ambient Spotlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D6B47A]/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Decorative Crown Ribbon */}
      <div className="mb-4 inline-flex items-center gap-2 py-1 px-5 rounded-full bg-[#D6B47A]/15 border border-[#D6B47A]/35 text-[#D6B47A] text-xs font-semibold tracking-widest uppercase shadow-md">
        <Sparkles className="w-3.5 h-3.5 text-[#D6B47A]" />
        <span>THE GRAND CELEBRATION</span>
        <Sparkles className="w-3.5 h-3.5 text-[#D6B47A]" />
      </div>

      {/* CENTRAL VISUAL: SHINAM'S ACTUAL PHOTOGRAPH IN ORNATE GOLD FRAME */}
      <div className="relative my-4 group">
        {/* Golden outer glow */}
        <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-[#D6B47A]/40 via-[#D98C9A]/30 to-[#D6B47A]/40 blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />

        {/* The Frame */}
        <div className="relative p-3.5 sm:p-5 bg-gradient-to-b from-[#FFF4E6] to-[#eddcc7] rounded-3xl shadow-2xl border-4 border-[#D6B47A] w-64 sm:w-80 md:w-96 flex flex-col items-center">
          {/* Photo Slot */}
          <div className="w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden bg-[#21182B] shadow-inner relative">
            <img
              src="/assets/aistudio/bd1_45088bb2.jpg"
              alt="Shinam - Birthday Girl"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle photographic vignette overlay */}
            <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/30 pointer-events-none" />
          </div>

          {/* Golden Name Ribbon underneath photo */}
          <div className="mt-3.5 text-center">
            <span className="font-serif-hero text-2xl sm:text-3xl font-extrabold text-[#793D50] tracking-wider uppercase block">
              SHINAM
            </span>
            <span className="text-[11px] font-sans font-medium text-[#21182B]/70 tracking-widest uppercase">
              The Birthday Queen · 2026
            </span>
          </div>
        </div>
      </div>

      {/* TYPOGRAPHY COMPOSITION */}
      <div className="max-w-2xl mx-auto space-y-4 my-6">
        <h1 className="font-serif-hero text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#D6B47A] tracking-wide leading-tight drop-shadow-md">
          HAPPY 20TH BIRTHDAY, SHINAM!
        </h1>

        <p className="font-serif-hero text-xl sm:text-2xl text-[#D98C9A] font-medium italic">
          "To the girl who's growing older, wiser, stronger... and apparently still 90."
        </p>

        <p className="text-[#FFF4E6]/90 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-sans pt-1">
          Today is all about you. Your journey, your dreams, your achievements and
          everything beautiful that makes you YOU.
        </p>
      </div>

      {/* Button: LET'S CELEBRATE */}
      <div className="mt-4">
        <button
          onClick={onProceedToCakeCut}
          className="px-10 py-4 rounded-xl bg-gradient-to-r from-[#D6B47A] via-[#D98C9A] to-[#D6B47A] hover:brightness-110 text-[#21182B] font-serif-hero font-extrabold text-lg sm:text-xl tracking-wider uppercase shadow-[0_10px_35px_rgba(214,180,122,0.35)] flex items-center gap-3 mx-auto active:scale-95 transition-all cursor-pointer"
        >
          <span>LET'S CELEBRATE</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
