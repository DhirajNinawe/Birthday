import React, { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';
import { synthPlayer } from '../utils/audioSynth';

interface AudioControllerProps {
  isPlaying: boolean;
  onTogglePlay: (playState: boolean) => void;
}

export const AudioController: React.FC<AudioControllerProps> = ({
  isPlaying,
  onTogglePlay,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [useSynth, setUseSynth] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser restricts audio or file fails, trigger synth player fallback
          setUseSynth(true);
          synthPlayer.playMelody();
        });
      }
    } else {
      audio.pause();
      if (useSynth) {
        synthPlayer.stop();
      }
    }
  }, [isPlaying, volume, useSynth]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-full px-3 py-1.5 shadow-lg select-none">
      <audio
        ref={audioRef}
        src="/assets/aistudio/hbd_592ebc57.mp3"
        loop
        preload="auto"
        onError={() => {
          setUseSynth(true);
        }}
      />

      <button
        onClick={() => onTogglePlay(!isPlaying)}
        className="flex items-center gap-1.5 text-xs font-medium text-amber-300 hover:text-amber-200 transition-colors"
        title={isPlaying ? 'Pause soundtrack' : 'Play soundtrack'}
      >
        <Disc
          className={`w-4 h-4 text-amber-400 ${
            isPlaying ? 'animate-spin' : ''
          }`}
          style={{ animationDuration: '3s' }}
        />
        <span className="hidden sm:inline">
          {isPlaying ? 'Birthday Melody' : 'Music Off'}
        </span>
      </button>

      {/* Mini equalizer bars */}
      {isPlaying && (
        <div className="flex items-end gap-[2px] h-3.5 px-1">
          <span className="w-1 bg-amber-400 rounded-full animate-pulse h-2" />
          <span className="w-1 bg-rose-400 rounded-full animate-pulse h-3.5" style={{ animationDelay: '0.2s' }} />
          <span className="w-1 bg-emerald-400 rounded-full animate-pulse h-2.5" style={{ animationDelay: '0.4s' }} />
        </div>
      )}

      {/* Volume / Mute */}
      <button
        onClick={toggleMute}
        className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
        title={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
      </button>

      {/* Mini Volume Slider */}
      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={muted ? 0 : volume}
        onChange={(e) => {
          const val = parseFloat(e.target.value);
          setVolume(val);
          if (muted) setMuted(false);
          if (audioRef.current) audioRef.current.volume = val;
        }}
        className="w-14 sm:w-16 h-1 accent-amber-400 cursor-pointer hidden sm:block"
        title="Volume"
      />
    </div>
  );
};
