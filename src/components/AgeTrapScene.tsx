import React, { useState, useRef } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { fireCelebrationConfetti } from '../utils/confetti';

interface AgeTrapSceneProps {
  onSuccessAge: () => void;
}

export const AgeTrapScene: React.FC<AgeTrapSceneProps> = ({ onSuccessAge }) => {
  // Positions for the runaway buttons (relative offsets)
  const [pos20, setPos20] = useState({ x: 0, y: 0 });
  const [pos19, setPos19] = useState({ x: 0, y: 0 });
  const [taunt20, setTaunt20] = useState('20 Years');
  const [taunt19, setTaunt19] = useState('19 Years');
  const [selected90, setSelected90] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const taunts = [
    'Nope! 🏃‍♀️',
    'Too young! 😂',
    'Who are you kidding? 😜',
    'Error 404: Too young!',
    'Try again! 💨',
    'Not on my watch! 🙅‍♀️',
  ];

  // Evasion physics: randomly jumps to a different quadrant away from cursor
  const dodgeButton = (which: '20' | '19') => {
    const maxX = 120;
    const maxY = 140;

    // Pick a random displacement that is noticeably far from current spot
    const newX = (Math.random() > 0.5 ? 1 : -1) * (50 + Math.random() * maxX);
    const newY = (Math.random() > 0.5 ? 1 : -1) * (40 + Math.random() * maxY);

    const randomTaunt = taunts[Math.floor(Math.random() * taunts.length)];

    if (which === '20') {
      setPos20({ x: newX, y: newY });
      setTaunt20(randomTaunt);
      setTimeout(() => setTaunt20('20 Years'), 1400);
    } else {
      setPos19({ x: newX, y: newY });
      setTaunt19(randomTaunt);
      setTimeout(() => setTaunt19('19 Years'), 1400);
    }
  };

  const handleSelect90 = () => {
    setSelected90(true);
    fireCelebrationConfetti();
  };

  return (
    <div
      ref={containerRef}
      className="relative z-30 max-w-2xl mx-auto px-4 py-8 flex flex-col items-center text-center select-none animate-fade-in"
    >
      {/* Header */}
      <div className="mb-6 space-y-2">
        <span className="py-1 px-4 rounded-full bg-amber-400/10 border border-amber-300/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
          Identity Check 🔐
        </span>
        <h2 className="font-signika text-3xl sm:text-4xl md:text-5xl font-extrabold text-amber-200 tracking-wide">
          SELECT YOUR AGE
        </h2>
        <p className="text-slate-300 text-sm sm:text-base">
          Please select your exact chronological age to proceed to your birthday cake.
        </p>
      </div>

      {!selected90 ? (
        <div className="relative w-full min-h-[300px] sm:min-h-[340px] flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-6 py-6">
          {/* Card 1: 20 Years (Runs away!) */}
          <div
            onMouseEnter={() => dodgeButton('20')}
            onTouchStart={() => dodgeButton('20')}
            onClick={() => dodgeButton('20')}
            style={{
              transform: `translate(${pos20.x}px, ${pos20.y}px)`,
              transition: 'transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
            className="cursor-pointer group w-44 sm:w-48 p-6 rounded-3xl bg-slate-900/90 border border-slate-700 hover:border-rose-400 shadow-xl flex flex-col items-center justify-center transition-colors active:scale-90"
          >
            <span className="text-3xl mb-2">🌸</span>
            <span className="font-signika font-bold text-xl text-slate-100 group-hover:text-rose-300 transition-colors">
              {taunt20}
            </span>
            <span className="text-[11px] text-slate-400 mt-1">Prime twenties</span>
          </div>

          {/* Card 2: 19 Years (Runs away!) */}
          <div
            onMouseEnter={() => dodgeButton('19')}
            onTouchStart={() => dodgeButton('19')}
            onClick={() => dodgeButton('19')}
            style={{
              transform: `translate(${pos19.x}px, ${pos19.y}px)`,
              transition: 'transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
            className="cursor-pointer group w-44 sm:w-48 p-6 rounded-3xl bg-slate-900/90 border border-slate-700 hover:border-pink-400 shadow-xl flex flex-col items-center justify-center transition-colors active:scale-90"
          >
            <span className="text-3xl mb-2">🦋</span>
            <span className="font-signika font-bold text-xl text-slate-100 group-hover:text-pink-300 transition-colors">
              {taunt19}
            </span>
            <span className="text-[11px] text-slate-400 mt-1">Teenage exit</span>
          </div>

          {/* Card 3: 90 Years (Completely stationary, glowing, valid!) */}
          <div
            onClick={handleSelect90}
            className="cursor-pointer group relative w-48 sm:w-52 p-6 rounded-3xl bg-gradient-to-b from-amber-500/20 via-slate-900 to-amber-950/40 border-2 border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_45px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center"
          >
            {/* Crown Badge */}
            <div className="absolute -top-3 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold uppercase tracking-wider shadow-md">
              Honest Truth ✨
            </div>
            <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">
              👵
            </span>
            <span className="font-signika font-extrabold text-2xl text-amber-300">
              90 Years
            </span>
            <span className="text-[11px] text-amber-200/80 mt-1 font-medium">
              Centuries of Wisdom
            </span>
          </div>
        </div>
      ) : (
        /* Funny reaction on picking 90 */
        <div className="w-full bg-slate-900/90 border border-amber-400/40 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center space-y-4 animate-fade-in">
          {/* Vintage Stamp / Elderly Animation */}
          <div className="relative w-24 h-24 rounded-full bg-amber-400/20 border-2 border-dashed border-amber-400 flex items-center justify-center text-5xl shadow-inner animate-bounce">
            👵
          </div>

          <h3 className="font-signika font-bold text-2xl sm:text-3xl text-amber-300">
            Finally! A truthful answer. We knew it!
          </h3>

          <p className="text-slate-300 text-sm sm:text-base max-w-md leading-relaxed">
            Congratulations on reaching 90 fabulous years of wisdom, mischief, and beauty!
            Now let's get you that legendary birthday cake you deserve!
          </p>

          <button
            onClick={onSuccessAge}
            className="mt-4 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 hover:from-amber-300 hover:to-rose-300 text-slate-950 font-signika font-bold text-base shadow-xl flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <span>Proceed to the Cake Ceremony</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
