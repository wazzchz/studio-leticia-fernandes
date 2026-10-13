/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Luxury neutral + rose-gold system
        cream: {
          DEFAULT: '#FAFAF9', // primary canvas
          dim: '#F5F0EB', // linen
          faint: '#E9E2D8',
        },
        ink: {
          DEFAULT: '#1C1917', // soft black / deep slate
          soft: '#44403C',
          faint: '#78716C',
        },
        rose: {
          DEFAULT: '#C5A880', // muted rose gold
          deep: '#A9885E',
          soft: '#E4CFAF',
          faint: '#F3E9D8',
        },
        blush: {
          DEFAULT: '#D4B2A7',
          soft: '#EAD5CD',
          faint: '#F8EEE9',
        },
        charcoal: {
          DEFAULT: '#121212',
          soft: '#1E1B18',
          card: '#1C1917',
        },
        open: '#4ADE80',
      },
      fontFamily: {
        display: ['Syne', '"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(28,25,23,.08), 0 24px 48px -24px rgba(28,25,23,.25)',
        float: '0 20px 50px -18px rgba(28,25,23,.35)',
        gold: '0 12px 32px -12px rgba(197,168,128,.55)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.4rem',
      },
      keyframes: {
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '.45', transform: 'scale(.7)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up .6s cubic-bezier(.22,1,.36,1) both',
        'pulse-dot': 'pulse-dot 1.8s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
};
