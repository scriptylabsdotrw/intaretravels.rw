import type { Config } from 'tailwindcss';
import sharedConfig from '@tourism/config/tailwind.config';

const config: Config = {
  ...sharedConfig,
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
};

export default config;
