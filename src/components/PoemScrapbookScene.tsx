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

  // Touch gesture support for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      // Swiped left -> next
      handleNext();
    } else if (diff < -50) {
      // Swiped right -> prev
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
        <span className="text-xs font-semibold text-amber-300 uppercase tracking-widest">
          A Decade of Becoming
        </span>
        <span className="text-slate-500">·</span>
        <span className="text-xs font-mono text-slate-400">
          Card {activeCardIndex + 1} of {POEM_CARDS.length}
        </span>
      </div>

      {/* SCRAPBOOK CARD CONTAINER */}
      <div
        key={card.id}
        className="w-full bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-black border border-amber-400/25 rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8 transition-all duration-500 animate-fade-in"
      >
        {/* Decorative corner washi tape */}
        <div className="absolute -top-3 left-8 w-20 h-6 bg-amber-200/30 border-y border-amber-200/40 rotate-[-4deg] pointer-events-none shadow-xs" />
        <div className="absolute -bottom-3 right-8 w-20 h-6 bg-rose-200/30 border-y border-rose-200/40 rotate-[3deg] pointer-events-none shadow-xs" />

        {/* Ambient colored aura */}
        <div
          className="absolute -top-20 -left-20 w-56 h-56 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: card.accent }}
        />

        {/* LEFT / TOP: MEMORY PHOTO FRAME (PRESERVING HER ACTUAL PHOTO) */}
        <div className="shrink-0 flex flex-col items-center">
          <div className="relative p-3 pb-6 bg-white rounded-xl shadow-2xl border border-slate-200 w-48 sm:w-56 -rotate-2 hover:rotate-0 transition-transform duration-300">
            {/* Real photo */}
            <div className="w-full h-36 sm:h-44 rounded-lg overflow-hidden bg-slate-950 relative">
              <img
                src="/assets/aistudio/bd1_45088bb2.jpg"
                alt="Birthday Memory"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Handwritten style caption */}
            <div className="mt-2 text-center">
              <p className="font-signika font-bold text-slate-800 text-xs truncate">
                {card.photoCaption}
              </p>
            </div>

            {/* Tape on top */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-amber-100/80 border border-amber-200/60 rotate-1 shadow-xs" />
          </div>
        </div>

        {/* RIGHT / MAIN: POEM STANZA */}
        <div className="flex-1 flex flex-col justify-center text-left space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="font-signika font-bold text-xl sm:text-2xl text-amber-200">
              {card.title}
            </h3>
          </div>

          {/* Stanza Lines */}
          <div className="space-y-2.5 text-slate-200 text-base sm:text-lg leading-relaxed font-sans font-normal">
            {card.lines.map((line, idx) => (
              <p
                key={idx}
                className={
                  isLast && idx === card.lines.length - 1
                    ? 'font-signika font-bold text-xl sm:text-2xl text-rose-400 pt-2 animate-pulse'
                    : ''
                }
              >
                {line}
              </p>
            ))}
          </div>

          {/* Glowing heart on final card */}
          {isLast && (
            <div className="pt-2 flex items-center gap-2 text-rose-400 animate-fade-in">
              <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-bounce" />
              <span className="font-signika text-xs font-semibold uppercase tracking-wider text-amber-300">
                Forever proud of you
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
          className="px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700/80 hover:bg-slate-800 text-slate-300 disabled:opacity-30 disabled:hover:bg-slate-900 transition-all text-xs sm:text-sm font-medium flex items-center gap-1.5 active:scale-95"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Card</span>
        </button>

        {/* Card Dots */}
        <div className="flex items-center gap-1.5">
          {POEM_CARDS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveCardIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === activeCardIndex
                  ? 'w-6 bg-amber-400'
                  : 'w-2 bg-slate-700 hover:bg-slate-600'
              }`}
              title={`Card ${i + 1}`}
            />
          ))}
        </div>

        {!isLast ? (
          <button
            onClick={handleNext}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-rose-400 hover:from-amber-300 hover:to-rose-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
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
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-rose-400 to-amber-300 hover:from-amber-300 hover:to-rose-300 text-slate-950 font-signika font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-xl active:scale-95 transition-all animate-bounce"
          >
            <span>Look How Far You've Come!</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
