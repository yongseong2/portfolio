import type { Link } from './experience';

export interface GalleryImage {
  src: string;
  title: string;
  points?: string[];
  link?: Link;
  wide?: boolean;
}

export type ProjectCover =
  | { type: 'mobile'; images: string[] }
  | { type: 'desktop'; image: string }
  | { type: 'none' };

export interface SideProject {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  award: string;
  awardOrg: string;
  team: string;
  highlights: string[];
  stack: string[];
  links: Link[];
  cover: ProjectCover;
  gallery: GalleryImage[];
}

const img = (name: string) => `/assets/images/project/${name}`;

export const sideProjects: SideProject[] = [
  {
    id: 'fallaylist',
    title: 'Fallaylist',
    subtitle: '강원도 계곡 여행 플랫폼',
    period: '2025.07 – 2025.10',
    award: '관광데이터 활용 공모전 장려상',
    awardOrg: '한국관광공사 × 카카오',
    team: '기획 1 · 디자인 1 · 백엔드 1 · 프론트엔드 1',
    highlights: [
      'Kakao Map API 기반 계곡 지도·위치 탐색과 지역·정렬 필터 바텀시트 구현',
      '여행 일정 생성 Funnel을 Zustand로 단계별 상태 관리, React Hook Form + Zod로 입력 검증',
      'Spring AI + Gemini 기반 키워드별 테마 계곡 추천 UI 구현',
      '카카오 소셜 로그인·JWT 인증과 TanStack Query 무한 스크롤 구현',
    ],
    stack: [
      'React 19',
      'TypeScript',
      'Vite',
      'TanStack Query',
      'Zustand',
      'React Hook Form',
      'Zod',
      'Tailwind CSS',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/fallaylist/fallaylist-frontend' }],
    cover: { type: 'none' },
    gallery: [],
  },
  {
    id: 'sumbisori',
    title: '숨비소리',
    subtitle: '제주 해녀 문화 보존 서비스',
    period: '2024.10 – 2025.06',
    award: '구름톤 in 제주 11기 최우수상',
    awardOrg: '카카오 × 구름',
    team: '기획 1 · 디자인 1 · 백엔드 1 · 프론트엔드 2',
    highlights: [
      'matter.js로 해산물 수족관 2D 물리 엔진 인터랙션 구현',
      '해산물 사진을 S3 업로드 후 AI 이미지 분석으로 종류·개수 인식, Promise.all 병렬 처리와 낙관적 UI 적용',
      '해양수산부 API로 실시간 수온·물때를 연동하고 네이버 지도 기반 제주 지도 구현',
      'Tailwind 테마로 스타일 가이드의 색상·타이포를 변수화하고 공통 컴포넌트 설계',
    ],
    stack: ['React', 'TypeScript', 'TanStack Query', 'Zustand', 'Tailwind CSS', 'framer-motion', 'matter.js'],
    links: [
      { label: '서비스', href: 'https://www.sumbisori.site' },
      { label: 'GitHub', href: 'https://github.com/sumbisori' },
      {
        label: '회고',
        href: '/blog/후기-구름톤-in-JEJU-11기-프론트엔드-개발-참가-후기',
      },
    ],
    cover: {
      type: 'mobile',
      images: [img('sumbisori-1.png'), img('sumbisori-5.png'), img('sumbisori-9.png')],
    },
    gallery: [
      {
        src: img('sumbisori-0.png'),
        title: '스타일 가이드',
        wide: true,
        points: [
          '디자인 시스템의 색상을 tailwind.config에 토큰으로 등록해 사용했습니다.',
          'Text·Spacing 등 일관된 스타일을 위해 작은 단위 컴포넌트부터 구현했습니다.',
        ],
      },
      {
        src: img('sumbisori-1.png'),
        title: '수족관 물리 엔진',
        points: ['matter.js로 다이버·해산물·돌·배경 레이어의 물리 특성을 정의해 구현했습니다.'],
        link: { label: 'Matter.js 사용기', href: '/blog/Matter-js-사용기' },
      },
      {
        src: img('sumbisori-2.png'),
        title: '체험일지 작성 Funnel',
        points: [
          'Zustand와 useMutation으로 단계별 입력과 유효성 검사를 관리했습니다.',
          'Funnel 이탈 시 초기화하거나 요구사항에 따라 임시 저장되도록 설계했습니다.',
        ],
      },
      { src: img('sumbisori-3.png'), title: '체험 장소 선택' },
      { src: img('sumbisori-4.png'), title: '날씨 및 일행 선택' },
      {
        src: img('sumbisori-5.png'),
        title: '해산물 이미지 분석',
        points: [
          '여러 장의 이미지를 Promise.all로 병렬 처리했습니다.',
          '분석이 끝나면 pending에서 complete로 바뀌며 인식된 해산물 종류와 개수를 보여줍니다.',
        ],
      },
      {
        src: img('sumbisori-6.png'),
        title: '이미지 업로드 프로세스',
        points: [
          'S3 업로드 전 로컬 이미지를 낙관적으로 먼저 표시합니다.',
          '업로드 성공 시 AI 분석 API를 호출하고, 진행 상태를 숫자 애니메이션으로 보여줍니다.',
        ],
      },
      { src: img('sumbisori-7.png'), title: '최종 내용 확인' },
      { src: img('sumbisori-8.png'), title: '완료 화면' },
      {
        src: img('sumbisori-9.png'),
        title: '체험일지 목록',
        points: ['useInfiniteQuery로 1·2·3열 그리드 각각에 무한 스크롤을 구현했습니다.'],
      },
    ],
  },
  {
    id: 'ziglog',
    title: 'ZigLog',
    subtitle: '지식 그래프로 탐색하는 문서 툴',
    period: '2023.10 – 2023.11',
    award: 'SSAFY 자율 프로젝트 우수상',
    awardOrg: '삼성전자',
    team: '프론트엔드 4 · 백엔드 2',
    highlights: [
      'Canvas 2D·Three.js로 2D/3D 지식 그래프를 커스텀하고 노드 인터랙션 구현',
      '재귀 컴포넌트 기반 폴더 탐색기와 부모 폴더 위치를 고려한 폴더 생성 로직 구현',
      'Atomic Design 기반 Storybook으로 컴포넌트 주도 개발 환경 구축',
      '랜딩 페이지 SEO 적용으로 구글 검색 상위 노출, 라이트·다크 모드 구현',
    ],
    stack: ['Next.js', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS', 'Three.js', 'Storybook', 'Cypress', 'Yarn Berry'],
    links: [
      { label: 'GitHub', href: 'https://github.com/BittleBeatles/Ziglog' },
      { label: '시연 영상', href: 'https://www.youtube.com/watch?v=tOWOvG0jEx8' },
    ],
    cover: { type: 'desktop', image: img('ziglog-1.png') },
    gallery: [
      {
        src: img('ziglog-0.png'),
        title: '2D 지식 그래프',
        points: [
          '폴더·노트 컴포넌트를 재귀적으로 호출하고, 부모 폴더 id를 파악해 사용자가 기대하는 위치에 폴더가 생성되도록 했습니다.',
          'CanvasRenderingContext2D를 직접 조작해 그래프를 커스텀했습니다.',
        ],
      },
      {
        src: img('ziglog-1.png'),
        title: '3D 지식 그래프',
        points: ['Three.js로 구체를 렌더링하고, 노드 클릭 시 3D 카메라 애니메이션을 적용했습니다.'],
      },
      {
        src: img('ziglog-2.png'),
        title: '검색 페이지',
        points: ['전체 사용자의 노트 참조 관계를 그래프로 보여주고, 검색 결과에 무한 스크롤을 적용했습니다.'],
      },
      {
        src: img('ziglog-3.png'),
        title: 'Storybook 기반 CDD',
        points: ['컴포넌트의 사용법과 속성을 문서화해 팀원들이 쉽게 이해하고 재사용하도록 했습니다.'],
      },
    ],
  },
  {
    id: 'benepick',
    title: '베네픽',
    subtitle: '위치 기반 카드 혜택 추천 앱',
    period: '2023.08 – 2023.10',
    award: 'SSAFY 핀테크 트랙 우수상',
    awardOrg: '삼성전자',
    team: '프론트엔드 2 · 백엔드 4',
    highlights: [
      '현재 위치 기반으로 보유 카드의 최대 혜택을 추천하는 메인 화면과 위치 알림 구현',
      'SVG path를 직접 계산해 선형·막대·원형 소비 그래프 구현',
      'GPT 응답을 정형화해 옵션 선택형 혜택 안내 챗봇 구현',
      'axios 인스턴스·인터셉터로 네트워크 모듈화, build.gradle 최적화 후 Play 스토어 배포',
    ],
    stack: ['React Native', 'TypeScript', 'React Navigation', 'Redux Toolkit'],
    links: [
      { label: 'GitHub', href: 'https://github.com/Benepick/Benepick' },
      { label: '시연 영상', href: 'https://www.youtube.com/watch?v=KMJX3GOS7eo' },
    ],
    cover: {
      type: 'mobile',
      images: [img('benepick-0.png'), img('benepick-2.png'), img('benepick-6.png')],
    },
    gallery: [
      {
        src: img('benepick-2.png'),
        title: '위치 기반 혜택',
        points: ['앱 실행 시 현재 위치에 맞는 최적의 카드를 바로 추천합니다.'],
      },
      {
        src: img('benepick-3.jpg'),
        title: '위치 알림',
        points: ['알림 모듈은 Java 네이티브 모듈로 구현했습니다.'],
      },
      {
        src: img('benepick-0.png'),
        title: '혜택 안내 챗봇',
        points: ['카드의 다양한 혜택 정보를 대화형으로 전달하기 위해 챗봇을 도입했습니다.'],
      },
      {
        src: img('benepick-1.png'),
        title: '응답 정형화',
        points: ['GPT 응답을 정형화해 사용자가 보기 쉬운 혜택 정보로 제공합니다.'],
      },
      {
        src: img('benepick-4.png'),
        title: '선형 그래프',
        points: ['SVG path 속성을 직접 계산해 소비 내역 그래프를 그렸습니다.'],
      },
      { src: img('benepick-5.png'), title: '막대 그래프' },
      {
        src: img('benepick-6.png'),
        title: '원형 그래프',
        points: ['카테고리별 소비 비율에 맞춰 원호를 계산해 그렸습니다.'],
      },
      {
        src: img('benepick-7.png'),
        title: '장소 기반 혜택 검색',
        points: ['장소 검색 시 보유 카드의 최대 혜택과 해당 장소 최고 혜택 카드를 함께 보여줍니다.'],
      },
      { src: img('benepick-8.png'), title: '검색 결과 상세' },
    ],
  },
  {
    id: 'bidking',
    title: '입찰왕',
    subtitle: '실시간 라이브 경매 플랫폼',
    period: '2023.07 – 2023.08',
    award: 'SSAFY 웹기술 트랙 우수상',
    awardOrg: '삼성전자',
    team: '프론트엔드 2 · 백엔드 4',
    highlights: [
      'OpenVidu로 판매자 실시간 화면 송출(1:N), Socket.io로 경매방 채팅 구현',
      'SSE 기반 실시간 알림 수신과 알림 내역 조회 구현',
      '스크롤 이벤트 쓰로틀링 기반 무한 스크롤 경매방 탐색',
      'Access·Refresh Token 기반 인증·갱신, 판매자·구매자 테마 분리',
    ],
    stack: ['React', 'TypeScript', 'Redux Toolkit', 'React Query', 'Emotion', 'Storybook', 'Yarn Berry'],
    links: [
      { label: 'GitHub', href: 'https://github.com/bid-king' },
      { label: '시연 영상', href: 'https://www.youtube.com/watch?v=iyUf4gSRbaA' },
    ],
    cover: { type: 'desktop', image: img('bidking-cover.webp') },
    gallery: [
      {
        src: img('bidking-0.png'),
        title: '판매자 화면',
        points: ['판매자는 OpenVidu로 상품을 실시간 송출합니다.'],
      },
      {
        src: img('bidking-1.png'),
        title: '구매자 화면',
        points: ['구매자는 실시간 영상을 보며 여러 사람과 함께 경매에 참여합니다.'],
      },
      {
        src: img('bidking-2.png'),
        title: '메인 페이지',
        points: ['카테고리 필터와 무한 스크롤로 경매 목록을 탐색합니다.'],
      },
    ],
  },
];
