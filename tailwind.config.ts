import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      spacing: {
        'cp-sm': '1rem', // 모바일
        'cp-md': '2rem', // 태블릿
        cp: '10rem', // 데스크톱
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            h3: {
              color: 'inherit',
              fontWeight: '700',
            },
            ul: {
              listStyleType: 'none',
              padding: '0',
            },
            li: {
              marginTop: '0',
              marginBottom: '0',
            },
            'ul > li': {
              paddingLeft: '0',
            },
            'ul > li::before': {
              display: 'none',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config;
