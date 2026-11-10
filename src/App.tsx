import React, { useState } from 'react';
import { ShinamScene } from './types';
import { AudioPlayerFloating } from './components/AudioPlayerFloating';
import { BulbsRow } from './components/BulbsRow';
import { BannerGarland } from './components/BannerGarland';
import { FloatingBalloons } from './components/FloatingBalloons';
import { DarkRoomScene } from './components/DarkRoomScene';
import { MusicIntroScene } from './components/MusicIntroScene';
import { AgeTrapScene } from './components/AgeTrapScene';
import { CakeCeremonyScene } from './components/CakeCeremonyScene';
import { GrandWishingScene } from './components/GrandWishingScene';
import { CakeCutAndCatScene } from './components/CakeCutAndCatScene';
import { ShinamRunGame } from './components/ShinamRunGame';
import { RewardSketchScene } from './components/RewardSketchScene';
import { GiftBoxScene } from './components/GiftBoxScene';
import { PoemScrapbookScene } from './components/PoemScrapbookScene';
import { AchievementsScene } from './components/AchievementsScene';
import { FinalBlessingScene } from './components/FinalBlessingScene';

export default function App() {
  const [currentScene, setCurrentScene] = useState<ShinamScene>('dark_room');
  const [lightsOn, setLightsOn] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  // Transition from dark room to lit room
  const handleLightUp = () => {
    setLightsOn(true);
    setCurrentScene('music_moment');
  };

  // Start music
  const handleStartMusic = () => {
    setMusicPlaying(true);
  };

  // Restart the whole experience
  const handleRestart = () => {
    setCurrentScene('dark_room');
    setLightsOn(false);
    setMusicPlaying(false);
  };

  // Ambience styles
  let ambienceClass = 'ambient-dark-room';
  if (currentScene === 'grand_wishing' || currentScene === 'final_blessing') {
    ambienceClass = 'ambient-grand-party';
  } else if (lightsOn) {
    ambienceClass = 'ambient-room-lit';
  }

  return (
    <div
      className={`min-h-screen w-full relative flex flex-col justify-between overflow-x-hidden ${ambienceClass} text-[#FFF4E6] transition-colors duration-1000 select-none`}
    >
      {/* Floating unobtrusive audio player */}
      {lightsOn && (
        <AudioPlayerFloating
          isPlaying={musicPlaying}
          onTogglePlay={(p) => setMusicPlaying(p)}
        />
      )}

      {/* Ceiling Hanging Bulbs */}
      {lightsOn && (
        <BulbsRow
          lightsOn={lightsOn}
          musicPlaying={musicPlaying}
        />
      )}

      {/* Floating balloons */}
      <FloatingBalloons
        flying={
          lightsOn &&
          currentScene !== 'dark_room' &&
          currentScene !== 'music_moment' &&
          currentScene !== 'shinam_run'
        }
        formed={currentScene === 'grand_wishing' || currentScene === 'final_blessing'}
        recipientName="SHINAM"
      />

      {/* Main Full-Screen Viewport */}
      <main className="relative flex-1 flex flex-col items-center justify-center px-4 py-4 z-20 w-full max-w-4xl mx-auto min-h-[85vh]">
        {/* Festive Banner */}
        {(currentScene === 'grand_wishing' || currentScene === 'final_blessing') && (
          <BannerGarland
            decorated={true}
            recipientName="Shinam's World"
          />
        )}

        {/* 1. DARK ROOM */}
        {currentScene === 'dark_room' && (
          <DarkRoomScene onLightUp={handleLightUp} />
        )}

        {/* 2. MUSIC MOMENT */}
        {currentScene === 'music_moment' && (
          <MusicIntroScene
            onStartMusic={handleStartMusic}
            onProceedToAge={() => setCurrentScene('age_prank')}
          />
        )}

        {/* 3. AGE PRANK */}
        {currentScene === 'age_prank' && (
          <AgeTrapScene onSuccessAge={() => setCurrentScene('cake_candle')} />
        )}

        {/* 4. CAKE & CANDLE CEREMONY */}
        {currentScene === 'cake_candle' && (
          <CakeCeremonyScene
            onCandleBlown={() => setMusicPlaying(true)}
            onProceedToGrandWishing={() => setCurrentScene('grand_wishing')}
          />
        )}

        {/* 5. GRAND BIRTHDAY WISHING PAGE (MAJOR SCENE) */}
        {currentScene === 'grand_wishing' && (
          <GrandWishingScene
            onProceedToCakeCut={() => setCurrentScene('cake_cat')}
          />
        )}

        {/* 6. CAKE CUTTING AND THE HUNGRY CAT */}
        {currentScene === 'cake_cat' && (
          <CakeCutAndCatScene
            onProceedToGame={() => setCurrentScene('shinam_run')}
          />
        )}

        {/* 7. SHINAM RUN MINI-GAME */}
        {currentScene === 'shinam_run' && (
          <ShinamRunGame
            targetCoins={20}
            onUnlockReward={() => setCurrentScene('reward_sketch')}
          />
        )}

        {/* 8. SECRET REWARD: THE ORIGINAL SKETCH */}
        {currentScene === 'reward_sketch' && (
          <RewardSketchScene
            onContinueToGift={() => setCurrentScene('gift_open')}
          />
        )}

        {/* 9. THE PERSONAL GIFT: OPEN YOUR GIFT */}
        {currentScene === 'gift_open' && (
          <GiftBoxScene
            onOpenGift={() => setCurrentScene('poem_memories')}
          />
        )}

        {/* 10. THE POEM: A DECADE OF BECOMING */}
        {currentScene === 'poem_memories' && (
          <PoemScrapbookScene
            onProceedToAchievements={() => setCurrentScene('achievements')}
          />
        )}

        {/* 11. HER ACHIEVEMENTS: SHINAM, LOOK AT YOU GO */}
        {currentScene === 'achievements' && (
          <AchievementsScene
            onProceedToBlessing={() => setCurrentScene('final_blessing')}
          />
        )}

        {/* 12. FINAL BIRTHDAY BLESSING */}
        {currentScene === 'final_blessing' && (
          <FinalBlessingScene onRestartExperience={handleRestart} />
        )}
      </main>

      {/* Subtle signature footer mark */}
      <div className="relative z-10 pb-3 text-center pointer-events-none">
        <span className="text-[11px] font-serif-hero text-[#D6B47A]/40 tracking-widest uppercase">
          SHINAM'S WORLD ❤️ · A DECADE OF BECOMING · 2026
        </span>
      </div>
    </div>
  );
}
