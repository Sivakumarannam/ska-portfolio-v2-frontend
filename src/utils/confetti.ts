import confetti from 'canvas-confetti';

export function fireConfetti() {
  try {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#00f0ff', '#10b981', '#8b5cf6', '#3b82f6'],
    });
  } catch (e) {}
}

