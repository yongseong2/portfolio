export interface Career {
  category: string;
  title: string;
  period: string;
  description: string;
  details: string[];
}

export const careerData: Career[] = [
  {
    category: '프론트엔드 개발',
    title: '클라우드가드',
    period: '2023.12 ~ 재직중',
    description: '클라우드 보안 솔루션 프론트엔드 개발',
    details: [
      'React 기반 CSPM(Cloud Security Posture Management) 솔루션 레거시 코드 리팩토링 작업',
      'Webpack 빌드 시스템에서 Vite 마이그레이션',
      'Context API 최적화',
      'KT Cloud 보안 점검 서비스 개발',
      '보안 항목 예외처리 기능 개발',
      'Cypress를 활용한 E2E 테스트 환경 구축',
      '프론트 github actions + Code Deploy 배포 파이프라인 구축',
      'Turborepo를 활용한 모노레포 환경 구축',
      'Next js 기반 CSPM 솔루션 관리자 페이지 개발',
      '실시간 로그 차트 구현',
      'Ip 접근제어 기능 구현',
      '계정 별 컴플라이언스 관리 기능 구현',
      'Typespec을 활용한 API 명세 이전 작업',
      '프론트엔드 온프레미스(On-premise) 환경 구축',
    ],
  },
];
