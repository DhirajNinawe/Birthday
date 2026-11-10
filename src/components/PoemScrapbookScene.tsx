import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { POEM_CARDS } from '../types';
import { fireCelebrationConfetti } from '../utils/confetti';

interface PoemScrapbookSceneProps {
  onProceedToAchievements: () => void;
}

export const PoemScrapbookScene: React.FC<PoemScrapbookSceneProps> = ({
  onProceedToAchievements,
}) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const card = POEM_CARDS[activeCardIndex];
  const isLast = activeCardIndex === POEM_CARDS.length - 1;

  const handleNext = () => {
    if (activeCardIndex < POEM_CARDS.length - 1) {
      setActiveCardIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeCardIndex > 0) {
      setActiveCardIndex((prev) => prev - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative z-30 w-full max-w-3xl mx-auto px-4 py-6 flex flex-col items-center select-none animate-fade-in"
    >
      {/* Chapter Indicator */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-semibold text-[#D6B47A] uppercase tracking-widest">
          A Decade of Becoming · Shinam
        </span>
        <span className="text-[#FFF4E6]/40">·</span>
        <span className="text-xs font-mono text-[#FFF4E6]/60">
          Card {activeCardIndex + 1} of {POEM_CARDS.length}
        </span>
      </div>

      {/* SCRAPBOOK CARD CONTAINER */}
      <div
        key={card.id}
        className="w-full bg-[#21182B]/95 border-2 border-[#D6B47A]/35 rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8 transition-all duration-500 animate-fade-in"
      >
        {/* Subtle decorative washi tape */}
        <div className="absolute -top-3 left-8 w-20 h-6 bg-[#D6B47A]/30 border-y border-[#D6B47A]/40 rotate-[-4deg] pointer-events-none shadow-xs" />
        <div className="absolute -bottom-3 right-8 w-20 h-6 bg-[#D98C9A]/30 border-y border-[#D98C9A]/40 rotate-[3deg] pointer-events-none shadow-xs" />

        {/* LEFT: PHOTOGRAPH (PRESERVING SHINAM'S ACTUAL PHOTO) */}
        <div className="shrink-0 flex flex-col items-center">
          <div className="relative p-3 pb-6 bg-[#FFF4E6] rounded-xl shadow-2xl border-2 border-[#D6B47A]/60 w-48 sm:w-56 -rotate-2 hover:rotate-0 transition-transform duration-300">
            <div className="w-full h-36 sm:h-44 rounded-lg overflow-hidden bg-[#21182B] relative">
              <img
                src="/assets/aistudio/bd1_45088bb2.jpg"
                alt="Shinam's Memory"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="mt-2 text-center">
              <p className="font-handwriting font-bold text-[#793D50] text-sm truncate">
                {card.photoCaption}
              </p>
            </div>

            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-[#D6B47A]/60 border border-[#D6B47A] rotate-1 shadow-xs" />
          </div>
        </div>

        {/* RIGHT: POEM STANZA */}
        <div className="flex-1 flex flex-col justify-center text-left space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D6B47A]" />
            <h3 className="font-serif-hero font-bold text-2xl sm:text-3xl text-[#D6B47A]">
              {card.title}
            </h3>
          </div>

          <div className="space-y-3 text-[#FFF4E6] text-base sm:text-lg leading-relaxed font-sans font-normal">
            {card.lines.map((line, idx) => (
              <p
                key={idx}
                className={
                  isLast && idx === card.lines.length - 1
                    ? 'font-serif-hero font-bold text-2xl sm:text-3xl text-[#D98C9A] pt-2 animate-pulse'
                    : ''
                }
              >
                {line}
              </p>
            ))}
          </div>

          {isLast && (
            <div className="pt-2 flex items-center gap-2 text-[#D98C9A] animate-fade-in">
              <Heart className="w-5 h-5 fill-[#D98C9A] text-[#D98C9A] animate-bounce" />
              <span className="font-serif-hero text-sm font-semibold uppercase tracking-wider text-[#D6B47A]">
                Always in your corner, Shinam
              </span>
            </div>
          )}
        </div>
      </div>

      {/* NAVIGATION CONTROLS */}
      <div className="mt-6 w-full flex items-center justify-between gap-4 px-2">
        <button
          onClick={handlePrev}
          disabled={activeCardIndex === 0}
          className="px-4 py-2 rounded-xl bg-[#21182B] border border-[#793D50] hover:bg-[#341d31] text-[#FFF4E6] disabled:opacity-30 transition-all text-xs sm:text-sm font-medium flex items-center gap-1.5 active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Card</span>
        </button>

        <div className="flex items-center gap-1.5">
          {POEM_CARDS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveCardIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === activeCardIndex
                  ? 'w-6 bg-[#D6B47A]'
                  : 'w-2 bg-[#793D50] hover:bg-[#D98C9A]'
              }`}
              title={`Card ${i + 1}`}
            />
          ))}
        </div>

        {!isLast ? (
          <button
            onClick={handleNext}
            className="px-5 py-2 rounded-xl bg-[#D6B47A] hover:bg-[#c5a266] text-[#21182B] font-serif-hero font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <span>Next Card</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => {
              fireCelebrationConfetti();
              onProceedToAchievements();
            }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D6B47A] via-[#D98C9A] to-[#D6B47A] text-[#21182B] font-serif-hero font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-xl active:scale-95 transition-all animate-bounce cursor-pointer"
          >
            <span>See Your Journey's Milestones</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
