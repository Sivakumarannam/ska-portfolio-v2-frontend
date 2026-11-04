/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#050811',
          card: 'rgba(13, 20, 36, 0.72)',
          border: 'rgba(0, 240, 255, 0.18)',
          cyan: '#00f0ff',
          neon: '#10b981',
          violet: '#8b5cf6',
          amber: '#f59e0b',
          rose: '#f43f5e',
          blue: '#3b82f6',
        },
      },
      fontFamily: {
        mono: ['Fira Code', 'JetBrains Mono', 'Consolas', 'monospace'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(0, 240, 255, 0.35)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.35)',
        'glow-violet': '0 0 25px -5px rgba(139, 92, 246, 0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'packet-flow': 'packetFlow 1.8s ease-in-out infinite',
      },
      keyframes: {
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        packetFlow: {
          '0%': { transform: 'translateX(-100%)', opacity: '0.2' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateX(200%)', opacity: '0.2' },
        },
      },
    },
  },
  plugins: [],
};

