interface Project {
  title: string;
  period: string;
  description: string;
  award?: string;
  team?: string;
  links: {
    github?: string;
    demo?: string;
    review?: string[];
    video?: string;
  };
  techStack: string[];
  role: string[];
  images?: string[];
  imageDescriptions?: string[];
}

export const projects: Project[] = [
  {
    title: '숨비소리',
    period: '2024.10.29 ~',
    description: '제주 해녀 문화보존 프로젝트',
    award: '구름톤 인 제주 11기 최우수상',
    team: '기획자 1명 / 디자이너 1명 / 백엔드 1명 / 프론트엔드 2명',
    links: {
      github: 'https://github.com/sumbisori',
      demo: 'https://www.sumbisori.site',
      review: [
        'https://velog.io/@yongseong2/후기-구름톤-in-JEJU-11기-프론트엔드-개발-참가-후기',
        'https://velog.io/@yongseong2/후기-구름톤-in-JEJU-11기-프론트엔드-개발-참가-후기2',
      ],
    },
    techStack: [
      'Typescript',
      'React',
      'TailWind CSS',
      'tanstack query',
      'Zustand',
      'framer-motion',
    ],
    role: [
      '컴포넌트 구조를 활용하여 각 UI 요소를 재사용 가능한 구성 요소로 분리',
      'AWS amplify를 활용한 배포',
      'tailwind의 커스터마이징 기능을 이용해 스타일 가이드에 맞는 색상 팔레트와 테마를 설정',
      'matter.js를 활용한 수족관 2D 물리 엔진 기능 구현',
      '해양수산부 API를 활용하여 실시간 수온, 물 때 데이터 연동',
      '네이버 지도 API를 활용하여 제주도 지도 페이지 구현',
      '해산물 이미지 s3에 업로드 및 chat gpt를 활용한 해산물 갯수 파악 기능 구현',
      '모바일 기기 반응형 화면 구현',
    ],
    images: [
      '/assets/images/project/sumbisori-1.png',
      '/assets/images/project/sumbisori-2.png',
      '/assets/images/project/sumbisori-3.png',
      '/assets/images/project/sumbisori-4.png',
    ],
    imageDescriptions: [
      '메인 페이지\n- 제주도의 해녀 문화를 소개하는 랜딩 페이지\n- 스크롤 애니메이션을 통한 인터랙티브한 UX 제공',
      '수족관 페이지\n- matter.js를 활용한 2D 물리엔진 구현\n- 해녀들이 채취한 해산물을 실시간으로 확인',
      '지도 페이지\n- 네이버 지도 API를 활용한 제주도 해녀 활동 지역 표시\n- 실시간 수온과 물때 정보 제공',
      '갤러리 페이지\n- 해녀들의 활동 사진과 영상을 공유\n- 이미지 업로드 및 AI를 통한 해산물 인식 기능',
    ],
  },
  {
    title: '나뭇잎 롤링페이퍼',
    period: '2024.03.15~2024.04.15',
    description: '나뭇잎으로 구성된 롤링 페이퍼 공유 어플리케이션',
    links: {
      github: 'https://github.com/yongseong2/rolling-leaf',
      demo: 'https://rolling-leaf.vercel.app',
    },
    techStack: [
      'Typescript',
      'Next.js 14',
      'Prisma',
      'next-auth',
      'PostgreSQL',
      'Redux-toolkit',
      'TailWind CSS',
      'React-Query',
    ],
    role: [
      '풀스텍 개발',
      'api router를 활용한 백엔드 CRUD 구현',
      'next-auth 기반 Oauth 카카오톡 로그인 구현',
      'react-draggble를 활용한 드래그 앤 드랍이 가능한 편지 UI 기능',
    ],
    images: [
      '/assets/images/project/rolling-leaf-0.png',
      '/assets/images/project/rolling-leaf-1.png',
    ],
  },
  {
    title: 'ZigLog',
    period: '2023.10.09~2023.11.20',
    description: '지식그래프로 확인하는 문서 툴',
    award: '삼성 청년SW아카데미 자율 주제 프로젝트 우수상',
    team: '프론트엔드 4명 / 백엔드 2명',
    links: {
      github: 'https://github.com/BittleBeatles/Ziglog',
      video: 'https://www.youtube.com/watch?v=tOWOvG0jEx8',
    },
    techStack: [
      'Typescript',
      'Next.js',
      'Cypress',
      'Storybook',
      'Redux-toolkit',
      'TailWind CSS',
      'Yarn Berry',
      'Three.js',
    ],
    role: [
      '프론트엔드 개발 담당',
      '공통 UI 컴포넌트 개발(폴더 탐색, 북마크, 인풋, 버튼)',
      '지식 그래프 개발 및 커스텀(2D, 3D, 모든 유저 노트를 포함하는 그래프)',
      '에러 핸들링 페이지 적용 및 API 요청 오류 발생 시 안내문구 출력',
      '랜딩페이지 SEO 적용 - 구글에 Ziglog 검색시 상위 노출',
    ],
    images: [
      '/assets/images/project/ziglog-0.png',
      '/assets/images/project/ziglog-1.png',
      '/assets/images/project/ziglog-2.png',
      '/assets/images/project/ziglog-3.png',
    ],
  },
  {
    title: '베네픽',
    period: '2023.08.21~2023.10.06',
    description: '위치 기반 카드 추천 서비스',
    award: '삼성 청년SW아카데미 핀테크 트랙 우수상',
    team: '프론트엔드 2명 / 백엔드 4명',
    links: {
      github: 'https://github.com/Benepick/Benepick',
      video: 'https://www.youtube.com/watch?v=KMJX3GOS7eo',
    },
    techStack: [
      'Typescript',
      'React Native',
      'React-Navigation',
      'Redux-toolkit',
    ],
    role: [
      '프론트엔드 개발 담당',
      'build.gradle 설정 최적화 및 플레이스토어 배포',
      'axios의 인터셉터, 인스턴스를 활용한 네트워크 요청 모듈화',
      '위치기반 추천 페이지(권한 승인을 통한 조회)',
      '혜택 및 소비 내역 페이지(월별 소비 내역 조회, SVG를 활용한 그래프 구현) 개발',
    ],
    images: [
      '/assets/images/project/benepick-0.png',
      '/assets/images/project/benepick-1.png',
      '/assets/images/project/benepick-2.png',
      '/assets/images/project/benepick-3.jpg',
      '/assets/images/project/benepick-4.png',
      '/assets/images/project/benepick-5.png',
      '/assets/images/project/benepick-6.png',
      '/assets/images/project/benepick-7.png',
      '/assets/images/project/benepick-8.png',
    ],
  },
  {
    title: '입찰왕',
    period: '2023.07.04~2023.08.19',
    description: '입찰 참여자 찾기 서비스',
    award: '삼성 청년SW아카데미 웹기술 트랙 우수상',
    team: '프론트엔드 2명 / 백엔드 4명',
    links: {
      github: 'https://github.com/yongseong2/bidding-king',
      video: 'https://www.youtube.com/watch?v=iyUf4gSRbaA',
    },
    techStack: [
      'Typescript',
      'React',
      'Redux-toolkit',
      'Emotion',
      'Yarn berry',
      'Storybook',
      'React-query',
    ],
    role: [
      '프론트엔드 개발 담당',
      '메인페이지 및 Scroll event 수신 시 쓰로틀링을 이용한 API 요청으로 무한 스크롤 경매방 탐색 기능',
      'Openvidu를 활용한 판매자 실시간 화면 송출 기능(1:N)',
      'Socket.io를 활용한 경매방 구매자간의 채팅 기능',
      'SSE를 활용한 알림 수신 기능 및 알림 내역 조회 기능',
      '토큰 기반의 회원 인증 및 갱신 기능(Access Token, Refresh Token 활용)',
      '경매방 생성, 수정, 삭제 기능',
      '판매자와 구매자를 구분하는 다크모드와 라이트모드 기능',
    ],
    images: [
      '/assets/images/project/bidking-0.png',
      '/assets/images/project/bidking-1.png',
      '/assets/images/project/bidking-2.png',
    ],
  },
];
