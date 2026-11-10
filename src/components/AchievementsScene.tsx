import React, { useEffect, useState } from 'react';
import { Award, ArrowRight, Star } from 'lucide-react';
import { ACHIEVEMENTS } from '../types';
import { fireCelebrationConfetti } from '../utils/confetti';

interface AchievementsSceneProps {
  onProceedToBlessing: () => void;
}

export const AchievementsScene: React.FC<AchievementsSceneProps> = ({
  onProceedToBlessing,
}) => {
  const [animatedValues, setAnimatedValues] = useState<number[]>([0, 0, 0]);

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
        <span className="py-1 px-4 rounded-full bg-[#D6B47A]/15 border border-[#D6B47A]/30 text-[#D6B47A] text-xs font-semibold tracking-wider uppercase">
          Milestones of Strength 🌟
        </span>
        <h2 className="font-serif-hero text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#D6B47A]">
          SHINAM, LOOK AT YOU GO!
        </h2>
        <p className="text-[#FFF4E6]/85 text-sm sm:text-base max-w-lg mx-auto font-sans">
          Every hurdle conquered, every chapter written with courage, determination, and grace.
        </p>
      </div>

      {/* 3 MILESTONE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-8">
        {ACHIEVEMENTS.map((item, index) => {
          const isCollege = item.metricType === 'cgpa';
          return (
            <div
              key={item.stage}
              className={`relative bg-[#21182B]/90 border-2 rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col items-center justify-between text-center transition-all duration-300 hover:scale-105 ${
                isCollege
                  ? 'border-[#D6B47A] shadow-[0_0_35px_rgba(214,180,122,0.25)]'
                  : 'border-[#793D50]'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-[#D6B47A]/15 border border-[#D6B47A]/30 flex items-center justify-center text-[#D6B47A] mb-3">
                {isCollege ? <Star className="w-6 h-6 fill-[#D6B47A]" /> : <Award className="w-6 h-6" />}
              </div>

              <h3 className="font-serif-hero font-bold text-lg text-[#FFF4E6] tracking-wider">
                {item.stage}
              </h3>

              <div className="my-3 font-serif-hero font-extrabold text-3xl sm:text-4xl text-[#D6B47A] tracking-tight">
                {isCollege
                  ? `${animatedValues[index]?.toFixed(2)} CGPA`
                  : `${animatedValues[index]}%`}
              </div>

              <p className="text-[#F2C5AD] text-xs sm:text-sm leading-relaxed italic pt-1">
                "{item.description}"
              </p>

              <div
                className={`w-12 h-1 rounded-full mt-4 ${
                  isCollege ? 'bg-[#D6B47A]' : 'bg-[#793D50]'
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
          className="px-8 sm:px-10 py-3.5 rounded-xl bg-gradient-to-r from-[#D6B47A] via-[#D98C9A] to-[#D6B47A] hover:brightness-110 text-[#21182B] font-serif-hero font-extrabold text-base tracking-wider uppercase shadow-2xl flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
        >
          <span>Receive Your Final Birthday Blessing</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
