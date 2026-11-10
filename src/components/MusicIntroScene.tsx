import React, { useState } from 'react';
import { Music, Sparkles, Disc, ArrowRight } from 'lucide-react';
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
      {/* Playful Welcome Message */}
      <div className="mb-6 space-y-2">
        <span className="inline-block py-1 px-4 rounded-full bg-amber-400/10 border border-amber-300/30 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-2">
          Surprise Unlocked ✨
        </span>
        <h2 className="font-signika text-2xl sm:text-3xl md:text-4xl font-bold text-amber-200 leading-tight">
          Well, someone deserves a proper birthday celebration!
        </h2>
        <p className="text-slate-300 text-base sm:text-lg font-medium pt-2">
          But wait... every birthday party needs some music first! 🎶
        </p>
      </div>

      {/* Music Player Card */}
      <div className="w-full bg-slate-900/80 backdrop-blur-xl border border-amber-400/30 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col items-center">
        {/* Vinyl Disc Animation */}
        <div className="relative mb-6">
          <div
            className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-slate-950 via-slate-800 to-slate-900 border-4 border-slate-700 shadow-2xl flex items-center justify-center ${
              hasStartedMusic ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '3.5s' }}
          >
            {/* Grooves */}
            <div className="w-16 h-16 rounded-full border border-slate-600/50 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-rose-400 flex items-center justify-center text-slate-950 text-xs font-bold">
                HBD
              </div>
            </div>
          </div>

          {/* Golden Sound Glow */}
          {hasStartedMusic && (
            <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl animate-pulse pointer-events-none" />
          )}
        </div>

        {!hasStartedMusic ? (
          <button
            onClick={handlePlay}
            className="group px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-rose-400 to-amber-300 text-slate-950 font-signika font-bold text-lg shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Music className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
            <span>Play Birthday Song 🎵</span>
          </button>
        ) : (
          <div className="space-y-4 animate-fade-in w-full">
            <div className="flex items-center justify-center gap-2 text-emerald-300 text-sm font-semibold">
              <Disc className="w-4 h-4 animate-spin" />
              <span>Birthday Soundtrack Playing!</span>
            </div>

            <p className="text-amber-200 text-sm sm:text-base font-signika italic">
              "Alright birthday girl, let's check something important..."
            </p>

            <button
              onClick={onProceedToAge}
              className="mt-2 w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 to-rose-400 hover:from-amber-300 hover:to-rose-300 text-slate-950 font-signika font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Verify Birthday Girl's Age</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
