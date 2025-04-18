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
    },
  },
  plugins: [],
};
