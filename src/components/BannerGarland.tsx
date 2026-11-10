import React from 'react';

interface BannerGarlandProps {
  decorated: boolean;
  recipientName: string;
}

export const BannerGarland: React.FC<BannerGarlandProps> = ({ decorated, recipientName }) => {
  if (!decorated) return null;

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 z-20 flex flex-col items-center">
      {/* Decorative Festoon Garland Banner */}
      <div className="w-full flex justify-center animate-banner-drop">
        <div className="relative group cursor-pointer transition-transform duration-300 hover:scale-105">
          <img
            src="/assets/aistudio/banner_9ef5473d.png"
            alt="Happy Birthday Banner"
            className="w-[280px] sm:w-[460px] md:w-[580px] object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)] filter"
            onError={(e) => {
              // Graceful CSS banner fallback
              const target = e.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent && !parent.querySelector('.banner-fallback')) {
                const bannerDiv = document.createElement('div');
                bannerDiv.className = 'banner-fallback py-3 px-8 bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-400 text-white font-extrabold text-2xl rounded-2xl shadow-xl tracking-wider uppercase';
                bannerDiv.innerText = '★ HAPPY BIRTHDAY ★';
                parent.appendChild(bannerDiv);
              }
            }}
          />

          {/* Golden glow aura */}
          <div className="absolute inset-0 bg-amber-400/10 blur-xl rounded-full pointer-events-none" />
        </div>
      </div>

      {/* Recipient Name Spotlight Ribbon */}
      <div className="mt-2 text-center animate-fade-in transition-all duration-700">
        <div className="inline-block py-1 px-4 sm:px-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
          <span className="text-xs uppercase tracking-widest text-amber-200 font-medium mr-2">Celebrating</span>
          <span className="font-signika font-bold text-xl sm:text-2xl text-amber-300 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {recipientName}
          </span>
        </div>
      </div>
    </div>
  );
};
