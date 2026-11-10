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
          ? 'bg-gradient-to-b from-[#34223d] via-[#21182B] to-[#181120]'
          : 'bg-[#0f0a14]'
      }`}
    >
      {/* Faint Silhouettes in the darkness */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
          isSwitching ? 'opacity-85' : 'opacity-10'
        }`}
      >
        {/* Silhouette of Hanging Bunting Garland at top */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-2xl h-16 border-b border-dashed border-[#D6B47A]/30 rounded-b-[40%] flex justify-around items-end pb-1">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-6 bg-[#D6B47A]/20 rotate-12 transform origin-top"
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
            />
          ))}
        </div>

        {/* Shadowy Balloon Clusters */}
        <div className="absolute top-20 left-10 w-24 h-32 rounded-full bg-[#D98C9A]/10 blur-xs" />
        <div className="absolute top-28 right-12 w-28 h-36 rounded-full bg-[#D6B47A]/10 blur-xs" />
        <div className="absolute bottom-32 left-1/4 w-32 h-40 rounded-full bg-[#793D50]/15 blur-sm" />
        <div className="absolute bottom-28 right-1/4 w-28 h-36 rounded-full bg-[#D98C9A]/15 blur-sm" />
      </div>

      {/* Top Whisper */}
      <div className="pt-16 sm:pt-24 text-center px-4 z-10">
        <p className="text-[#FFF4E6]/40 font-serif-hero text-sm tracking-widest uppercase transition-opacity duration-700">
          {isSwitching ? '✨ Awakening Shinam’s World...' : 'Secret Birthday Room · Pitch Black'}
        </p>
      </div>

      {/* Center Darkness Mood */}
      <div className="my-auto flex flex-col items-center justify-center text-center px-6 z-10">
        <div
          className={`w-20 h-20 rounded-full border border-[#D6B47A]/30 flex items-center justify-center transition-all duration-700 ${
            isSwitching
              ? 'scale-150 bg-[#D6B47A]/25 shadow-[0_0_80px_rgba(214,180,122,0.6)]'
              : 'bg-black/40'
          }`}
        >
          <Sparkles
            className={`w-8 h-8 transition-colors duration-700 ${
              isSwitching ? 'text-[#D6B47A] animate-spin' : 'text-[#FFF4E6]/25'
            }`}
          />
        </div>
      </div>

      {/* Bottom Center Button */}
      <div className="pb-16 sm:pb-24 z-20 flex flex-col items-center">
        <button
          onClick={handleClick}
          disabled={isSwitching}
          className="relative px-9 sm:px-11 py-4 rounded-xl bg-[#D6B47A] hover:bg-[#c5a266] text-[#21182B] font-serif-hero font-extrabold text-lg sm:text-xl tracking-wider uppercase shadow-[0_10px_35px_rgba(214,180,122,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 cursor-pointer disabled:opacity-80"
        >
          <span>{isSwitching ? 'Lights Turning On...' : 'BLOW UP PARTY'}</span>
        </button>
        <span className="mt-3 text-[11px] text-[#FFF4E6]/50 tracking-wider font-sans">
          Tap to light up the secret room
        </span>
      </div>
    </div>
  );
};
