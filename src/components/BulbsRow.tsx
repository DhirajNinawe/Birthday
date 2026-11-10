import React from 'react';

interface BulbsRowProps {
  lightsOn: boolean;
  musicPlaying: boolean;
  onBulbClick?: (index: number) => void;
}

interface BulbData {
  id: string;
  name: string;
  colorName: string;
  litImg: string;
  glowColor: string;
  shadowColor: string;
}

const BULBS: BulbData[] = [
  {
    id: 'bulb_yellow',
    name: 'Sun Yellow',
    colorName: 'yellow',
    litImg: '/assets/aistudio/bulb_yellow_9ca45633.png',
    glowColor: 'rgba(255, 230, 0, 0.85)',
    shadowColor: '#ffe600',
  },
  {
    id: 'bulb_red',
    name: 'Ruby Red',
    colorName: 'red',
    litImg: '/assets/aistudio/bulb_red_1220767f.png',
    glowColor: 'rgba(255, 50, 70, 0.85)',
    shadowColor: '#ff334b',
  },
  {
    id: 'bulb_blue',
    name: 'Electric Blue',
    colorName: 'blue',
    litImg: '/assets/aistudio/bulb_blue_9cbfd55e.png',
    glowColor: 'rgba(0, 180, 255, 0.85)',
    shadowColor: '#00b4ff',
  },
  {
    id: 'bulb_green',
    name: 'Neon Green',
    colorName: 'green',
    litImg: '/assets/aistudio/bulb_green_4ba07dcc.png',
    glowColor: 'rgba(50, 255, 100, 0.85)',
    shadowColor: '#32ff64',
  },
  {
    id: 'bulb_pink',
    name: 'Candy Pink',
    colorName: 'pink',
    litImg: '/assets/aistudio/bulb_pink_d4c2b9cd.png',
    glowColor: 'rgba(255, 100, 200, 0.85)',
    shadowColor: '#ff64c8',
  },
  {
    id: 'bulb_orange',
    name: 'Warm Orange',
    colorName: 'orange',
    litImg: '/assets/aistudio/bulb_orange_fa85d6a0.png',
    glowColor: 'rgba(255, 150, 30, 0.85)',
    shadowColor: '#ff961e',
  },
];

const UNLIT_BULB = '/assets/aistudio/bulb_fb56d261.png';

export const BulbsRow: React.FC<BulbsRowProps> = ({ lightsOn, musicPlaying, onBulbClick }) => {
  return (
    <div className="relative w-full max-w-5xl mx-auto pt-2 pb-4 px-4 select-none z-30">
      {/* Hanging Wire Cord */}
      <div className="absolute top-0 left-0 right-0 h-4 border-b-2 border-slate-700/80 rounded-[50%] pointer-events-none" />

      {/* Bulbs Grid */}
      <div className="grid grid-cols-6 gap-2 sm:gap-6 items-start justify-items-center">
        {BULBS.map((bulb, index) => {
          const isLit = lightsOn;
          return (
            <div
              key={bulb.id}
              onClick={() => onBulbClick && onBulbClick(index)}
              title={`${bulb.name} - Click to interact`}
              className="group flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95"
            >
              {/* Wire drop line & socket */}
              <div className="w-[2px] h-3 sm:h-5 bg-gradient-to-b from-slate-600 to-amber-900/90" />
              <div className="w-3.5 h-2 bg-slate-800 rounded-t-sm border border-slate-700" />

              {/* Bulb Container with light aura */}
              <div className="relative">
                {/* Glowing radial aura when lit */}
                {isLit && (
                  <div
                    className={`absolute inset-[-14px] sm:inset-[-22px] rounded-full blur-xl pointer-events-none transition-opacity duration-1000 ${
                      musicPlaying ? 'animate-pulse' : 'opacity-80'
                    }`}
                    style={{
                      backgroundColor: bulb.glowColor,
                      animationDuration: `${1.2 + (index % 3) * 0.4}s`,
                    }}
                  />
                )}

                {/* Bulb image */}
                <img
                  src={isLit ? bulb.litImg : UNLIT_BULB}
                  alt={bulb.name}
                  className={`w-9 h-11 sm:w-14 sm:h-16 object-contain relative z-10 transition-all duration-700 ${
                    isLit
                      ? 'filter drop-shadow-[0_0_12px_' + bulb.shadowColor + ']'
                      : 'opacity-40 brightness-75'
                  } ${
                    musicPlaying
                      ? 'animate-bounce'
                      : ''
                  }`}
                  style={{
                    animationDuration: `${2 + index * 0.3}s`,
                    animationIterationCount: 'infinite',
                  }}
                  onError={(e) => {
                    // Fallback to stylized CSS bulb
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.bulb-fallback')) {
                      const div = document.createElement('div');
                      div.className = `bulb-fallback w-10 h-14 rounded-full ${
                        isLit ? 'bg-amber-300 shadow-lg' : 'bg-slate-700'
                      }`;
                      parent.appendChild(div);
                    }
                  }}
                />
              </div>

              {/* Socket light beam floor reflection when lit */}
              {isLit && (
                <div
                  className="w-6 h-1 rounded-full mt-1 blur-xs opacity-60"
                  style={{ backgroundColor: bulb.shadowColor }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
