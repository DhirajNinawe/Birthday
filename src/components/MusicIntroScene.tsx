import React, { useState } from 'react';
import { Music, Disc, ArrowRight } from 'lucide-react';
import { fireCelebrationConfetti } from '../utils/confetti';

interface MusicIntroSceneProps {
  onStartMusic: () => void;
  onProceedToAge: () => void;
}

export const MusicIntroScene: React.FC<MusicIntroSceneProps> = ({
  onStartMusic,
  onProceedToAge,
}) => {
  const [hasStartedMusic, setHasStartedMusic] = useState(false);

  const handlePlay = () => {
    setHasStartedMusic(true);
    onStartMusic();
    fireCelebrationConfetti();
  };

  return (
    <div className="relative z-30 max-w-xl mx-auto px-6 py-8 flex flex-col items-center text-center animate-fade-in select-none">
      {/* Narrative Welcome for Shinam */}
      <div className="mb-6 space-y-2">
        <span className="inline-block py-1 px-4 rounded-full bg-[#D6B47A]/15 border border-[#D6B47A]/30 text-[#D6B47A] text-xs font-semibold tracking-wider uppercase mb-1">
          Welcome to Your World
        </span>
        <h2 className="font-serif-hero text-2xl sm:text-3xl md:text-4xl font-bold text-[#FFF4E6] leading-tight">
          "Well, Shinam... someone has prepared something for you."
        </h2>
        <p className="text-[#F2C5AD] text-base sm:text-lg font-serif-hero italic pt-1">
          First things first. A birthday party without music? 🎶
        </p>
      </div>

      {/* Music Player Card */}
      <div className="w-full bg-[#21182B]/85 backdrop-blur-xl border border-[#D6B47A]/35 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col items-center">
        {/* Turntable Disc */}
        <div className="relative mb-6">
          <div
            className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#120a17] via-[#21182B] to-[#341d31] border-4 border-[#793D50] shadow-2xl flex items-center justify-center ${
              hasStartedMusic ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '3.5s' }}
          >
            <div className="w-16 h-16 rounded-full border border-[#D6B47A]/40 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-[#D6B47A] flex items-center justify-center text-[#21182B] text-xs font-extrabold font-serif-hero">
                SHINAM
              </div>
            </div>
          </div>

          {hasStartedMusic && (
            <div className="absolute inset-0 bg-[#D6B47A]/20 rounded-full blur-xl animate-pulse pointer-events-none" />
          )}
        </div>

        {!hasStartedMusic ? (
          <button
            onClick={handlePlay}
            className="px-8 py-3.5 rounded-xl bg-[#D6B47A] hover:bg-[#c5a266] text-[#21182B] font-serif-hero font-bold text-lg shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Music className="w-5 h-5 text-[#21182B]" />
            <span>Play Birthday Soundtrack 🎵</span>
          </button>
        ) : (
          <div className="space-y-4 animate-fade-in w-full">
            <div className="flex items-center justify-center gap-2 text-[#D6B47A] text-sm font-semibold">
              <Disc className="w-4 h-4 animate-spin" />
              <span>Birthday Soundtrack Playing!</span>
            </div>

            <p className="text-[#FFF4E6] text-sm sm:text-base font-serif-hero italic">
              "Alright Shinam, we have a little problem with your age..."
            </p>

            <button
              onClick={onProceedToAge}
              className="mt-2 w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#D6B47A] to-[#D98C9A] hover:brightness-105 text-[#21182B] font-serif-hero font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <span>Verify Your Exact Age</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
