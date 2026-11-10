import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Heart, Pause, Play, RotateCcw, ArrowUp, ArrowDown } from 'lucide-react';
import { fireCelebrationConfetti, fireMiniBurst } from '../utils/confetti';

interface ShinamRunGameProps {
  onUnlockReward: (coins: number) => void;
  targetCoins?: number;
}

export const ShinamRunGame: React.FC<ShinamRunGameProps> = ({
  onUnlockReward,
  targetCoins = 20,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [coins, setCoins] = useState(0);
  const [distance, setDistance] = useState(0);
  const [lives, setLives] = useState(3);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // References to keep mutable state inside game loop
  const gameStateRef = useRef({
    cat: {
      x: 80,
      y: 220,
      w: 48,
      h: 40,
      vy: 0,
      isGrounded: true,
      isSliding: false,
      slideTimer: 0,
      blinkTimer: 0,
    },
    gravity: 0.75,
    jumpForce: -13,
    groundY: 260,
    speed: 4.8,
    coins: [] as Array<{ x: number; y: number; r: number; collected: boolean }>,
    obstacles: [] as Array<{ x: number; y: number; w: number; h: number; type: 'ground' | 'air' }>,
    particles: [] as Array<{ x: number; y: number; vx: number; vy: number; color: string; life: number }>,
    bgOffset: 0,
    coinsCount: 0,
    distanceCount: 0,
    livesCount: 3,
    isOver: false,
    paused: false,
    won: false,
  });

  const jump = () => {
    const s = gameStateRef.current;
    if (s.isOver || s.paused) return;
    if (s.cat.isGrounded && !s.cat.isSliding) {
      s.cat.vy = s.jumpForce;
      s.cat.isGrounded = false;
    }
  };

  const slide = () => {
    const s = gameStateRef.current;
    if (s.isOver || s.paused) return;
    if (s.cat.isGrounded) {
      s.cat.isSliding = true;
      s.cat.slideTimer = 30; // 30 frames of sliding
      s.cat.h = 24;
    }
  };

  const restartGame = () => {
    const s = gameStateRef.current;
    s.cat.y = 220;
    s.cat.vy = 0;
    s.cat.isGrounded = true;
    s.cat.isSliding = false;
    s.cat.h = 40;
    s.coins = [];
    s.obstacles = [];
    s.particles = [];
    s.distanceCount = 0;
    s.livesCount = 3;
    s.isOver = false;
    s.paused = false;
    s.won = false;

    setCoins(s.coinsCount);
    setDistance(0);
    setLives(3);
    setIsGameOver(false);
    setIsPaused(false);
    setHasWon(false);
  };

  // Keyboard and touch listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      } else if (e.code === 'ArrowDown') {
        e.preventDefault();
        slide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Main Canvas Game Loop
  useEffect(() => {
    if (!gameStarted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const loop = () => {
      animId = requestAnimationFrame(loop);
      const s = gameStateRef.current;
      if (s.paused) return;

      frame++;
      const width = canvas.width;
      const height = canvas.height;

      // Update distance & speed
      if (!s.isOver && !s.won) {
        s.distanceCount += Math.round(s.speed * 0.1);
        s.bgOffset += s.speed * 0.5;
        if (frame % 10 === 0) {
          setDistance(s.distanceCount);
        }
      }

      // 1. CLEAR & DRAW PARALLAX BACKGROUND
      // Sunset Sky gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#21182B');
      skyGrad.addColorStop(0.45, '#793D50');
      skyGrad.addColorStop(0.8, '#D98C9A');
      skyGrad.addColorStop(1, '#F2C5AD');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Sunset Sun
      ctx.fillStyle = '#FFF4E6';
      ctx.beginPath();
      ctx.arc(width * 0.8, 90, 42, 0, Math.PI * 2);
      ctx.fill();

      // Distant hills (parallax layer 1)
      ctx.fillStyle = '#4A2338';
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 30) {
        const y = 180 + Math.sin((x + s.bgOffset * 0.2) * 0.015) * 22;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.fill();

      // Near hills (parallax layer 2)
      ctx.fillStyle = '#2F1B2B';
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 20) {
        const y = 220 + Math.sin((x + s.bgOffset * 0.5) * 0.02) * 16;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.fill();

      // Solid Runway Ground
      ctx.fillStyle = '#21182B';
      ctx.fillRect(0, s.groundY + 30, width, height - s.groundY);

      // Golden curb trim
      ctx.strokeStyle = '#D6B47A';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, s.groundY + 30);
      ctx.lineTo(width, s.groundY + 30);
      ctx.stroke();

      // Little party flag posts on ground
      ctx.fillStyle = '#D98C9A';
      for (let x = -((s.bgOffset * 2) % 120); x < width; x += 120) {
        ctx.fillRect(x, s.groundY + 12, 3, 18);
        ctx.beginPath();
        ctx.moveTo(x + 3, s.groundY + 12);
        ctx.lineTo(x + 18, s.groundY + 17);
        ctx.lineTo(x + 3, s.groundY + 22);
        ctx.fill();
      }

      // 2. SPAWN COINS & OBSTACLES
      if (!s.isOver && !s.won) {
        // Spawn Coins
        if (frame % 45 === 0 && Math.random() > 0.3) {
          const coinY = Math.random() > 0.4 ? s.groundY - 10 : s.groundY - 70;
          s.coins.push({
            x: width + 20,
            y: coinY,
            r: 10,
            collected: false,
          });
        }

        // Spawn Obstacles
        if (frame % 110 === 0 && Math.random() > 0.25) {
          const isAir = Math.random() > 0.65;
          s.obstacles.push({
            x: width + 30,
            y: isAir ? s.groundY - 55 : s.groundY - 2,
            w: isAir ? 36 : 28,
            h: isAir ? 20 : 32,
            type: isAir ? 'air' : 'ground',
          });
        }
      }

      // 3. UPDATE & DRAW COINS
      for (let i = s.coins.length - 1; i >= 0; i--) {
        const c = s.coins[i];
        if (!s.isOver && !s.won) c.x -= s.speed;

        // Draw Golden Birthday Coin
        ctx.save();
        ctx.fillStyle = '#D6B47A';
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#FFF4E6';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Inner Star Sparkle
        ctx.fillStyle = '#21182B';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('★', c.x, c.y + 0.5);
        ctx.restore();

        // Collision with Cat
        const catBox = {
          x: s.cat.x,
          y: s.cat.y,
          w: s.cat.w,
          h: s.cat.h,
        };

        if (
          !c.collected &&
          c.x + c.r > catBox.x &&
          c.x - c.r < catBox.x + catBox.w &&
          c.y + c.r > catBox.y &&
          c.y - c.r < catBox.y + catBox.h
        ) {
          c.collected = true;
          s.coinsCount += 1;
          setCoins(s.coinsCount);

          // Coin burst particles
          for (let p = 0; p < 8; p++) {
            s.particles.push({
              x: c.x,
              y: c.y,
              vx: (Math.random() - 0.5) * 5,
              vy: (Math.random() - 0.5) * 5,
              color: '#D6B47A',
              life: 20,
            });
          }

          // Check Win Condition: Target Reached (20 Coins)!
          if (s.coinsCount >= targetCoins && !s.won) {
            s.won = true;
            s.isOver = true;
            setHasWon(true);
            fireCelebrationConfetti();
          }
        }

        if (c.x < -30 || c.collected) {
          s.coins.splice(i, 1);
        }
      }

      // 4. UPDATE & DRAW OBSTACLES
      for (let i = s.obstacles.length - 1; i >= 0; i--) {
        const obs = s.obstacles[i];
        if (!s.isOver && !s.won) obs.x -= s.speed;

        // Draw Obstacle
        ctx.save();
        if (obs.type === 'ground') {
          // Wrapped Gift Box Obstacle
          ctx.fillStyle = '#793D50';
          ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
          ctx.fillStyle = '#D6B47A';
          ctx.fillRect(obs.x + obs.w / 2 - 2, obs.y, 4, obs.h);
          ctx.strokeStyle = '#D98C9A';
          ctx.strokeRect(obs.x, obs.y, obs.w, obs.h);
        } else {
          // Air Obstacle (Garland bunting)
          ctx.fillStyle = '#D98C9A';
          ctx.fillRect(obs.x, obs.y, obs.w, 4);
          ctx.fillStyle = '#F2C5AD';
          ctx.beginPath();
          ctx.moveTo(obs.x, obs.y + 4);
          ctx.lineTo(obs.x + obs.w / 2, obs.y + obs.h);
          ctx.lineTo(obs.x + obs.w, obs.y + 4);
          ctx.fill();
        }
        ctx.restore();

        // Collision Check with Cat
        if (
          !s.isOver &&
          !s.won &&
          s.cat.blinkTimer <= 0 &&
          s.cat.x + s.cat.w > obs.x + 4 &&
          s.cat.x < obs.x + obs.w - 4 &&
          s.cat.y + s.cat.h > obs.y + 4 &&
          s.cat.y < obs.y + obs.h - 4
        ) {
          s.livesCount -= 1;
          s.cat.blinkTimer = 60; // 1 second invulnerability
          setLives(s.livesCount);

          if (s.livesCount <= 0) {
            s.isOver = true;
            setIsGameOver(true);
          }
        }

        if (obs.x < -50) {
          s.obstacles.splice(i, 1);
        }
      }

      // 5. UPDATE PARTICLES
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 3, 3);
        if (p.life <= 0) s.particles.splice(i, 1);
      }

      // 6. UPDATE CAT PHYSICS
      if (s.cat.blinkTimer > 0) s.cat.blinkTimer--;

      if (s.cat.isSliding) {
        s.cat.slideTimer--;
        if (s.cat.slideTimer <= 0) {
          s.cat.isSliding = false;
          s.cat.h = 40;
        }
      }

      if (!s.cat.isGrounded) {
        s.cat.vy += s.gravity;
        s.cat.y += s.cat.vy;
        if (s.cat.y >= s.groundY - s.cat.h + 30) {
          s.cat.y = s.groundY - s.cat.h + 30;
          s.cat.vy = 0;
          s.cat.isGrounded = true;
        }
      }

      // 7. DRAW CUTE CAT CHARACTER
      // Blink when invulnerable
      if (s.cat.blinkTimer % 8 < 4) {
        ctx.save();
        ctx.translate(s.cat.x, s.cat.y);

        if (s.cat.isSliding) {
          // Sliding Cat (flat elongated body)
          ctx.fillStyle = '#FFF4E6';
          ctx.beginPath();
          ctx.ellipse(24, 16, 26, 12, 0, 0, Math.PI * 2);
          ctx.fill();

          // Cat Ears
          ctx.fillStyle = '#793D50';
          ctx.beginPath();
          ctx.moveTo(38, 8);
          ctx.lineTo(44, 2);
          ctx.lineTo(42, 12);
          ctx.fill();

          // Tail
          ctx.strokeStyle = '#FFF4E6';
          ctx.lineWidth = 4;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(4, 16);
          ctx.quadraticCurveTo(-4, 10, -8, 6);
          ctx.stroke();

          // Cat Eye (closed in slide)
          ctx.strokeStyle = '#21182B';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(38, 14);
          ctx.lineTo(42, 14);
          ctx.stroke();
        } else {
          // Standing / Running Cat
          const runOffset = s.cat.isGrounded ? Math.sin(frame * 0.3) * 3 : 0;

          // Cat Body
          ctx.fillStyle = '#FFF4E6';
          ctx.beginPath();
          ctx.ellipse(20, 22 + runOffset, 18, 14, 0, 0, Math.PI * 2);
          ctx.fill();

          // Cat Head
          ctx.beginPath();
          ctx.arc(36, 14 + runOffset, 12, 0, Math.PI * 2);
          ctx.fill();

          // Cat Ears
          ctx.fillStyle = '#793D50';
          ctx.beginPath();
          ctx.moveTo(30, 6 + runOffset);
          ctx.lineTo(33, -1 + runOffset);
          ctx.lineTo(37, 5 + runOffset);
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(38, 6 + runOffset);
          ctx.lineTo(42, -1 + runOffset);
          ctx.lineTo(44, 7 + runOffset);
          ctx.fill();

          // Cat Eyes (cute blinking or watching)
          ctx.fillStyle = '#21182B';
          ctx.beginPath();
          ctx.arc(39, 13 + runOffset, 2, 0, Math.PI * 2);
          ctx.fill();

          // Pink Nose
          ctx.fillStyle = '#D98C9A';
          ctx.beginPath();
          ctx.arc(43, 16 + runOffset, 1.5, 0, Math.PI * 2);
          ctx.fill();

          // Little Party Ribbon Bow on Cat
          ctx.fillStyle = '#D6B47A';
          ctx.beginPath();
          ctx.arc(28, 16 + runOffset, 3, 0, Math.PI * 2);
          ctx.fill();

          // Cat Legs (running motion)
          const legPhase = Math.sin(frame * 0.4);
          ctx.strokeStyle = '#FFF4E6';
          ctx.lineWidth = 4;
          ctx.lineCap = 'round';

          ctx.beginPath();
          ctx.moveTo(14, 30);
          ctx.lineTo(14 + legPhase * 8, 38);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(26, 30);
          ctx.lineTo(26 - legPhase * 8, 38);
          ctx.stroke();

          // Cat Tail (swaying)
          ctx.beginPath();
          ctx.moveTo(6, 20 + runOffset);
          ctx.quadraticCurveTo(
            -4,
            12 + Math.sin(frame * 0.2) * 6,
            -6,
            6 + Math.cos(frame * 0.2) * 6
          );
          ctx.stroke();
        }
        ctx.restore();
      }
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [gameStarted, targetCoins]);

  return (
    <div className="relative z-30 max-w-2xl mx-auto px-4 py-4 flex flex-col items-center select-none animate-fade-in w-full">
      {/* Header Info */}
      <div className="w-full flex items-center justify-between pb-3 border-b border-[#D6B47A]/25">
        <div>
          <span className="text-[11px] font-semibold text-[#D6B47A] tracking-widest uppercase">
            Mini-Game · Part Two
          </span>
          <h2 className="font-serif-hero text-2xl sm:text-3xl font-bold text-[#FFF4E6]">
            SHINAM RUN
          </h2>
        </div>

        {/* HUD Counters */}
        {gameStarted && (
          <div className="flex items-center gap-4 text-xs font-mono">
            {/* Lives */}
            <div className="flex items-center gap-1 text-[#D98C9A]">
              {[...Array(3)].map((_, i) => (
                <Heart
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < lives ? 'fill-[#D98C9A]' : 'opacity-20'
                  }`}
                />
              ))}
            </div>

            {/* Distance */}
            <div className="text-[#FFF4E6]/80 hidden sm:block">
              {distance}m
            </div>

            {/* Coins */}
            <div className="px-3 py-1 rounded-full bg-[#D6B47A]/20 border border-[#D6B47A]/50 text-[#D6B47A] font-bold flex items-center gap-1">
              <span>★</span>
              <span>
                {coins} / {targetCoins}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* CANVAS CONTAINER */}
      <div className="relative w-full max-w-xl h-72 sm:h-80 rounded-2xl overflow-hidden border-2 border-[#D6B47A]/40 shadow-2xl my-3 bg-[#21182B]">
        <canvas
          ref={canvasRef}
          width={560}
          height={320}
          onClick={jump}
          className="w-full h-full object-cover cursor-pointer block"
        />

        {/* Start Screen Overlay */}
        {!gameStarted && (
          <div className="absolute inset-0 bg-[#21182B]/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20">
            <span className="text-3xl mb-2">🐱</span>
            <h3 className="font-serif-hero text-xl sm:text-2xl font-bold text-[#D6B47A] mb-2">
              SHINAM, YOUR GRAND PRIZE IS WAITING! 🐱
            </h3>
            <p className="text-[#FFF4E6]/95 text-xs sm:text-sm max-w-md mb-3 leading-relaxed">
              Keep running, dodge the obstacles and collect 20 golden coins to unlock your special birthday treasure!
            </p>

            {/* Clear Objective Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#D6B47A]/20 border-2 border-[#D6B47A] text-[#D6B47A] font-mono font-extrabold text-xs uppercase tracking-widest mb-4 shadow-lg">
              <span>★</span>
              <span>TARGET: 20 GOLDEN COINS</span>
              <span>★</span>
            </div>

            <div className="flex items-center gap-3 text-xs text-[#FFF4E6]/70 mb-5 font-mono">
              <span>Space / Tap = Jump</span>
              <span>·</span>
              <span>Down Arrow = Slide</span>
            </div>

            <button
              onClick={() => setGameStarted(true)}
              className="px-8 py-3 rounded-xl bg-[#D6B47A] hover:bg-[#c4a166] text-[#21182B] font-serif-hero font-bold text-sm tracking-wider uppercase shadow-xl transition-all active:scale-95 cursor-pointer"
            >
              START RUN 🏃‍♀️
            </button>
          </div>
        )}

        {/* Game Over Overlay */}
        {isGameOver && !hasWon && (
          <div className="absolute inset-0 bg-[#21182B]/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20">
            <span className="text-3xl mb-2">🐾</span>
            <h3 className="font-serif-hero text-2xl font-bold text-[#D98C9A] mb-1">
              Ouch! The cat took a tumble!
            </h3>
            <p className="text-[#FFF4E6]/80 text-xs mb-4">
              Don't worry, Shinam! All your collected coins ({coins} / {targetCoins}) are safely saved.
            </p>
            <button
              onClick={restartGame}
              className="px-6 py-2.5 rounded-xl bg-[#D6B47A] text-[#21182B] font-bold text-xs uppercase flex items-center gap-1.5 shadow-lg active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Continue Collecting</span>
            </button>
          </div>
        )}

        {/* Win Screen Overlay */}
        {hasWon && (
          <div className="absolute inset-0 bg-[#21182B]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20 animate-fade-in">
            <span className="text-4xl mb-2 animate-bounce">🎉</span>
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#D6B47A]/25 border border-[#D6B47A] text-[#D6B47A] font-mono font-bold text-xs uppercase tracking-widest mb-2 shadow-md">
              20 COINS COLLECTED!
            </div>
            <h3 className="font-serif-hero text-2xl sm:text-3xl font-bold text-[#FFF4E6] mb-2 leading-tight">
              YOU UNLOCKED YOUR GRAND PRIZE, SHINAM!
            </h3>
            <p className="text-[#F2C5AD] text-sm max-w-sm mb-5 font-serif-hero italic">
              Your dedication paid off! Shinam's hand-crafted secret treasure has been unlocked.
            </p>
            <button
              onClick={() => onUnlockReward(coins)}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D6B47A] via-[#D98C9A] to-[#D6B47A] text-[#21182B] font-serif-hero font-extrabold text-sm uppercase tracking-wider shadow-2xl animate-bounce cursor-pointer active:scale-95 transition-all hover:brightness-110"
            >
              REDEEM YOUR TREASURE 🎁
            </button>
          </div>
        )}
      </div>

      {/* On-Screen Mobile Touch Controls */}
      {gameStarted && !hasWon && !isGameOver && (
        <div className="w-full flex items-center justify-between gap-4 mt-2 max-w-md">
          <button
            onPointerDown={slide}
            className="flex-1 py-3 rounded-xl bg-[#793D50]/80 border border-[#D98C9A]/40 text-[#FFF4E6] font-semibold text-xs flex items-center justify-center gap-1.5 active:bg-[#793D50]"
          >
            <ArrowDown className="w-4 h-4" />
            <span>Slide</span>
          </button>

          <button
            onPointerDown={jump}
            className="flex-1 py-3 rounded-xl bg-[#D6B47A] text-[#21182B] font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg active:scale-95"
          >
            <ArrowUp className="w-4 h-4" />
            <span>Jump</span>
          </button>
        </div>
      )}
    </div>
  );
};
