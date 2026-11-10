import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Wind, Sparkles, ArrowRight } from 'lucide-react';
import { fireCelebrationConfetti, fireSideCannons } from '../utils/confetti';

interface CakeCeremonySceneProps {
  onCandleBlown: () => void;
  onProceedToCut: () => void;
}

export const CakeCeremonyScene: React.FC<CakeCeremonySceneProps> = ({
  onCandleBlown,
  onProceedToCut,
}) => {
  const [blown, setBlown] = useState(false);
  const [isListeningMic, setIsListeningMic] = useState(false);
  const [micVolume, setMicVolume] = useState(0);
  const [micError, setMicError] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Start microphone listener
  const startMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);

      setIsListeningMic(true);
      setMicError(false);

      const buffer = new Uint8Array(analyser.frequencyBinCount);

      const loop = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(buffer);
        let sum = 0;
        for (let i = 0; i < buffer.length; i++) {
          sum += buffer[i];
        }
        const avg = sum / buffer.length;
        setMicVolume(Math.round(avg));

        // Detect sustained blowing burst
        if (avg > 42) {
          triggerBlow();
          stopMic();
          return;
        }

        if (streamRef.current) {
          requestAnimationFrame(loop);
        }
      };
      requestAnimationFrame(loop);
    } catch {
      setIsListeningMic(false);
      setMicError(true);
    }
  };

  const stopMic = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setIsListeningMic(false);
    setMicVolume(0);
  };

  useEffect(() => {
    return () => {
      stopMic();
    };
  }, []);

  const triggerBlow = () => {
    if (blown) return;
    setBlown(true);
    onCandleBlown();
    fireCelebrationConfetti();
    fireSideCannons();
  };

  return (
    <div className="relative z-30 max-w-xl mx-auto px-4 py-6 flex flex-col items-center text-center select-none animate-fade-in">
      {/* Header Messages */}
      <div className="mb-4 space-y-1">
        <span className="py-1 px-4 rounded-full bg-amber-400/10 border border-amber-300/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
          Birthday Milestone 🎂
        </span>
        <h2 className="font-signika text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-200">
          90 years of experience deserve a proper cake!
        </h2>
        <p className="text-slate-300 text-base sm:text-lg font-medium pt-1">
          {blown ? '✨ MAKE A WISH! ✨' : 'Come on, blow out those candles! 🕯️'}
        </p>
      </div>

      {/* THE 3D-STYLE BIRTHDAY CAKE */}
      <div className="relative w-80 sm:w-96 h-80 flex flex-col items-center justify-end pb-8">
        {/* Ambient Candle Fire Glow */}
        {!blown && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-52 h-52 bg-amber-400/25 rounded-full blur-2xl pointer-events-none animate-pulse" />
        )}

        {/* CANDLES */}
        <div className="relative z-20 flex items-end justify-center gap-7 mb-[-6px]">
          {[0, 1, 2].map((idx) => {
            const isCenter = idx === 1;
            return (
              <div key={idx} className="relative flex flex-col items-center">
                {/* Flame */}
                {!blown ? (
                  <div
                    onClick={triggerBlow}
                    title="Click or blow to extinguish candle"
                    className="relative cursor-pointer transition-transform hover:scale-125 mb-1"
                  >
                    <div className="w-5 h-8 bg-gradient-to-t from-amber-500 via-yellow-300 to-transparent rounded-full blur-xs flame-anim-1" />
                    <div className="absolute inset-x-1 bottom-0 h-5 bg-gradient-to-t from-orange-500 to-yellow-100 rounded-full flame-anim-2" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-90" />
                  </div>
                ) : (
                  /* Wispy Smoke */
                  <div className="w-3 h-8 relative mb-1 pointer-events-none">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300/80 animate-smoke" />
                  </div>
                )}

                {/* Wick */}
                <div className="w-[2px] h-2 bg-slate-800" />

                {/* Striped Candle Body */}
                <div
                  className={`w-3.5 rounded-t-sm shadow-md border border-rose-300/40 ${
                    isCenter ? 'h-14 sm:h-16' : 'h-11 sm:h-12'
                  }`}
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(45deg, #f43f5e 0, #f43f5e 4px, #ffffff 4px, #ffffff 8px)',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* LAYERED CAKE BODY */}
        <div className="relative w-64 sm:w-72 flex flex-col items-center">
          {/* Top Layer */}
          <div className="relative w-48 sm:w-56 h-14 bg-gradient-to-b from-amber-100 to-amber-200 rounded-t-2xl shadow-inner border-t-2 border-amber-50 flex items-center justify-center overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-5 bg-white/95 rounded-t-2xl" />
            <div className="absolute top-4 inset-x-0 flex justify-around">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-4 bg-white/95 rounded-b-full shadow-xs"
                  style={{ height: `${10 + (i % 3) * 5}px` }}
                />
              ))}
            </div>
            <div className="relative z-10 text-[11px] font-extrabold tracking-widest text-rose-500 uppercase">
              ★ QUEEN AT 20 ★
            </div>
          </div>

          {/* Frosting Ribbon */}
          <div className="w-52 sm:w-60 h-3 bg-gradient-to-r from-pink-300 via-rose-200 to-pink-300 rounded-full shadow-md z-10 -my-1" />

          {/* Bottom Chocolate Sponge */}
          <div className="relative w-60 sm:w-68 h-20 bg-gradient-to-b from-[#63331d] via-[#4d2513] to-[#36190b] rounded-t-lg shadow-2xl border-t border-amber-900/60 overflow-hidden flex flex-col justify-between py-2">
            <div className="flex justify-around px-2">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full bg-rose-600 shadow-[0_2px_4px_rgba(0,0,0,0.5)] border border-rose-400"
                />
              ))}
            </div>
            <div className="flex justify-center items-center gap-2 opacity-90">
              <span className="text-xs text-amber-300">✨</span>
              <span className="text-xs font-signika font-bold tracking-wider text-amber-200 uppercase">
                A Decade of Becoming
              </span>
              <span className="text-xs text-amber-300">✨</span>
            </div>
          </div>

          {/* Silver Platter */}
          <div className="w-72 sm:w-80 h-4 bg-gradient-to-r from-slate-300 via-white to-slate-400 rounded-full shadow-2xl border-b-2 border-slate-500" />
          <div className="w-40 h-3 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 rounded-b-md shadow-lg" />
        </div>
      </div>

      {/* BLOW CONTROLS: MIC / TAP */}
      {!blown ? (
        <div className="mt-4 flex flex-col items-center gap-3 w-full max-w-sm">
          {/* Sound Wave Visualizer when mic is active */}
          {isListeningMic && (
            <div className="flex items-center gap-1.5 py-1 px-4 rounded-full bg-slate-900/90 border border-emerald-400/50">
              <Mic className="w-4 h-4 text-emerald-400 animate-pulse" />
              <div className="flex items-end gap-1 h-4 w-28">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2.5 bg-emerald-400 rounded-full transition-all duration-75"
                    style={{
                      height: `${Math.min(100, Math.max(15, micVolume * (0.8 + (i % 3) * 0.4)))}%`,
                    }}
                  />
                ))}
              </div>
              <span className="text-xs text-emerald-300 font-mono font-medium">
                Blow into mic!
              </span>
            </div>
          )}

          <div className="flex items-center gap-3 w-full justify-center">
            {/* Mic Toggle */}
            <button
              onClick={() => (isListeningMic ? stopMic() : startMic())}
              className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all active:scale-95 ${
                isListeningMic
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                  : 'bg-slate-900/80 border-slate-700 text-slate-200 hover:bg-slate-800'
              }`}
            >
              {isListeningMic ? (
                <>
                  <MicOff className="w-4 h-4" />
                  <span>Stop Mic</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 text-amber-300" />
                  <span>Blow with Mic</span>
                </>
              )}
            </button>

            {/* Manual Tap to blow backup */}
            <button
              onClick={triggerBlow}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-signika font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2 active:scale-95 transition-all"
            >
              <Wind className="w-4 h-4" />
              <span>Tap to Blow Candles 💨</span>
            </button>
          </div>

          {micError && (
            <p className="text-[11px] text-amber-300/80">
              Mic permission unavailable. You can tap the "Tap to Blow Candles" button!
            </p>
          )}
        </div>
      ) : (
        /* After blown: Wish confirmed + Next */
        <div className="mt-4 space-y-3 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 font-signika font-bold text-base shadow-lg animate-bounce">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Candles Extinguished! May your wish come true! ✨</span>
          </div>

          <div>
            <button
              onClick={onProceedToCut}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 hover:from-amber-300 hover:to-rose-300 text-slate-950 font-signika font-bold text-base shadow-xl flex items-center gap-2 mx-auto active:scale-95 transition-all cursor-pointer"
            >
              <span>Cut the Birthday Cake 🔪</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
