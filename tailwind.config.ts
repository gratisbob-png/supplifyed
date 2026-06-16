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
        'c-bg':      '#000000',
        'c-surface': '#0a0a0a',
        'c-surface-2': '#111111',
        'c-border':  '#232323',
        'c-text':    '#f5f5f7',
        'c-text-2':  '#a1a1a6',
        'c-text-3':  '#6e6e73',
        'c-accent':  '#34d399',
        aspiration: { DEFAULT: '#059669', border: '#059669' },
        rational:   { DEFAULT: '#4b5563', border: '#4b5563' },
        economic:   { DEFAULT: '#374151', border: '#374151' },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        'display': ['4.5rem',  { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        'display-sm': ['3.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'headline': ['2.25rem', { lineHeight: '1.1',  letterSpacing: '-0.015em' }],
        'title':    ['1.5rem',  { lineHeight: '1.2',  letterSpacing: '-0.01em'  }],
        'body-lg':  ['1.0625rem', { lineHeight: '1.65' }],
        'body':     ['0.9375rem', { lineHeight: '1.6'  }],
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out':   'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '350': '350ms',
        '400': '400ms',
        '500': '500ms',
      },
      borderRadius: {
        'xl':  '14px',
        '2xl': '20px',
        '3xl': '28px',
      },
      boxShadow: {
        'card':       '0 1px 2px rgba(0,0,0,0.6), 0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 2px 4px rgba(0,0,0,0.8), 0 16px 48px rgba(0,0,0,0.6)',
        'glow-green': '0 0 32px rgba(52, 211, 153, 0.15)',
      },
    },
  },
  plugins: [],
};

export default config;
