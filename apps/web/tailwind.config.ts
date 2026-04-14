import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          'dark-red': '#8B0000',
          'accent-red': '#DC143C',
          'off-white': '#FDFAF4',
          'dark-bg': '#1A0404',
          'dark-black': '#0D0000',
        },
        red: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display': ['5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'hero': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out',
        'pulse-red': 'pulseRed 2s infinite',
        'scroll-indicator': 'scrollIndicator 2s infinite',
      },
      backdropBlur: {
        'luxury': '20px',
      },
      boxShadow: {
        'luxury': '0 25px 50px -12px rgba(139, 0, 0, 0.25)',
        'luxury-lg': '0 35px 60px -12px rgba(139, 0, 0, 0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
