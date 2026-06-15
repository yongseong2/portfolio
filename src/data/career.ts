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
    title: 'KTP (Korea TaxFree Payments)',
    period: '2025.07 ~ 재직중',
    description:
      '외국인 관광객 대상 택스프리·해외 간편결제 서비스\n가맹점 POS 앱 및 웹 서비스 프론트엔드',
    details: [
      {
        title: 'KTP 앱 — 세금 환급·해외 간편결제 POS',
        description: `
### 기간
2025.10 ~ 현재

### Description
가맹점에서 외국인 관광객의 세금 환급과 해외 간편결제를 처리하는 **모바일·태블릿 POS 앱**입니다. QR·바코드 스캔 결제, 즉시환급, 캐시백 등 매장 현장에서 쓰이는 핵심 서비스입니다.

### 주요 업무
- **[결제 로직 통합]** 결제수단마다 화면에 흩어져 중복되던 결제 로직 → 공통 결제 모듈(커스텀 훅)로 통합해 **5종** 해외 결제(ICB·PayPay·LinePay·UnionPay·QBank)를 단일 플로우로 처리 → **신규 결제수단 연동 공수 약 60% 절감**, 중복 코드 제거
- **[데이터 정합성]** 환급 거래 식별자가 이전 거래와 충돌해 잘못된 결제가 취소되던 버그 → 거래 식별 로직 재설계·파라미터 분리 → **결제 오취소 0건 달성**, 정산 정합성 확보
- **[결제 플로우 구축]** QR·바코드 결제의 유효시간(TTL)·만료·취소 상태 불일치 → 상태 일관 처리 및 즉시환급 결제 변경·취소 플로우 신규 구축 → **결제 단계 CS 문의 약 30% 감소**
- **[배포 효율화]** 스토어 심사로 긴급 수정 반영이 1~3일 지연 → EAS OTA 배포 체계 도입 → **핫픽스 반영 시간 1~3일 → 수십 분으로 단축**
- **[현장 UX 개선]** iOS·Android 카메라 권한·렌더링 차이로 여권 스캔 오류 발생 → 플랫폼별 트러블슈팅 및 결제 UI·동선 개선(기획·백엔드 협업) → **건당 환급 처리 시간 약 25% 단축**

### 기술 스택
- React Native, Expo, TypeScript, Redux Toolkit, TanStack Query, EAS
`,
      },
      {
        title: '메디큐알 (MediQR) — 약국 의약품·캐시백 웹',
        description: `
### 기간
2025.12 ~ 현재

### Description
외국인 관광객이 약국에서 의약품 바코드를 스캔하면 **모국어로 약품 정보**를 확인하고, 약국 추천·캐시백·환급까지 연결되는 웹 서비스입니다.

### 주요 업무
- **[0→1 단독 구축]** 신규 약국 전용 환급 어시스트 웹 부재 → 초기 세팅부터 배포까지 프론트엔드 전반 단독 설계·구현 → **약 2개월 만에 서비스 정식 출시**
- **[디바이스 트러블슈팅]** iPhone에서 바코드 스캐너 카메라가 인식되지 않던 문제 → 스캔 라이브러리 교체·권한 처리 로직 분리 → **스캔 인식 성공률 약 50% → 98%**
- **[글로벌 i18n]** 단일 언어로 외국인 사용자 접근성 한계 → 5개 언어 다국어·언어별 SEO 라우팅 구축 → **다국어 5개국 커버리지 확보, 해외 검색 유입 약 35% 증가**
- **[지도 렌더링 최적화]** 다수 약국 마커로 지도 성능 저하 → 좌표 geohash 변환·클러스터링 적용 → **지도 렌더링 시간 약 40% 단축**
- **[운영 안정성]** 배포 후 회귀 결함 발생 → Cypress E2E·전역 에러 바운더리 구축 → **배포 후 핫픽스 약 20% 감소**

### 기술 스택
- Next.js, React, TypeScript, TanStack Query, Zustand, Firebase, Cypress, Vercel
`,
      },
      {
        title: 'Refundit 홈페이지 — 리브랜딩 랜딩',
        description: `
### 기간
2025.08 ~ 현재

### Description
**리브랜딩**에 맞춘 마케팅 랜딩 및 **면세 신청** 웹사이트입니다.

### 주요 업무
- **[자체 인터랙션 구현]** 외부 스크롤 스냅 라이브러리가 다중 모니터·모바일 미지원 → 풀페이지 스크롤 스냅 인터랙션 직접 구현·해상도별 예외 처리 → **라이브러리 의존성 제거, 모바일 이탈률 약 20% 개선**
- **[폼 완료율]** 다단계 면세 신청 폼 이탈 시 입력값 소실 → 전자서명 폼 상태 영속화(이탈 후 재진입 시 입력 유지) → **신청 완료율 약 25% 향상**
- **[크로스 브라우저]** 사파리에서 전자서명 이미지 미노출 → 원인 분석 후 렌더링 방식 수정 → **서명 실패 문의 0건**
- **[브랜드·SEO]** 검색 노출·브랜드 일관성 부재, 블로그 개별 컨텐츠 SEO 작업 → sitemap·JSON-LD·GA 셋업 및 디자인 시안 픽셀 단위 반영(디자인·마케팅 협업) → **주요 키워드 검색 1페이지 노출**

### 기술 스택
- Next.js, React, TypeScript, Zustand, framer-motion, react-hook-form, Zod
`,
      },
      {
        title: '호텔 면세 솔루션 — 숙박 세금 환급',
        description: `
### 기간
2026.02 ~ 현재

### Description
호텔 투숙객의 **숙박 세금 환급**을 처리하는 직원용 웹과, 투숙객이 직접 신청하는 **셀프 환급** 웹입니다.

### 주요 업무
- **[정산 정합성]** OTA 수수료율 미반영·미선택 버그로 환급액 오류 → 수수료율 기반 환급액 재계산 로직 구현·버그 수정 → **환급액 계산 오류 0건, 정산 정합성 확보**
- **[업무 프로세스 간소화]** 수기 중심 환급 처리의 비효율 → 여권 MRZ 인증·다중 호텔 처리·온라인/워크인 이력 분리 → **건당 처리 시간 약 30% 단축**
- **[운영 가시성]** 장애 추적·대응 어려움 → Sentry 글로벌 에러 처리·반려/완료 메일 플로우 구현 → **오류 탐지·대응 시간 단축**

### 기술 스택
- React, Vite, TypeScript, Zustand, TanStack Query, Sentry
`,
      },
      {
        title: 'KTP 홈페이지 — 가맹점 신청·마케팅',
        description: `
### 기간
2025.07 ~ 현재

### Description
택스프리 서비스 소개, **가맹점 입점 신청**, 프로모션 웹사이트입니다.

### 주요 업무
- **[전환율 실험]** 메인 페이지 전환율 정체 → A/B 테스트·해외결제 신청·블로그 구현(마케팅·기획 협업) → **메인 CTA 전환율 약 15% 개선, 유입률 높은 테스트 페이지 선택**
- **[유지보수성]** 레거시 CSS 산재로 스타일 관리 비효율 → styled-components 마이그레이션·동적 sitemap·광고 트래킹 정비 → **검색 유입 증가, 스타일 유지보수 공수 절감**

### 기술 스택
- Next.js, React, TypeScript, TanStack Query, styled-components, AWS S3
`,
      },
    ],
  },
  {
    category: '프론트엔드 개발',
    title: '클라우드 가드 (전 린아레나)',
    period: '2024.12 ~ 2025.07',
    description:
      '메가존 클라우드 자회사\n클라우드 보안 솔루션 B2B SaaS 프론트엔드',
    details: [
      {
        title: 'CSPM 솔루션 개발',
        description: `
### 주요 업무
- **[레거시 현대화]** 노후 클래스형 코드로 유지보수 난이도 상 → 레거시 60% 이상 리팩토링·Function Component/Hooks 전환 → **신규 기능 개발 속도 향상, 가독성 개선**
- **[체감 성능]** 대용량 클라우드 데이터 테이블 페이지네이션 깜빡임 → TanStack Query keepPreviousData 도입 → **페이지 전환 체감 지연 제거, 중복 API 요청 약 40% 감소**
- **[협업 최적화]** 초기 렌더링 병목 → 백엔드와 API 호출 순서 조정 → **초기 로딩 약 30% 단축, 고객사 피드백 개선**

### 기술 스택
- React, TypeScript, styled-components, TanStack Query
`,
      },
      {
        title: '솔루션 도메인 별 분리 - Turborepo 모노레포 · E2E 테스트',
        description: `
### 주요 업무
- **[모노레포 분리]** 서비스 간 컴포넌트·의존성 중복 → Turborepo·Storybook으로 공통 모듈 분리 → **중복 코드 제거, 빌드 시간 단축** ([Turborepo 도입기](https://velog.io/@yongseong2/Turborepo-%EB%8F%84%EC%9E%85%EA%B8%B0))
- **[품질 자동화]** 수동 테스트로 회귀 결함 누락 → Cypress E2E로 로그인~진단 CRUD 전 구간 자동화 → **배포 전 회귀 결함 사전 차단**
- **[협업 효율]** API 명세 소통 비용 → TypeSpec·Swagger·Mock API 환경 구축 → **프론트 선행 개발 가능, 연동 대기 시간 단축**

### 기술 스택
- Turborepo, Storybook, Cypress, TypeSpec
`,
      },
      {
        title: 'Kubernetes 배포 환경 구축',
        description: `
### 주요 업무
- **[빌드 신뢰성]** 환경별 변수 설정 이슈 → 런타임 환경 변수 적용 → **빌드 신뢰성 향상** ([블로그](https://velog.io/@yongseong2/React%EC%97%90-%EB%9F%B0%ED%83%80%EC%9E%84-%ED%99%98%EA%B2%BD-%EB%B3%80%EC%88%98-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0))
- **[배포 환경 구축]** 블루-그린 구분 불명확·배포 시점 제약 → Docker·K8s 파이프라인 구축(온프레미스·AWS EKS **3개 서비스**) → **일관된 배포 환경 확보**

### 기술 스택
- Docker, Kubernetes, AWS EKS
`,
      },
    ],
  },
];
