import React, { useEffect, useState } from 'react';
import { Award, Sparkles, ArrowRight, Star } from 'lucide-react';
import { ACHIEVEMENTS } from '../types';
import { fireCelebrationConfetti } from '../utils/confetti';

interface AchievementsSceneProps {
  onProceedToBlessing: () => void;
}

export const AchievementsScene: React.FC<AchievementsSceneProps> = ({
  onProceedToBlessing,
}) => {
  const [animatedValues, setAnimatedValues] = useState<number[]>([0, 0, 0]);

  // Smooth counter animation
  useEffect(() => {
    fireCelebrationConfetti();
    const duration = 1800;
    const steps = 30;
    const intervalTime = duration / steps;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      const progress = stepCount / steps;
      setAnimatedValues([
        Math.min(85, Math.round(85 * progress)),
        Math.min(71, Math.round(71 * progress)),
        Math.min(8.95, parseFloat((8.95 * progress).toFixed(2))),
      ]);

      if (stepCount >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative z-30 max-w-3xl mx-auto px-4 py-8 flex flex-col items-center text-center select-none animate-fade-in">
      {/* Header */}
      <div className="mb-8 space-y-2">
        <span className="py-1 px-4 rounded-full bg-amber-400/10 border border-amber-300/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
          Milestones of Strength 🌟
        </span>
        <h2 className="font-signika text-3xl sm:text-4xl md:text-5xl font-extrabold text-amber-200">
          LOOK HOW FAR YOU'VE COME!
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto">
          Every hurdle conquered, every late night conquered, every dream chased with pure grit.
        </p>
      </div>

      {/* 3 MILESTONE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-8">
        {ACHIEVEMENTS.map((item, index) => {
          const isCollege = item.metricType === 'cgpa';
          return (
            <div
              key={item.stage}
              className={`relative bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-950 border rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col items-center justify-between text-center transition-all duration-300 hover:scale-105 ${
                isCollege
                  ? 'border-amber-400/50 shadow-[0_0_35px_rgba(245,158,11,0.25)]'
                  : 'border-slate-700/80'
              }`}
            >
              {/* Star badge */}
              <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-300/30 flex items-center justify-center text-amber-300 mb-3">
                {isCollege ? <Star className="w-6 h-6 fill-amber-400" /> : <Award className="w-6 h-6" />}
              </div>

              {/* Stage Title */}
              <h3 className="font-signika font-bold text-lg text-slate-200">
                {item.stage}
              </h3>

              {/* Animated Metric Number */}
              <div className="my-3 font-signika font-extrabold text-3xl sm:text-4xl text-amber-300 tracking-tight">
                {isCollege
                  ? `${animatedValues[index]?.toFixed(2)} CGPA`
                  : `${animatedValues[index]}%`}
              </div>

              {/* Description */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic pt-1">
                "{item.description}"
              </p>

              {/* Subtle bottom accent line */}
              <div
                className={`w-12 h-1 rounded-full mt-4 ${
                  isCollege ? 'bg-amber-400' : 'bg-slate-700'
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Proceed Button */}
      <div className="animate-fade-in">
        <button
          onClick={onProceedToBlessing}
          className="px-8 sm:px-10 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-rose-400 to-amber-300 hover:from-amber-300 hover:to-rose-300 text-slate-950 font-signika font-bold text-base shadow-2xl flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
        >
          <span>Receive Your Birthday Blessing</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
