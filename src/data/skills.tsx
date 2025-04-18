import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTurborepo,
  SiVuedotjs,
  SiYarn,
  SiGit,
  SiJira,
} from 'react-icons/si';
import { TbBrandReactNative } from 'react-icons/tb';

export interface Skill {
  category: string;
  name: string;
  description: string[];
  icon: JSX.Element;
}

export const skills: Skill[] = [
  {
    category: 'Language',
    name: 'Typescript',
    icon: <SiTypescript className='text-2xl text-[#3178C6]' />,
    description: [
      '확장성을 위해 Typescript 사용을 주저하지 않습니다.',
      '객체 타입과 주요 tsconfig의 설정을 이해하고 있습니다.',
    ],
  },
  {
    category: 'Language',
    name: 'Javascript(ES6)',
    icon: <SiJavascript className='text-2xl text-[#F7DF1E]' />,
    description: [
      'ES6 자바스크립트 문법을 주로 활용합니다.',
      '코드의 재사용성과 가독성 향상을 위해 함수형 프로그래밍을 사용합니다.',
    ],
  },
  {
    category: 'Framework/Library',
    name: 'React',
    icon: <SiReact className='text-2xl text-[#61DAFB]' />,
    description: [
      '아토믹 컴포넌트 설계 기반의 Storybook을 활용한 디자인 시스템을 서류로 남기며 구축해본 경험이 있습니다.',
      '프로젝트 초기 설정 및 최신 개발 환경 구축 (eslint, prettier, next.config.js, cypress)을 다수 해본 경험이 있습니다.',
      '최신 CSS in JS 를 사용했습니다. styled-components, emotion, tailwind 등 다양한 CSS 구조에 익숙합니다.',
      '불필요한 props drilling을 피하며, 전역 상태 관리 환경을 구축합니다.',
    ],
  },
  {
    category: 'Framework/Library',
    name: 'Next.js 13',
    icon: <SiNextdotjs className='text-2xl text-black dark:text-white' />,
    description: [
      'Next.js와 Postgres DB, Prisma를 활용한 풀스택 개발 경험이 있습니다.',
      'data fetching을 활용하기 위해 axios 사용 대신 data 캐싱이 적용되는 라이브러리를 활용하였습니다.',
      'SSR, SSG, ISR 적용을 고민하여 페이지를 설계한 경험이 있습니다.',
      'SEO를 적용하여 배포 후 서비스 검색 결과를 상위에 노출 시킨 경험이 있습니다.',
    ],
  },
  {
    category: 'Framework/Library',
    name: 'turborepo',
    icon: <SiTurborepo className='text-2xl text-[#EF4444]' />,
    description: [
      '세 가지의 서비스를 분기하며 의존성을 분리해본 경험이 있습니다.',
      '공통된 컴포넌트,페이지, 훅들을 package로 분리했습니다.',
    ],
  },
  {
    category: 'Framework/Library',
    name: 'React Native',
    icon: <TbBrandReactNative className='text-2xl text-[#61DAFB]' />,
    description: [
      'React Native CLI의 주요 컴포넌트와 속성을 공식 문서를 참고하여 개발한 경험이 있습니다.',
      '플레이스토어 배포를 위해 검토사항을 고려하여 오류 테스팅과 빌드 최적화 과정을 경험하였습니다.',
    ],
  },
  {
    category: 'Framework/Library',
    name: 'Vue',
    icon: <SiVuedotjs className='text-2xl text-[#4FC08D]' />,
    description: [
      'methods, computed, 그리고 watch 간의 차이점을 이해하며 프로젝트를 진행해본 경험이 있습니다.',
    ],
  },
  {
    category: 'Package Manager',
    name: 'Yarn Berry',
    icon: <SiYarn className='text-2xl text-[#2C8EBB]' />,
    description: [
      'React와 Next js에 도입하여 CI 향상, Zero Install을 구축한 경험이 있습니다.',
      '프로젝트의 요구사항에 맞게 Webpack과 Babel 설정을 수정 및 최적화한 경험이 있습니다.',
    ],
  },
  {
    category: 'Collaboration & Tool',
    name: 'Git',
    icon: <SiGit className='text-2xl text-[#F05032]' />,
    description: [
      'Git Flow를 이해하며 master, develop, feature, hotfix 등의 브랜치 전략을 수립하여 개발을 진행하였습니다.',
    ],
  },
  {
    category: 'Collaboration & Tool',
    name: 'JIRA',
    icon: <SiJira className='text-2xl text-[#0052CC]' />,
    description: [
      '애자일 기반의 프로젝트 관리를 진행하였습니다.',
      '스프린트 단위로 일정을 조율하며 협업하였습니다.',
    ],
  },
];
