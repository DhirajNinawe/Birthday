import React, { useState, useRef, useEffect } from 'react';
import { Mic, AlertCircle, RotateCcw, ArrowRight } from 'lucide-react';
import { fireCelebrationConfetti, fireSideCannons } from '../utils/confetti';
import { synthPlayer } from '../utils/audioSynth';

interface CakeCeremonySceneProps {
  onCandleBlown: () => void;
  onProceedToGrandWishing: () => void;
}

export const CakeCeremonyScene: React.FC<CakeCeremonySceneProps> = ({
  onCandleBlown,
  onProceedToGrandWishing,
}) => {
  const [blown, setBlown] = useState(false);
  const [isListeningMic, setIsListeningMic] = useState(false);
  const [micVolume, setMicVolume] = useState(0);
  const [micError, setMicError] = useState(false);
  const [micErrorMessage, setMicErrorMessage] = useState('');

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const blowStartRef = useRef<number | null>(null);
  const calibrationStartRef = useRef<number>(0);
  const baselineLowRef = useRef<number>(10);
  const baselineTotalRef = useRef<number>(10);
  const autoAdvanceTimerRef = useRef<number | null>(null);

  const startMic = async () => {
    try {
      setMicError(false);
      setMicErrorMessage('');
      baselineLowRef.current = 10;
      baselineTotalRef.current = 10;
      blowStartRef.current = null;

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });
      streamRef.current = stream;

      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
      audioContextRef.current = ctx;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.25;
      analyserRef.current = analyser;

      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);

      setIsListeningMic(true);
      calibrationStartRef.current = performance.now();

      const buffer = new Uint8Array(analyser.frequencyBinCount);

      const loop = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(buffer);

        const now = performance.now();
        const calibrationElapsed = now - calibrationStartRef.current;

        // Calculate low-frequency breath wind turbulence (bins 0-3 ~ 0-700Hz) & overall amplitude
        let sum = 0;
        let lowFreqSum = 0;
        const lowFreqCount = 4;

        for (let i = 0; i < buffer.length; i++) {
          sum += buffer[i];
          if (i < lowFreqCount) {
            lowFreqSum += buffer[i];
          }
        }
        const currentTotal = sum / buffer.length;
        const currentLow = lowFreqSum / lowFreqCount;

        setMicVolume(Math.round(currentTotal));

        // 1. Initial ~1 second calibration to adapt to ambient room noise and ignore activation click
        if (calibrationElapsed < 1000) {
          baselineLowRef.current = Math.max(baselineLowRef.current, currentLow);
          baselineTotalRef.current = Math.max(baselineTotalRef.current, currentTotal);
          animFrameRef.current = requestAnimationFrame(loop);
          return;
        }

        // 2. Flexible, natural blowing detection criteria:
        // Detect noticeable increase in microphone input volume or wind turbulence above baseline
        const minTotal = Math.max(baselineTotalRef.current + 14, 28);
        const minLow = Math.max(baselineLowRef.current + 16, 38);

        const isBlowing =
          currentTotal >= minTotal || (currentLow >= minLow && currentTotal >= 20);

        // 3. Sustained pattern for 200–600ms (targeting 300ms of continuous natural blowing)
        if (isBlowing) {
          if (!blowStartRef.current) {
            blowStartRef.current = now;
          }
          const duration = now - blowStartRef.current;

          if (duration >= 300) {
            triggerBlow();
            stopMic();
            return;
          }
        } else {
          // Reset detection state if sound does not meet blowing criteria
          blowStartRef.current = null;
        }

        animFrameRef.current = requestAnimationFrame(loop);
      };

      animFrameRef.current = requestAnimationFrame(loop);
    } catch (err: unknown) {
      setIsListeningMic(false);
      setMicError(true);
      const errorMsg = err instanceof Error ? err.message : '';
      if (
        errorMsg.includes('Permission') ||
        errorMsg.includes('denied') ||
        errorMsg.includes('NotAllowedError')
      ) {
        setMicErrorMessage(
          'Microphone access was denied. Please allow microphone permissions in your browser to blow out the candles!'
        );
      } else {
        setMicErrorMessage(
          'Microphone access is required to blow out the candles. Please allow microphone access to continue.'
        );
      }
    }
  };

  const stopMic = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    analyserRef.current = null;
    setIsListeningMic(false);
    setMicVolume(0);
  };

  // Cleanup on unmount only. Microphone DOES NOT activate automatically!
  useEffect(() => {
    return () => {
      stopMic();
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
    };
  }, []);

  const triggerBlow = () => {
    if (blown) return;
    setBlown(true);
    stopMic();
    onCandleBlown();
    fireCelebrationConfetti();
    fireSideCannons();

    // Play Happy Birthday song
    try {
      const audio = new Audio('/assets/aistudio/hbd_592ebc57.mp3');
      audio.play().catch(() => {
        synthPlayer.playMelody();
      });
    } catch {
      synthPlayer.playMelody();
    }

    // Continue automatically to the existing next birthday celebration scene
    autoAdvanceTimerRef.current = window.setTimeout(() => {
      onProceedToGrandWishing();
    }, 2800);
  };

  const handleManualAdvance = () => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
    }
    onProceedToGrandWishing();
  };

  return (
    <div className="relative z-30 max-w-xl mx-auto px-4 py-6 flex flex-col items-center text-center select-none animate-fade-in">
      {/* Header Messages */}
      <div className="mb-4 space-y-1">
        <span className="py-1 px-4 rounded-full bg-[#D6B47A]/15 border border-[#D6B47A]/30 text-[#D6B47A] text-xs font-semibold tracking-wider uppercase">
          Birthday Ceremony 🎂
        </span>
        <h2 className="font-serif-hero text-2xl sm:text-3xl md:text-4xl font-bold text-[#FFF4E6]">
          "Come on, Shinam! It's time to blow out your candles!"
        </h2>
        <p className="text-[#F2C5AD] text-sm sm:text-base font-serif-hero italic pt-1">
          {blown
            ? '✨ The candles are extinguished! May your wish come true! ✨'
            : isListeningMic
            ? '🎙️ Take a deep breath and blow into your microphone now!'
            : 'Make your secret wish and click below when you are ready to blow!'}
        </p>
      </div>

      {/* THE 3D-STYLE BIRTHDAY CAKE */}
      <div className="relative w-80 sm:w-96 h-80 flex flex-col items-center justify-end pb-8">
        {!blown && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-52 h-52 bg-[#D6B47A]/25 rounded-full blur-2xl pointer-events-none animate-pulse" />
        )}

        {/* CANDLES */}
        <div className="relative z-20 flex items-end justify-center gap-7 mb-[-6px]">
          {[0, 1, 2].map((idx) => {
            const isCenter = idx === 1;
            return (
              <div key={idx} className="relative flex flex-col items-center">
                {!blown ? (
                  <div className="relative mb-1 pointer-events-none">
                    <div className="w-5 h-8 bg-gradient-to-t from-amber-500 via-yellow-300 to-transparent rounded-full blur-xs flame-anim-1" />
                    <div className="absolute inset-x-1 bottom-0 h-5 bg-gradient-to-t from-orange-500 to-yellow-100 rounded-full flame-anim-2" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-90" />
                  </div>
                ) : (
                  <div className="w-3 h-8 relative mb-1 pointer-events-none">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300/80 animate-smoke" />
                  </div>
                )}

                <div className="w-[2px] h-2 bg-slate-800" />

                <div
                  className={`w-3.5 rounded-t-sm shadow-md border border-rose-300/40 ${
                    isCenter ? 'h-14 sm:h-16' : 'h-11 sm:h-12'
                  }`}
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(45deg, #793D50 0, #793D50 4px, #D6B47A 4px, #D6B47A 8px)',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* LAYERED CAKE BODY */}
        <div className="relative w-64 sm:w-72 flex flex-col items-center">
          {/* Top Layer */}
          <div className="relative w-48 sm:w-56 h-14 bg-gradient-to-b from-[#FFF4E6] to-[#eddcc7] rounded-t-2xl shadow-inner border-t-2 border-[#D6B47A]/60 flex items-center justify-center overflow-hidden">
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
            <div className="relative z-10 text-[11px] font-serif-hero font-extrabold tracking-widest text-[#793D50] uppercase">
              ★ SHINAM AT 20 ★
            </div>
          </div>

          {/* Frosting Ribbon */}
          <div className="w-52 sm:w-60 h-3 bg-gradient-to-r from-[#D98C9A] via-[#F2C5AD] to-[#D98C9A] rounded-full shadow-md z-10 -my-1" />

          {/* Bottom Chocolate Sponge */}
          <div className="relative w-60 sm:w-68 h-20 bg-gradient-to-b from-[#3d1e2e] via-[#2c1522] to-[#1c0d16] rounded-t-lg shadow-2xl border-t border-[#D6B47A]/30 overflow-hidden flex flex-col justify-between py-2">
            <div className="flex justify-around px-2">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full bg-[#D98C9A] shadow-[0_2px_4px_rgba(0,0,0,0.5)] border border-[#D6B47A]/40"
                />
              ))}
            </div>
            <div className="flex justify-center items-center gap-2 opacity-95">
              <span className="text-xs text-[#D6B47A]">✨</span>
              <span className="text-xs font-serif-hero font-bold tracking-wider text-[#FFF4E6] uppercase">
                A Decade of Becoming
              </span>
              <span className="text-xs text-[#D6B47A]">✨</span>
            </div>
          </div>

          {/* Silver Platter */}
          <div className="w-72 sm:w-80 h-4 bg-gradient-to-r from-slate-300 via-white to-slate-400 rounded-full shadow-2xl border-b-2 border-slate-500" />
          <div className="w-40 h-3 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 rounded-b-md shadow-lg" />
        </div>
      </div>

      {/* USER-INITIATED CANDLE BLOWING INTERACTION */}
      {!blown ? (
        <div className="mt-4 flex flex-col items-center gap-3 w-full max-w-md">
          {/* 1. Initial State: Classic START BLOWING Button */}
          {!isListeningMic && !micError && (
            <button
              onClick={startMic}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#D6B47A] via-[#eddcc7] to-[#D6B47A] hover:brightness-110 text-[#21182B] font-serif-hero font-extrabold text-base tracking-wider uppercase shadow-[0_4px_24px_rgba(214,180,122,0.35)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 border border-[#FFF4E6]/40"
            >
              <Mic className="w-5 h-5 text-[#793D50]" />
              <span>START BLOWING</span>
            </button>
          )}

          {/* 2. Active State: Button changes to 'MIC IS LISTENING... BLOW NOW!' */}
          {isListeningMic && (
            <div className="w-full flex flex-col items-center gap-3 p-4 rounded-2xl bg-[#21182B]/90 border-2 border-[#D6B47A]/60 shadow-2xl">
              <div className="px-6 py-2.5 rounded-xl bg-[#D6B47A]/20 border border-[#D6B47A] text-[#D6B47A] font-serif-hero font-bold text-sm sm:text-base tracking-wider uppercase flex items-center gap-2 animate-pulse">
                <Mic className="w-4 h-4 text-[#D6B47A]" />
                <span>MIC IS LISTENING... BLOW NOW!</span>
              </div>

              {/* Animated Sound Waves reacting to input volume */}
              <div className="flex items-end justify-center gap-1.5 h-10 w-full px-6 py-1">
                {[...Array(14)].map((_, i) => {
                  const factor = Math.sin((i / 13) * Math.PI);
                  const dynamicHeight = Math.min(
                    100,
                    Math.max(12, micVolume * (0.6 + factor * 0.8))
                  );
                  return (
                    <div
                      key={i}
                      className="w-2 rounded-full transition-all duration-75"
                      style={{
                        height: `${dynamicHeight}%`,
                        backgroundColor:
                          dynamicHeight > 40
                            ? '#FFF4E6'
                            : dynamicHeight > 24
                            ? '#D6B47A'
                            : '#793D50',
                      }}
                    />
                  );
                })}
              </div>

              <p className="text-xs text-[#FFF4E6]/90 font-sans tracking-wide">
                💨 Blow naturally into your laptop or phone microphone!
              </p>
            </div>
          )}

          {/* 3. Error State with RETRY Button */}
          {micError && (
            <div className="w-full p-4 rounded-2xl bg-[#793D50]/50 border-2 border-[#D98C9A] text-center space-y-3 shadow-xl">
              <div className="flex items-center justify-center gap-2 text-[#F2C5AD]">
                <AlertCircle className="w-5 h-5" />
                <span className="font-serif-hero font-bold text-base">
                  Microphone Access Required
                </span>
              </div>
              <p className="text-xs text-[#FFF4E6]/90 leading-relaxed font-sans">
                {micErrorMessage ||
                  'Microphone access is required to blow out the candles. Please allow microphone access to continue.'}
              </p>
              <button
                onClick={startMic}
                className="px-6 py-2.5 rounded-xl bg-[#D6B47A] hover:bg-[#c5a266] text-[#21182B] font-serif-hero font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 mx-auto active:scale-95 transition-all cursor-pointer shadow-md"
              >
                <RotateCcw className="w-4 h-4" />
                <span>RETRY</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Successful Blowing & Celebration State */
        <div className="mt-4 space-y-3 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#D6B47A]/20 border border-[#D6B47A]/40 text-[#D6B47A] font-serif-hero font-bold text-lg shadow-lg animate-bounce">
            <span>✨ HAPPY BIRTHDAY, SHINAM! ✨</span>
          </div>

          <div>
            <button
              onClick={handleManualAdvance}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D6B47A] via-[#D98C9A] to-[#D6B47A] hover:brightness-110 text-[#21182B] font-serif-hero font-extrabold text-base shadow-xl flex items-center gap-2 mx-auto active:scale-95 transition-all cursor-pointer"
            >
              <span>See Your Grand Birthday Reveal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
