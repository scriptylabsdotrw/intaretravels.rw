import type { Config } from 'tailwindcss';

/**
 * Intare Travels — luxury red & gold palette.
 *
 * The site is built on a `red-*` scale plus a `primary-*` scale (shared UI +
 * about page). We keep the deep-red brand and pair it with champagne-gold
 * accents and warm neutral tones (sand / ivory / charcoal). The semantic
 * aliases (`forest` / `emerald`) used by some components are mapped onto the
 * red scale so everything stays on-brand.
 */

// Deep luxury red. Used for `red-*`, `primary-*`, and the `forest`/`emerald`
// aliases so the whole site renders in the red brand.
const brandRed = {
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
};

// Champagne / gold accent for refined highlights.
const gold = {
  50: '#fbf7ec',
  100: '#f5ecd2',
  200: '#ebd9a6',
  300: '#e0c47a',
  400: '#d4b86a',
  500: '#c9a24b',
  600: '#a8842f',
  700: '#856526',
  800: '#5f4820',
  900: '#3f301a',
};

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/components/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/*.{js,ts,jsx,tsx}',
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
        red: brandRed,
        // Shared UI package + about page use `primary-*`.
        primary: brandRed,
        // Semantic aliases used by some components — mapped to the red brand.
        forest: brandRed,
        emerald: brandRed,
        gold,
        sand: {
          DEFAULT: '#e8dec9',
          50: '#faf7f0',
          100: '#f3ecdd',
          200: '#e8dec9',
          300: '#d8c8a6',
          400: '#c4ad7e',
        },
        ivory: '#fdfaf4',
        charcoal: {
          DEFAULT: '#1a1413',
          800: '#1a1413',
          900: '#0d0606',
        },
      },
      fontFamily: {
        'serif': ['var(--font-display)', 'Cormorant Garamond', 'serif'],
        'sans': ['var(--font-body)', 'Mulish', 'sans-serif'],
        'display': ['var(--font-display)', 'Cormorant Garamond', 'serif'],
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
        'gold': '0 10px 30px -10px rgba(201, 162, 75, 0.45)',
      },
    },
  },
  plugins: [],
};

export default config;
