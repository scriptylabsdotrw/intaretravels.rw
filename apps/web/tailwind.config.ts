import type { Config } from 'tailwindcss';

/**
 * Intare Travels — Luxury Rwanda palette.
 *
 * The public site was originally built on a crimson `red-*` scale and a
 * `primary-*` scale (from the shared UI package). To rebrand the whole site to
 * a premium forest-green identity without churning every page's markup, we keep
 * those class names but map them onto green tones, and expose semantic aliases
 * (forest / emerald / gold / sand / ivory / charcoal) for new components.
 */

// Deep forest → emerald. Used for both `red-*` (legacy pages) and `primary-*`
// (shared UI + about page) so the entire site recolors consistently.
const forest = {
  50: '#eef6f0',
  100: '#d6ebdc',
  200: '#aed6ba',
  300: '#7cba90',
  400: '#4e9b69',
  500: '#2f7d4c',
  600: '#226b3f',
  700: '#1a5733',
  800: '#134227',
  900: '#0e331e',
  950: '#061c10',
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
          'dark-red': '#0f3d29', // legacy key — now deep forest
          'accent-red': '#2f7d4c', // legacy key — now emerald
          'off-white': '#faf7f0', // ivory
          'dark-bg': '#0c1f17', // charcoal-green
          'dark-black': '#06120c',
        },
        // Legacy `red-*` usages across the site now render as forest green.
        red: forest,
        // Shared UI package + about page use `primary-*`.
        primary: forest,
        // Semantic aliases for new code.
        forest,
        emerald: forest,
        gold,
        sand: {
          DEFAULT: '#e8dec9',
          50: '#faf7f0',
          100: '#f3ecdd',
          200: '#e8dec9',
          300: '#d8c8a6',
          400: '#c4ad7e',
        },
        ivory: '#faf7f0',
        charcoal: {
          DEFAULT: '#1a1f1c',
          800: '#1a1f1c',
          900: '#0f1411',
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
        'luxury': '0 25px 50px -12px rgba(19, 66, 39, 0.25)',
        'luxury-lg': '0 35px 60px -12px rgba(19, 66, 39, 0.35)',
        'gold': '0 10px 30px -10px rgba(201, 162, 75, 0.45)',
      },
    },
  },
  plugins: [],
};

export default config;
