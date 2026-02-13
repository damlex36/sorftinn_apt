// tailwind.config.ts   ← keep the .ts extension

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // add any other paths you use
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slow-pan': 'slowPan 32s infinite alternate ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slowPan: {
          '0%': { backgroundPosition: 'center 25%' },
          '100%': { backgroundPosition: 'center 75%' },
        },
      },
      // ← add your other theme extensions here if any
    },
  },
  plugins: [],
}

export default config