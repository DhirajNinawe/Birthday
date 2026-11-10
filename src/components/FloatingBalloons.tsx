import React, { useEffect, useState } from 'react';
import { fireMiniBurst } from '../utils/confetti';

interface FloatingBalloonsProps {
  flying: boolean;
  formed: boolean;
  recipientName: string;
}

interface BalloonItem {
  id: number;
  img: string;
  defaultLetter: string;
  color: string;
  floatX: number; // percentage 0-100
  floatY: number; // percentage 0-100
  driftX: number;
  driftY: number;
  speed: number;
  popped: boolean;
}

const INITIAL_BALLOONS = [
  { id: 1, img: '/assets/aistudio/b1_73637193.png', defaultLetter: 'H', color: '#F2B300' },
  { id: 2, img: '/assets/aistudio/b2_6c187459.png', defaultLetter: 'B', color: '#0719D4' },
  { id: 3, img: '/assets/aistudio/b3_bf339807.png', defaultLetter: 'D', color: '#D14D39' },
  { id: 4, img: '/assets/aistudio/b4_9b6b02c6.png', defaultLetter: '★', color: '#8FAD00' },
  { id: 5, img: '/assets/aistudio/b5_f923170f.png', defaultLetter: 'Y', color: '#8377E4' },
  { id: 6, img: '/assets/aistudio/b6_ed4e69a5.png', defaultLetter: 'O', color: '#99C96A' },
  { id: 7, img: '/assets/aistudio/b7_61f9cf53.png', defaultLetter: 'U', color: '#20CFB4' },
];

export const FloatingBalloons: React.FC<FloatingBalloonsProps> = ({
  flying,
  formed,
  recipientName,
}) => {
  const [balloons, setBalloons] = useState<BalloonItem[]>([]);

  // Initialize random floating positions
  useEffect(() => {
    const items: BalloonItem[] = INITIAL_BALLOONS.map((b, i) => {
      // Calculate letters: If recipient name is short, use letters of name; else H B D ★ Y O U
      let letter = b.defaultLetter;
      const cleanName = recipientName.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
      if (cleanName.length >= 3 && i < cleanName.length && i < 7) {
        letter = cleanName[i];
      }

      return {
        ...b,
        defaultLetter: letter,
        floatX: 8 + (i * 13) + (Math.random() * 4 - 2),
        floatY: 20 + Math.random() * 50,
        driftX: (Math.random() - 0.5) * 1.5,
        driftY: (Math.random() - 0.5) * 1.5,
        speed: 3 + Math.random() * 2,
        popped: false,
      };
    });
    setBalloons(items);
  }, [recipientName]);

  // Gentle floating animation loop when flying and not formed
  useEffect(() => {
    if (!flying || formed) return;

    const interval = setInterval(() => {
      setBalloons((prev) =>
        prev.map((b) => {
          if (b.popped) return b;
          let newX = b.floatX + b.driftX;
          let newY = b.floatY + b.driftY;
          let newDriftX = b.driftX;
          let newDriftY = b.driftY;

          // Bounce off boundary edges gently
          if (newX < 5 || newX > 90) newDriftX = -newDriftX;
          if (newY < 12 || newY > 75) newDriftY = -newDriftY;

          return {
            ...b,
            floatX: Math.max(4, Math.min(92, newX)),
            floatY: Math.max(10, Math.min(78, newY)),
            driftX: newDriftX,
            driftY: newDriftY,
          };
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, [flying, formed]);

  if (!flying) return null;

  const handlePop = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    fireMiniBurst(e.clientX, e.clientY);
    setBalloons((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );

    // Regenerate balloon after 3 seconds
    setTimeout(() => {
      setBalloons((prev) =>
        prev.map((b) => (b.id === id ? { ...b, popped: false } : b))
      );
    }, 3000);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {/* Balloon Border at bottom */}
      <img
        src="/assets/aistudio/Balloon-Border_d0f3fffe.png"
        alt="Balloon Garland Border"
        className="fixed bottom-0 left-0 right-0 w-full object-cover opacity-60 pointer-events-none z-10 transition-transform duration-1000"
      />

      {balloons.map((b, index) => {
        if (b.popped) return null;

        // Position calculation:
        // If formed: arranged in an arched row near the top center
        // If flying: floating in ambient room
        let style: React.CSSProperties = {};
        if (formed) {
          const total = balloons.length;
          const centerOffset = (index - (total - 1) / 2) * 58; // spacing
          const arcOffset = Math.abs(index - (total - 1) / 2) * 8; // arc curve
          style = {
            position: 'absolute',
            left: `calc(50% + ${centerOffset}px - 36px)`,
            top: `${140 + arcOffset}px`,
            transition: 'all 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          };
        } else {
          style = {
            position: 'absolute',
            left: `${b.floatX}%`,
            top: `${b.floatY}%`,
            transition: 'top 1.2s ease-out, left 1.2s ease-out',
          };
        }

        const swayClass = index % 2 === 0 ? 'balloon-sway-1' : 'balloon-sway-2';

        return (
          <div
            key={b.id}
            style={style}
            onClick={(e) => handlePop(e, b.id)}
            title="Click to pop with confetti!"
            className={`pointer-events-auto cursor-pointer select-none group flex flex-col items-center ${swayClass}`}
          >
            {/* Balloon Image with internal letter */}
            <div className="relative w-16 h-28 sm:w-20 sm:h-36 flex items-center justify-center transition-transform duration-200 group-hover:scale-110 active:scale-90">
              <img
                src={b.img}
                alt={`Balloon ${b.id}`}
                className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.35)]"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                }}
              />

              {/* Bold celebratory Letter/Symbol printed on balloon */}
              <span
                className={`relative z-10 font-signika font-extrabold text-2xl sm:text-3xl drop-shadow-[0_2px_4px_rgba(255,255,255,0.9)] transition-all duration-700 ${
                  formed ? 'scale-110 opacity-100' : 'opacity-85'
                }`}
                style={{
                  color: b.color,
                  textShadow: '0 0 10px #ffffff, 2px 2px 4px rgba(0,0,0,0.4)',
                }}
              >
                {b.defaultLetter}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
