import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';
import { synthPlayer } from '../utils/audioSynth';

interface AudioPlayerFloatingProps {
  isPlaying: boolean;
  onTogglePlay: (play: boolean) => void;
}

export const AudioPlayerFloating: React.FC<AudioPlayerFloatingProps> = ({
  isPlaying,
  onTogglePlay,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;

    if (isPlaying) {
      const p = audio.play();
      if (p !== undefined) {
        p.catch(() => {
          synthPlayer.playMelody();
        });
      }
    } else {
      audio.pause();
      synthPlayer.stop();
    }
  }, [isPlaying, volume]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-slate-200 shadow-xl select-none transition-all duration-300 hover:bg-black/80">
      <audio
        ref={audioRef}
        src="/assets/aistudio/hbd_592ebc57.mp3"
        loop
        preload="auto"
        onError={() => synthPlayer.playMelody()}
      />

      <button
        onClick={() => onTogglePlay(!isPlaying)}
        className="flex items-center gap-1.5 text-xs font-medium text-amber-300 hover:text-amber-200 transition-colors"
        title={isPlaying ? 'Pause Birthday Music' : 'Play Birthday Music'}
      >
        <Disc
          className={`w-4 h-4 text-amber-400 ${
            isPlaying ? 'animate-spin' : ''
          }`}
          style={{ animationDuration: '4s' }}
        />
        <span className="text-[11px] font-sans tracking-wide">
          {isPlaying ? 'Birthday Song 🎵' : 'Music Paused'}
        </span>
      </button>

      {/* Mini Visualizer */}
      {isPlaying && (
        <div className="flex items-end gap-[2px] h-3 px-1">
          <span className="w-0.5 bg-amber-400 rounded-full animate-pulse h-2" />
          <span
            className="w-0.5 bg-rose-400 rounded-full animate-pulse h-3"
            style={{ animationDelay: '0.15s' }}
          />
          <span
            className="w-0.5 bg-emerald-400 rounded-full animate-pulse h-2.5"
            style={{ animationDelay: '0.3s' }}
          />
        </div>
      )}

      {/* Mute button */}
      <button
        onClick={toggleMute}
        className="p-1 text-slate-400 hover:text-white transition-colors"
        title={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
};
