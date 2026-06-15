import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTurborepo,
  SiYarn,
  SiGit,
  SiJira,
  SiReactquery,
  SiCypress,
  SiSentry,
} from 'react-icons/si';
import { TbBrandReactNative } from 'react-icons/tb';

export interface Skill {
  category: string;
  name: string;
  description: string;
  icon: JSX.Element;
}

export const skills: Skill[] = [
  {
    category: 'Language',
    name: 'TypeScript',
    icon: <SiTypescript className='text-2xl text-[#3178C6]' />,
    description: `
- 확장성과 안정성을 위해 TypeScript를 기본으로 사용하며, 제네릭·유틸리티 타입과 주요 tsconfig 옵션을 이해하고 타입 설계로 런타임 오류를 예방합니다.`,
  },
  {
    category: 'Language',
    name: 'JavaScript (ES6+)',
    icon: <SiJavascript className='text-2xl text-[#F7DF1E]' />,
    description: `
- ES6+ 문법을 주로 활용하며, 재사용성과 가독성 향상을 위해 함수형 프로그래밍을 지향합니다.`,
  },
  {
    category: 'Framework / Library',
    name: 'React',
    icon: <SiReact className='text-2xl text-[#61DAFB]' />,
    description: `
- 아토믹 컴포넌트 설계 기반의 Storybook 디자인 시스템을 문서로 남기며 구축한 경험이 있습니다.
- 불필요한 props drilling을 지양하고 Zustand·Redux Toolkit·Jotai로 전역 상태 관리 환경을 구축합니다.
- eslint·prettier·cypress 등 프로젝트 초기 설정과 최신 개발 환경 구축을 다수 경험했습니다.
- styled-components·emotion·Tailwind 등 다양한 CSS-in-JS 구조에 익숙합니다.`,
  },
  {
    category: 'Framework / Library',
    name: 'React Native (Expo)',
    icon: <TbBrandReactNative className='text-2xl text-[#61DAFB]' />,
    description: `
- vision-camera·BLE 등 네이티브 모듈을 연동하고, EAS Build/Update(OTA) 기반으로 앱을 배포·운영합니다.
- iOS·Android 플랫폼 차이로 발생하는 카메라·렌더링 이슈를 트러블슈팅한 경험이 있습니다.`,
  },
  {
    category: 'Framework / Library',
    name: 'Next.js',
    icon: <SiNextdotjs className='text-2xl text-black dark:text-white' />,
    description: `
- App Router 및 SSR·SSG·ISR을 고려해 페이지를 설계하고 fetching을 최적화합니다.
- SEO를 적용해 배포 후 서비스 검색 결과를 상위에 노출시킨 경험이 있습니다.
- Postgres·Prisma를 활용한 풀스택 개발 경험이 있습니다.`,
  },
  {
    category: 'Framework / Library',
    name: 'TanStack Query',
    icon: <SiReactquery className='text-2xl text-[#FF4154]' />,
    description: `
- 서버 상태 캐싱·동기화로 API 호출을 체계화하고, keepPreviousData 등으로 화면 전환 끊김을 최소화합니다.`,
  },
  {
    category: 'Framework / Library',
    name: 'Turborepo',
    icon: <SiTurborepo className='text-2xl text-[#EF4444]' />,
    description: `
- 세 가지 서비스를 분기하며 의존성을 분리하고, 공통 컴포넌트·페이지·훅을 package로 분리한 경험이 있습니다.`,
  },
  {
    category: 'Package Manager / Build',
    name: 'Yarn Berry',
    icon: <SiYarn className='text-2xl text-[#2C8EBB]' />,
    description: `
- Zero Install을 구축해 CI 속도를 향상시키고, 요구사항에 맞게 Webpack·Babel 설정을 수정·최적화한 경험이 있습니다.`,
  },
  {
    category: 'Quality / Monitoring',
    name: 'Cypress',
    icon: <SiCypress className='text-2xl text-[#17202C]' />,
    description: `
- 핵심 사용자 시나리오를 E2E로 자동화해 배포 전 회귀 오류를 검증합니다.`,
  },
  {
    category: 'Quality / Monitoring',
    name: 'Sentry',
    icon: <SiSentry className='text-2xl text-[#362D59]' />,
    description: `
- 글로벌 에러 모니터링을 연동해 운영 중 발생하는 장애를 추적·대응합니다.`,
  },
  {
    category: 'Collaboration & Tool',
    name: 'Git',
    icon: <SiGit className='text-2xl text-[#F05032]' />,
    description: `
- Git Flow를 이해하며 master·develop·feature·hotfix 브랜치 전략을 수립해 개발합니다.`,
  },
  {
    category: 'Collaboration & Tool',
    name: 'JIRA',
    icon: <SiJira className='text-2xl text-[#0052CC]' />,
    description: `
- 애자일 기반으로 스프린트 단위 일정을 조율하며 협업합니다.`,
  },
];
