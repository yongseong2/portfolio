import type { IconType } from 'react-icons';
import {
  SiClaude,
  SiCypress,
  SiNextdotjs,
  SiReact,
  SiReactquery,
  SiTurborepo,
  SiTypescript,
} from 'react-icons/si';
import { TbBrandReactNative } from 'react-icons/tb';

export interface CoreSkill {
  name: string;
  icon: IconType;
  color: string;
  description: string;
}

export const coreSkills: CoreSkill[] = [
  {
    name: 'TypeScript',
    icon: SiTypescript,
    color: '#3178C6',
    description: '제네릭·유틸리티 타입으로 타입을 설계해 런타임 오류를 예방합니다.',
  },
  {
    name: 'React',
    icon: SiReact,
    color: '#149ECA',
    description:
      'Zustand·Redux Toolkit·Jotai로 상태를 설계하고, Storybook 기반 아토믹 디자인 시스템을 구축했습니다.',
  },
  {
    name: 'React Native · Expo',
    icon: TbBrandReactNative,
    color: '#149ECA',
    description:
      'vision-camera·BLE 네이티브 모듈을 연동하고, EAS Build·Update(OTA)로 앱을 배포·운영합니다.',
  },
  {
    name: 'Next.js',
    icon: SiNextdotjs,
    color: '#191F28',
    description:
      'App Router와 SSR·SSG·ISR을 고려해 설계하고, 다국어 SEO 라우팅으로 검색 유입을 늘렸습니다.',
  },
  {
    name: 'TanStack Query',
    icon: SiReactquery,
    color: '#FF4154',
    description:
      '서버 상태 캐싱·동기화로 API 호출을 체계화하고, keepPreviousData로 화면 전환 끊김을 줄입니다.',
  },
  {
    name: 'Turborepo',
    icon: SiTurborepo,
    color: '#EF4444',
    description: '공통 컴포넌트·훅을 package로 분리해 3개 서비스 간 중복을 제거했습니다.',
  },
  {
    name: 'Cypress · Sentry',
    icon: SiCypress,
    color: '#191F28',
    description: '핵심 시나리오 E2E 자동화와 글로벌 에러 모니터링으로 회귀·장애에 대응합니다.',
  },
  {
    name: 'AI-Assisted Dev',
    icon: SiClaude,
    color: '#D97757',
    description:
      '프로젝트 컨벤션을 AGENTS.md로 문서화해 AI가 일관된 구조의 코드를 생성하도록 환경을 구성합니다.',
  },
];

export const skillGroups: { label: string; items: string[] }[] = [
  { label: 'Language', items: ['TypeScript', 'JavaScript (ES6+)'] },
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'React Native', 'Expo', 'Vite'],
  },
  {
    label: 'State · Data',
    items: ['TanStack Query', 'Zustand', 'Redux Toolkit', 'Jotai', 'React Hook Form', 'Zod'],
  },
  {
    label: 'Styling',
    items: ['Tailwind CSS', 'styled-components', 'Emotion', 'framer-motion'],
  },
  {
    label: 'Quality · DX',
    items: ['Cypress', 'Storybook', 'Sentry', 'Turborepo', 'Yarn Berry', 'Claude Code'],
  },
  {
    label: 'Infra · Collaboration',
    items: ['Docker', 'Kubernetes', 'AWS (S3 · EKS)', 'Vercel', 'Firebase', 'Git', 'Jira'],
  },
];
