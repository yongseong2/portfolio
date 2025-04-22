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
  projectImages?: {
    url: string;
    description?: string;
    title?: string;
  }[];
}

export const projects: Project[] = [
  {
    title: '숨비소리',
    period: '2024.10.29 ~',
    description: '제주 해녀 문화보존 프로젝트',
    award: '구름톤 인 제주 11기 최우수상',
    team: '기획자 1명 / 디자이너 1명 / 백엔드 1명 / 프론트엔드 2명\n(해커톤 이후: 디자이너 1명/ 백엔드 1명 / 프론트엔드 1명)',
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
    projectImages: [
      {
        url: '/assets/images/project/sumbisori-0.png',
        title: '스타일 가이드',
        description: `
- tailwind.config에 미리 등록하여 색상을 변수화 하여 사용했습니다.
- Text, Spacing 등 일관된 스타일을 구현하기 위해 컴포넌트를 작은 단위부터 구현했습니다.`,
      },
      {
        url: '/assets/images/project/sumbisori-1.png',
        title: '수족관 물리엔진',
        description: `
- matter.js 를 활용하여 다이버, 해산물, 돌, 배경 레이어 특성을 정의하며 구현하였습니다. 
- 구현 과정: [Matter.js 사용기](https://velog.io/@yongseong2/Matter.js-사용기)`,
      },
      {
        url: '/assets/images/project/sumbisori-2.png',
        title: '체험일지 작성 폼',
        description: `- 사용자의 입력을 받는 form을 효율적으로 관리 및 유효성 검사를 위해 zustand 와 react-query mutation을 활용했습니다.\n- form 과정(Funnel)을 벗어 날 때 초기화 하거나 요구 사항에 따라 임시 저장이 가능하게 설계 했습니다.`,
      },
      {
        url: '/assets/images/project/sumbisori-3.png',
        title: '체험 장소 선택',
        description: `- 체험 장소 목록 선택`,
      },
      {
        url: '/assets/images/project/sumbisori-4.png',
        title: '날씨 및 일행 선택',
        description: `- 날씨 및 일행 선택`,
      },
      {
        url: '/assets/images/project/sumbisori-5.png',
        title: '해산물 이미지 분석',
        description: `
- 단일 이미지가 아니라 복수의 이미지를 처리하게 위해 Promise.all을 활용했습니다.
- 분석 과정을 거친 이미지들은 pending에서 complete 상태로 변경되면서 응답 받은 해산물 종류와 개수를 표시합니다.`,
      },
      {
        url: '/assets/images/project/sumbisori-6.png',
        title: '이미지 업로드 프로세스',
        description: `- 해산물 이미지 올릴 때 아래와 같은 과정을 거칩니다.\n  1. 이미지를 S3에 업로드한 후, 업로드 전 로컬 이미지는 화면에 낙관적으로 표시됩니다.\n  2. S3 업로드에 성공한 경우 AI 이미지 분석 API를 호출합니다.\n  3. 위 과정이 진행 될 때 이미지는 pending 상태를 가지면서 로딩 바에서 숫자가 올라가는 애니메이션을 확인합니다. `,
      },
      {
        url: '/assets/images/project/sumbisori-7.png',
        title: '최종 내용 확인',
        description: `- 최종 내용 확인`,
      },
      {
        url: '/assets/images/project/sumbisori-8.png',
        title: '완료 이벤트',
        description: `- 완료 이벤트 페이지`,
      },
      {
        url: '/assets/images/project/sumbisori-9.png',
        title: '체험일지 목록',
        description: `- 체험일지 목록 페이지: useInfiniteQuery를 활용하여 grid cols가 1개, 2개, 3개 별로 무한 스크롤을 구현하였습니다.`,
      },
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
    projectImages: [
      {
        url: '/assets/images/project/rolling-leaf-0.png',
        title: '수신 나뭇잎(편지) 조회',
        description: `
- 편지함 페이지에서 수신 나뭇잎을 클릭하면 편지 상세 페이지로 이동합니다.
- 공유하기 버튼을 통해 편지함 링크를 공유할 수 있습니다.
        `,
      },
      {
        url: '/assets/images/project/rolling-leaf-1.png',
        title: '나뭇잎(편지) 작성',
        description: `
- 편지 작성 페이지에서 편지 내용을 작성할 수 있습니다.
        `,
      },
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
      '프로젝트 초기 설정 및 컴포넌트 주도 개발 환경 구축',
      '라이트모드/다크모드 구현',
    ],
    projectImages: [
      {
        url: '/assets/images/project/ziglog-0.png',
        title: '2D 지식 그래프',
        description: `
- 폴더탐색기: 각각의 폴더 또는 노트 컴포넌트를 재귀적으로 호출하였습니다. 특히, 폴더 생성시에는 각각의 부모폴더 id를 파악하는 로직을 호출하여 사용자 입장에서 생각되는 위치에 폴더가 생성되도록 구현하였습니다.
- 2D 그래프 커스텀을 위해 CanvasRenderingContext2D 객체를 조작하였습니다.
        `,
      },
      {
        url: '/assets/images/project/ziglog-1.png',
        title: '3D 지식 그래프',
        description: `
- 3D로 구체를 렌더링 하기위해 Three.js의 객체를 생성하였습니다.
- 노트 또는 폴더 클릭 시 3D 애니메이션 효과를 부여하였습니다.
        `,
      },
      {
        url: '/assets/images/project/ziglog-2.png',
        title: '검색페이지',
        description: `
- 모든 사용자의 노트 참조관계를 그래프로 확인 할 수 있습니다. 
- 검색 결과에 무한 스크롤링을 적용하여 공개된 노트를 조회할 수 있습니다.
        `,
      },
      {
        url: '/assets/images/project/ziglog-3.png',
        title: 'Atomic 디자인 기반의 CDD 진행으로 Storybook 사용',
        description: `
- 각 컴포넌트의 사용법과 속성을 명확하게 해, 팀원들이 컴포넌트를 쉽게 이해하고 사용할 수 있도록 하였습니다.
        `,
      },
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
      '챗봇 페이지(답변 내용 기반의 옵션 선택 기능) 개발',
      '혜택 검색 페이지 개발',
    ],
    projectImages: [
      {
        url: '/assets/images/project/benepick-0.png',
        title: '챗봇1',
        description: `
- 카드의 다양한 혜택 정보를 사용자에게 효과적으로 전달하고자 챗봇 서비스를 도입을 하였습니다.

        `,
      },
      {
        url: '/assets/images/project/benepick-1.png',
        title: '챗봇2',
        description: `
- Chat GPT 응답을 정형화 시켜 사용자가 보기 쉬운 혜택 정보를 제공합니다.
        `,
      },
      {
        url: '/assets/images/project/benepick-2.png',
        title: '메인페이지 - 위치 기반 혜택',
        description: `
- 앱을 실행하는 순간 간편 로그인이 활성화 된다면, 자신의 위치에 따른 카드 추천을 받을 수 있도록 메인 페이지를 구현하였습니다.      
        `,
      },
      {
        url: '/assets/images/project/benepick-3.jpg',
        title: '메인페이지 - 위치 알림',
        description: `
- 알림 모듈 구현을 위해 Java 모듈을 활용하였습니다.
        `,
      },
      {
        url: '/assets/images/project/benepick-4.png',
        title: '혜택 그래프 - 선형 그래프',
        description: `
- SVG를 활용하여 소비 내역을 그래프로 표시하였습니다.
- path 속성을 활용하여 그래프의 모양을 커스텀 하였습니다.
        `,
      },
      {
        url: '/assets/images/project/benepick-5.png',
        title: '소비 그래프 - 막대 그래프',
      },
      {
        url: '/assets/images/project/benepick-6.png',
        title: '소비 내역 그래프 - 원 그래프',
        description: `
- 장소 카테고리 소비 비율에 따라 원 그래프로 표시하였습니다.
- radius를 계산하여 원 그래프의 비율을 조절하였습니다.
        `,
      },
      {
        url: '/assets/images/project/benepick-7.png',
        title: '장소 기반 혜택 검색1',
        description: `
- 사용자가 장소를 검색할 때, 보유한 카드의 최대 혜택을 추천하며 해당 장소에서 최고 혜택을 제공하는 다른 카드도 함께 제시됩니다.
        `,
      },
      {
        url: '/assets/images/project/benepick-8.png',
        title: '장소 기반 혜택 검색2',
      },
    ],
  },
  {
    title: '입찰왕',
    period: '2023.07.04~2023.08.19',
    description: '쉽고 재미있는 라이브 경매 플랫폼, 입찰왕',
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
    projectImages: [
      {
        url: '/assets/images/project/bidking-0.png',
        title: '경매진행 페이지 - 판매자 화면',
        description: `
- 판매자는 Openvidu로 상품을 실시간 송출합니다.
        `,
      },
      {
        url: '/assets/images/project/bidking-1.png',
        title: '경매진행 페이지 - 구매자 화면',
        description: `
- 구매자는 동시에 이를 시청하여 다수와 함께 경매에 참여합니다.
        `,
      },
      {
        url: '/assets/images/project/bidking-2.png',
        title: '메인페이지 (구매자 페이지)',
        description: `
- 메인페이지의 경매 목록 탐색에 카테고리 및 무한 스크롤링 기능을 도입하였습니다.
        `,
      },
    ],
  },
];
