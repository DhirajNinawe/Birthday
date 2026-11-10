import confetti from 'canvas-confetti';

export function fireCelebrationConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 99999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#ff4081', '#ff9800', '#ffd600', '#00e676', '#00b0ff'],
  });
  fire(0.2, {
    spread: 60,
    colors: ['#e040fb', '#ff1744', '#7c4dff', '#ffeb3b'],
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

export function fireSideCannons() {
  const end = Date.now() + 2.5 * 1000;
  const colors = ['#bb0000', '#ffffff', '#ffd700', '#ff69b4', '#00ced1', '#32cd32'];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors: colors,
      zIndex: 99999,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors: colors,
      zIndex: 99999,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

export function fireMiniBurst(x: number, y: number) {
  confetti({
    particleCount: 30,
    spread: 60,
    origin: {
      x: x / window.innerWidth,
      y: y / window.innerHeight,
    },
    colors: ['#ff3366', '#ffcc00', '#33ccff', '#33ff99', '#cc33ff'],
    zIndex: 99999,
  });
}
