import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        sage: {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7d0c7',
          300: '#a3b1a3',
          400: '#7d8f7d',
          500: '#627362',
          600: '#4d5b4d',
          700: '#404a40',
          800: '#353d35',
          900: '#2d332d',
        },
        calm: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
        },
        warmth: {
          50: '#fdf8f3',
          100: '#faeadb',
          200: '#f5d5b5',
          300: '#efb97a',
          400: '#e89840',
          500: '#d97b1e',
          600: '#c06414',
          700: '#9f4e13',
          800: '#803e16',
          900: '#6a3415',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: [
          'Plus Jakarta Sans',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
      },
      animation: {
        'breathe-in': 'breatheIn 4s ease-in-out',
        'breathe-hold': 'breatheHold 4s ease-in-out',
        'breathe-out': 'breatheOut 4s ease-in-out',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        breatheIn: {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(1.4)', opacity: '1' },
        },
        breatheHold: {
          '0%, 100%': { transform: 'scale(1.4)', opacity: '1' },
        },
        breatheOut: {
          '0%': { transform: 'scale(1.4)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '0.6' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
