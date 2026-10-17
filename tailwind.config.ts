import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // A4 is narrower than md, so print opts into the desktop layout explicitly.
    screens: {
      sm: '640px',
      md: { raw: '(min-width: 768px), print' },
      lg: { raw: '(min-width: 1024px), print' },
    },
    extend: {
      colors: {
        grey: {
          50: '#f9fafb',
          100: '#f2f4f6',
          200: '#e5e8eb',
          300: '#d1d6db',
          400: '#b0b8c1',
          500: '#8b95a1',
          600: '#6b7684',
          700: '#4e5968',
          800: '#333d4b',
          900: '#191f28',
        },
        blue: {
          50: '#e8f3ff',
          100: '#c9e2ff',
          200: '#90c2ff',
          400: '#4593fc',
          500: '#3182f6',
          600: '#2272eb',
          700: '#1b64da',
        },
      },
      fontFamily: {
        sans: [
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'Apple SD Gothic Neo',
          'Malgun Gothic',
          'sans-serif',
        ],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.03em',
        tight: '-0.02em',
      },
      maxWidth: {
        content: '1080px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0, 27, 55, 0.04), 0 8px 24px rgba(0, 27, 55, 0.06)',
        lift: '0 2px 4px rgba(0, 27, 55, 0.05), 0 20px 48px rgba(0, 27, 55, 0.12)',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#333d4b',
            '--tw-prose-headings': '#191f28',
            '--tw-prose-links': '#2272eb',
            '--tw-prose-bold': '#191f28',
            '--tw-prose-counters': '#8b95a1',
            '--tw-prose-bullets': '#b0b8c1',
            '--tw-prose-hr': '#e5e8eb',
            '--tw-prose-quotes': '#4e5968',
            '--tw-prose-quote-borders': '#90c2ff',
            '--tw-prose-captions': '#8b95a1',
            '--tw-prose-code': '#191f28',
            '--tw-prose-pre-code': '#333d4b',
            '--tw-prose-pre-bg': '#f9fafb',
            '--tw-prose-th-borders': '#d1d6db',
            '--tw-prose-td-borders': '#e5e8eb',
          },
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config;
