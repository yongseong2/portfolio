import { totalCareerMonths } from './experience';

const careerYear = Math.floor(totalCareerMonths / 12) + 1;

export const profile = {
  name: '김성용',
  nameEn: 'Kim Seong Yong',
  role: 'Frontend Engineer',
  photo: '/assets/images/profile.jpg',
  headline: ['복잡한 문제를', '단순한 경험으로', '바꾸는 프론트엔드 개발자입니다'],
  summary: [
    `React · React Native · Next.js로 앱과 웹을 만드는 ${careerYear}년 차 프론트엔드 개발자입니다. 요구사항이 복잡할수록 문제를 먼저 구조화하고, 사용자가 고민 없이 쓸 수 있는 흐름으로 풀어냅니다.`,
    '화면 너머의 구조도 함께 설계합니다. 재사용 가능한 공통 모듈과 디자인 시스템, 테스트와 배포 체계, AI가 팀의 컨벤션대로 코드를 쓰는 개발 환경까지 팀이 더 빠르고 안전하게 만들 수 있는 기반을 만듭니다.',
  ],
  contacts: {
    email: 'ancjs369@naver.com',
    phone: '010-9380-1663',
    github: 'https://github.com/yongseong2',
    velog: 'https://velog.io/@yongseong2/posts',
    linkedin: 'https://www.linkedin.com/in/seongyong-kim-048a49297',
    portfolio: 'https://seongyong2.vercel.app',
  },
};

export const displayUrl = (url: string) =>
  url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

// Site-relative links (e.g. blog posts) need the full domain once printed to PDF.
export const absoluteUrl = (href: string) =>
  href.startsWith('/') ? `${profile.contacts.portfolio}${href}` : href;
