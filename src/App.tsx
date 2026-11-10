import React, { useState } from 'react';
import { Scene } from './types';
import { AudioPlayerFloating } from './components/AudioPlayerFloating';
import { BulbsRow } from './components/BulbsRow';
import { BannerGarland } from './components/BannerGarland';
import { FloatingBalloons } from './components/FloatingBalloons';
import { DarkRoomScene } from './components/DarkRoomScene';
import { MusicIntroScene } from './components/MusicIntroScene';
import { AgeTrapScene } from './components/AgeTrapScene';
import { CakeCeremonyScene } from './components/CakeCeremonyScene';
import { CakeCutAndCatScene } from './components/CakeCutAndCatScene';
import { GiftBoxScene } from './components/GiftBoxScene';
import { PoemScrapbookScene } from './components/PoemScrapbookScene';
import { AchievementsScene } from './components/AchievementsScene';
import { FinalBlessingScene } from './components/FinalBlessingScene';
import { fireCelebrationConfetti, fireSideCannons } from './utils/confetti';

export default function App() {
  const [currentScene, setCurrentScene] = useState<Scene>('dark_room');
  const [lightsOn, setLightsOn] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [candleBlown, setCandleBlown] = useState(false);

  // Transition from dark room to lit room
  const handleLightUp = () => {
    setLightsOn(true);
    setCurrentScene('music_intro');
  };

  // Start music
  const handleStartMusic = () => {
    setMusicPlaying(true);
  };

  // Age selected (90 years)
  const handleSuccessAge = () => {
    setCurrentScene('cake_ceremony');
  };

  // Candle blown
  const handleCandleBlown = () => {
    setCandleBlown(true);
  };

  // Restart the whole experience
  const handleRestart = () => {
    setCurrentScene('dark_room');
    setLightsOn(false);
    setMusicPlaying(false);
    setCandleBlown(false);
  };

  // Ambience styles
  let ambienceClass = 'ambient-night';
  if (musicPlaying) {
    ambienceClass = 'ambient-party';
  } else if (lightsOn) {
    ambienceClass = 'ambient-lit';
  }

  return (
    <div
      className={`min-h-screen w-full relative flex flex-col justify-between overflow-x-hidden ${ambienceClass} text-slate-100 transition-colors duration-1000 select-none`}
    >
      {/* Non-intrusive floating audio player (visible once music stage reached) */}
      {lightsOn && (
        <AudioPlayerFloating
          isPlaying={musicPlaying}
          onTogglePlay={(p) => setMusicPlaying(p)}
        />
      )}

      {/* Hanging Bulbs row (revealed once room is lit) */}
      {lightsOn && (
        <BulbsRow
          lightsOn={lightsOn}
          musicPlaying={musicPlaying}
        />
      )}

      {/* Floating balloons (visible from cake ceremony onwards) */}
      <FloatingBalloons
        flying={lightsOn && currentScene !== 'music_intro' && currentScene !== 'age_trap'}
        formed={currentScene === 'final_blessing'}
        recipientName="BIRTHDAY QUEEN"
      />

      {/* Main Full-Screen Story Viewport */}
      <main className="relative flex-1 flex flex-col items-center justify-center px-4 py-4 z-20 w-full max-w-4xl mx-auto min-h-[85vh]">
        {/* Festive Banner drops during Cake & Final Blessing */}
        {(currentScene === 'cake_ceremony' ||
          currentScene === 'cake_cut_cat' ||
          currentScene === 'final_blessing') && (
          <BannerGarland
            decorated={true}
            recipientName="A Decade of Becoming"
          />
        )}

        {/* SCENE 1: THE DARK ROOM */}
        {currentScene === 'dark_room' && (
          <DarkRoomScene onLightUp={handleLightUp} />
        )}

        {/* SCENE 2: MUSIC INTRO */}
        {currentScene === 'music_intro' && (
          <MusicIntroScene
            onStartMusic={handleStartMusic}
            onProceedToAge={() => setCurrentScene('age_trap')}
          />
        )}

        {/* SCENE 3: THE AGE SELECTION GAME (90-YEAR-OLD TRAP) */}
        {currentScene === 'age_trap' && (
          <AgeTrapScene onSuccessAge={handleSuccessAge} />
        )}

        {/* SCENE 4: THE CAKE CEREMONY & CANDLE BLOWING */}
        {currentScene === 'cake_ceremony' && (
          <CakeCeremonyScene
            onCandleBlown={handleCandleBlown}
            onProceedToCut={() => setCurrentScene('cake_cut_cat')}
          />
        )}

        {/* SCENE 5: CAKE CUTTING AND THE HUNGRY CAT */}
        {currentScene === 'cake_cut_cat' && (
          <CakeCutAndCatScene
            onProceedToGift={() => setCurrentScene('gift_box')}
          />
        )}

        {/* SCENE 6: THE MAIN GIFT - OPEN YOUR GIFT */}
        {currentScene === 'gift_box' && (
          <GiftBoxScene
            onOpenGift={() => setCurrentScene('poem_scrapbook')}
          />
        )}

        {/* SCENE 7: THE PERSONAL POEM - A DECADE OF BECOMING */}
        {currentScene === 'poem_scrapbook' && (
          <PoemScrapbookScene
            onProceedToAchievements={() => setCurrentScene('achievements')}
          />
        )}

        {/* SCENE 8: HER ACHIEVEMENTS - LOOK HOW FAR YOU'VE COME */}
        {currentScene === 'achievements' && (
          <AchievementsScene
            onProceedToBlessing={() => setCurrentScene('final_blessing')}
          />
        )}

        {/* SCENE 9: THE FINAL BIRTHDAY BLESSING */}
        {currentScene === 'final_blessing' && (
          <FinalBlessingScene onRestartExperience={handleRestart} />
        )}
      </main>

      {/* Tiny subtle watermark at bottom: "A Decade of Becoming ❤️" */}
      <div className="relative z-10 pb-3 text-center pointer-events-none">
        <span className="text-[11px] font-signika text-slate-500/70 tracking-wider">
          A DECADE OF BECOMING ❤️ · 20 YEARS OF MEMORIES
        </span>
      </div>
    </div>
  );
}
