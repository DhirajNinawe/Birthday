import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { fireCelebrationConfetti } from '../utils/confetti';

interface DarkRoomSceneProps {
  onLightUp: () => void;
}

export const DarkRoomScene: React.FC<DarkRoomSceneProps> = ({ onLightUp }) => {
  const [isSwitching, setIsSwitching] = useState(false);

  const handleClick = () => {
    setIsSwitching(true);
    fireCelebrationConfetti();
    setTimeout(() => {
      onLightUp();
    }, 1800);
  };

  return (
    <div
      className={`fixed inset-0 z-40 flex flex-col justify-between items-center transition-all duration-1000 select-none overflow-hidden ${
        isSwitching
          ? 'bg-gradient-to-b from-amber-950/80 via-slate-900 to-amber-900/60'
          : 'bg-[#030305]'
      }`}
    >
      {/* Faint Silhouettes in the darkness */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
          isSwitching ? 'opacity-80' : 'opacity-10'
        }`}
      >
        {/* Silhouette of Hanging Bunting Garland at top */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-2xl h-16 border-b border-dashed border-white/20 rounded-b-[40%] flex justify-around items-end pb-1">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-6 bg-white/10 rotate-12 transform origin-top"
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
            />
          ))}
        </div>

        {/* Shadowy Balloon Clusters */}
        <div className="absolute top-20 left-10 w-24 h-32 rounded-full bg-white/5 blur-xs" />
        <div className="absolute top-28 right-12 w-28 h-36 rounded-full bg-white/5 blur-xs" />
        <div className="absolute bottom-32 left-1/4 w-32 h-40 rounded-full bg-white/5 blur-sm" />
        <div className="absolute bottom-28 right-1/4 w-28 h-36 rounded-full bg-white/5 blur-sm" />

        {/* Ambient room sparkle particles */}
        <div className="absolute top-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-amber-400/20 animate-ping" />
        <div
          className="absolute top-1/2 right-1/3 w-1 h-1 rounded-full bg-amber-200/25 animate-ping"
          style={{ animationDelay: '1.2s' }}
        />
      </div>

      {/* Top Quiet Whisper */}
      <div className="pt-16 sm:pt-24 text-center px-4 z-10">
        <p className="text-slate-600 font-sans text-xs tracking-widest uppercase transition-opacity duration-700">
          {isSwitching ? '✨ Flipping the switch...' : 'Shh... quiet in the room'}
        </p>
      </div>

      {/* Center Darkness Mood */}
      <div className="my-auto flex flex-col items-center justify-center text-center px-6 z-10">
        <div
          className={`w-20 h-20 rounded-full border border-amber-500/20 flex items-center justify-center transition-all duration-700 ${
            isSwitching
              ? 'scale-150 bg-amber-400/20 shadow-[0_0_80px_rgba(251,191,36,0.6)]'
              : 'bg-black/40'
          }`}
        >
          <Sparkles
            className={`w-8 h-8 transition-colors duration-700 ${
              isSwitching ? 'text-amber-300 animate-spin' : 'text-slate-700'
            }`}
          />
        </div>
      </div>

      {/* Bottom Center Glowing Button */}
      <div className="pb-16 sm:pb-24 z-20 flex flex-col items-center">
        <div className="relative group">
          {/* Subtle Ambient Pulse Halo */}
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-amber-500/40 via-rose-500/40 to-yellow-400/40 blur-lg group-hover:opacity-100 opacity-60 animate-pulse transition-opacity" />

          <button
            onClick={handleClick}
            disabled={isSwitching}
            className="relative px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-amber-400 via-rose-400 to-amber-300 text-slate-950 font-signika font-bold text-lg sm:text-xl shadow-[0_0_35px_rgba(245,158,11,0.5)] hover:shadow-[0_0_50px_rgba(245,158,11,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 cursor-pointer disabled:opacity-80"
          >
            <span>{isSwitching ? 'Lights Turning On...' : 'Blow Up Party 🎉'}</span>
          </button>
        </div>
        <span className="mt-3 text-[11px] text-slate-600 tracking-wider font-mono">
          Tap to light up the room
        </span>
      </div>
    </div>
  );
};
