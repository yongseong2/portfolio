export interface Career {
  category: string;
  title: string;
  period: string;
  description: string;
  details: {
    title: string;
    description: string;
  }[];
}

export const careerData: Career[] = [
  {
    category: '프론트엔드 개발',
    title: '클라우드가드',
    period: '2023.12 ~ 재직중',
    description: '메가존클라우드 자회사\n클라우드 보안 솔루션 프론트엔드 개발',
    details: [
      {
        title: '쿠버네티스 기반 프론트엔드 배포 환경 구축',
        description: `
### 구축 내용
- 쿠버네티스 + 도커 기반 배포 파이프라인 구축
- 온프레미스(설치형)과 AWS EKS 환경 모두 호환되는 배포 구조 설계
- Config Map을 활용한 환경별 시스템 변수 관리 체계 구축
- 런타임 환경 변수 적용으로 배포 환경 유연성 확보

### 기술 스택
- Docker
- Kubernetes(Service, Deployment, ConfigMap)
- AWS EKS

### 성과
- 유연한 배포 시스템 확보
- 빌드 신뢰성 향상
- 운영 비용 절감
- 환경 전환 시 추가 개발 비용 최소화

### 관련 링크
- [React에 런타임 환경 변수 사용하기](https://velog.io/@yongseong2/React%EC%97%90-%EB%9F%B0%ED%83%80%EC%9E%84-%ED%99%98%EA%B2%BD-%EB%B3%80%EC%88%98-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
`,
      },
      {
        title: 'Turborepo를 활용한 모노레포 환경 구축',
        description: `
### 구축 내용
- TurboRepo를 활용해 tsconfig, Vite config, eslint 등을 재구성
- 디자인 시스템 개선 및 의존성 높은 로직 분리
- 마이크로 프론트엔드 아키텍처 도입

### 주요 사항
- 패키지 간 의존성 관리
- 병렬 빌드 처리

### 성과
- 신규 프로젝트 속도 향상, 재사용성 및 일관성 확보
- 빌드 시간 65% 단축
- 프로젝트 간 일관성 확보

### 관련 링크
- [Turborepo 도입기](https://velog.io/@yongseong2/Turborepo-도입기)

`,
      },

      {
        title: 'CSPM(Cloud Security Posture Management) 솔루션 개발',
        description: `
### 주요 사항
- 기존 레거시 코드의 성능 개선 및 최신 React 패턴 적용
- Class Component를 Function Component로 전환
- Custom Hook을 활용한 로직 분리
- 데이터 테이블 컴포넌트 재사용성 증가
- Context API 최적화

### 개발 환경
- React
- TypeScript
- Styled-components
- React Query
- Context API

### 성과
- 번들 사이즈 20% 이상 감소
- 코드 유지보수성 향상
- 컴포넌트 리렌더링 40% 감소
- 상태 관리 코드 가독성 개선
`,
      },
      {
        title: 'Cypress를 활용한 E2E 테스트 환경 구축',
        description: `
### 주요 사항
- 대표 기능 시나리오 별 자동화 테스트
- API 연동 테스트

### 구현 내용
- CI/CD 파이프라인 테스트 자동화
- 테스트 결과 리포팅 시스템 구축

### 성과
- 로그인부터 기능 시나리오를 자동화하여 잠재적 버그 사전 발견
- 운영 환경 안정성 확보`,
      },
      {
        title: 'Webpack 빌드 시스템에서 Vite 마이그레이션',
        description: `
### 마이그레이션 내용
- Webpack v4에서 Vite로 전환
- 빌드 설정 최적화
- 개발 환경 개선

### 성과
- 개발 서버 시작 시간 90% 단축
- HMR 속도 대폭 개선
- 빌드 시간 70% 감소`,
      },
      {
        title: '프론트 github actions + Code Deploy 배포 파이프라인 구축',
        description: `
### 구축 내용
- 쿠버네티스 + 도커 환경 이전 전 배포 파이프라인 구축
- GitHub Actions 워크플로우 설계
- AWS CodeDeploy 연동

### 자동화 항목
- 코드 품질 검사 (ESLint, Prettier)
- 테스트 자동 실행
- 빌드 및 배포 프로세스

### 성과
- 긴급 패치 대응 시간 단축`,
      },
      {
        title: 'Typespec을 활용한 API 명세 이전 작업',
        description: `
### 도입 배경
- API 문서화 표준화
- 타입 안정성 강화
- 서버 개발자 편의성 향상

### 구현 내용
- 기존 API 명세 TypeSpec 파일로 변환
- Swagger UI + TypeSpec 작성 환경 구축

### 성과
- 개발자 간 타입 관련 소통력 향상
- 문서 유지보수 비용 절감`,
      },
      {
        title: 'Next.js 기반 CSPM 솔루션 관리자 페이지 개발',
        description: `
### 주요 사항
- 사용자 권한 관리
- 실시간 로그 차트 구현
- 계정 컴플라이언스 및 룰셋 관리 기능 구현
- 실시간 로그 차트 구현

### 기술 스택
- Next.js 13
- Chart.js

### 성과
- 고객사 계정 및 환경 문제 발생 시 신속한 대응 체계 구축
`,
      },
    ],
  },
];
