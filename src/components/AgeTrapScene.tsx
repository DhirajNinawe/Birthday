import React, { useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { fireCelebrationConfetti } from '../utils/confetti';

interface AgeTrapSceneProps {
  onSuccessAge: () => void;
}

export const AgeTrapScene: React.FC<AgeTrapSceneProps> = ({ onSuccessAge }) => {
  const [pos20, setPos20] = useState({ x: 0, y: 0 });
  const [pos19, setPos19] = useState({ x: 0, y: 0 });
  const [taunt20, setTaunt20] = useState('20');
  const [taunt19, setTaunt19] = useState('19');
  const [selected90, setSelected90] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const taunts = [
    'Nope! 🏃‍♀️',
    'Too young! 😂',
    'Nice try, Shinam! 😜',
    'Error 404: Too young!',
    'Try again! 💨',
    'Not today! 🙅‍♀️',
  ];

  const dodgeButton = (which: '20' | '19') => {
    const maxX = 110;
    const maxY = 130;
    const newX = (Math.random() > 0.5 ? 1 : -1) * (45 + Math.random() * maxX);
    const newY = (Math.random() > 0.5 ? 1 : -1) * (35 + Math.random() * maxY);

    const randomTaunt = taunts[Math.floor(Math.random() * taunts.length)];

    if (which === '20') {
      setPos20({ x: newX, y: newY });
      setTaunt20(randomTaunt);
      setTimeout(() => setTaunt20('20'), 1300);
    } else {
      setPos19({ x: newX, y: newY });
      setTaunt19(randomTaunt);
      setTimeout(() => setTaunt19('19'), 1300);
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
        <span className="py-1 px-4 rounded-full bg-[#D6B47A]/15 border border-[#D6B47A]/30 text-[#D6B47A] text-xs font-semibold tracking-wider uppercase">
          Identity Check 🔐
        </span>
        <h2 className="font-serif-hero text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#D6B47A] tracking-wide">
          SHINAM, SELECT YOUR AGE
        </h2>
        <p className="text-[#FFF4E6]/80 text-sm sm:text-base font-sans">
          Select your true age to unlock your birthday cake and surprises.
        </p>
      </div>

      {!selected90 ? (
        <div className="relative w-full min-h-[300px] sm:min-h-[330px] flex flex-col sm:flex-row items-center justify-center gap-6 py-6">
          {/* Option 20 (Evades) */}
          <div
            onMouseEnter={() => dodgeButton('20')}
            onTouchStart={() => dodgeButton('20')}
            onClick={() => dodgeButton('20')}
            style={{
              transform: `translate(${pos20.x}px, ${pos20.y}px)`,
              transition: 'transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
            className="cursor-pointer group w-40 sm:w-44 p-6 rounded-2xl bg-[#21182B] border border-[#793D50] hover:border-[#D98C9A] shadow-xl flex flex-col items-center justify-center transition-colors active:scale-90"
          >
            <span className="text-3xl mb-1">🌸</span>
            <span className="font-serif-hero font-bold text-2xl text-[#FFF4E6]">
              {taunt20}
            </span>
            <span className="text-[11px] text-[#FFF4E6]/60 mt-1">Years</span>
          </div>

          {/* Option 19 (Evades) */}
          <div
            onMouseEnter={() => dodgeButton('19')}
            onTouchStart={() => dodgeButton('19')}
            onClick={() => dodgeButton('19')}
            style={{
              transform: `translate(${pos19.x}px, ${pos19.y}px)`,
              transition: 'transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
            className="cursor-pointer group w-40 sm:w-44 p-6 rounded-2xl bg-[#21182B] border border-[#793D50] hover:border-[#D98C9A] shadow-xl flex flex-col items-center justify-center transition-colors active:scale-90"
          >
            <span className="text-3xl mb-1">🦋</span>
            <span className="font-serif-hero font-bold text-2xl text-[#FFF4E6]">
              {taunt19}
            </span>
            <span className="text-[11px] text-[#FFF4E6]/60 mt-1">Years</span>
          </div>

          {/* Option 90 (Stationary & Clickable) */}
          <div
            onClick={handleSelect90}
            className="cursor-pointer group relative w-44 sm:w-48 p-6 rounded-2xl bg-gradient-to-b from-[#793D50]/40 via-[#21182B] to-[#793D50]/60 border-2 border-[#D6B47A] shadow-[0_0_30px_rgba(214,180,122,0.3)] hover:shadow-[0_0_45px_rgba(214,180,122,0.6)] hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center"
          >
            <span className="text-4xl mb-1 group-hover:scale-110 transition-transform">
              👵
            </span>
            <span className="font-serif-hero font-extrabold text-3xl text-[#D6B47A]">
              90
            </span>
            <span className="text-[11px] text-[#F2C5AD] mt-1 font-medium">
              Years of Wisdom
            </span>
          </div>
        </div>
      ) : (
        /* Funny reaction on picking 90 */
        <div className="w-full bg-[#21182B]/90 border border-[#D6B47A]/40 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center space-y-4 animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-[#D6B47A]/20 border-2 border-dashed border-[#D6B47A] flex items-center justify-center text-4xl shadow-inner animate-bounce">
            👵
          </div>

          <h3 className="font-serif-hero font-bold text-2xl sm:text-3xl text-[#D6B47A]">
            "At last! Someone accepted their true age."
          </h3>

          <p className="text-[#FFF4E6]/90 text-sm sm:text-base max-w-md leading-relaxed">
            Congratulations, Shinam! 90 glorious years of mischief, wisdom, and elegance!
            Now let's bring out your birthday cake!
          </p>

          <button
            onClick={onSuccessAge}
            className="mt-3 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D6B47A] to-[#D98C9A] hover:brightness-105 text-[#21182B] font-serif-hero font-bold text-base shadow-xl flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <span>Proceed to Your Cake</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
