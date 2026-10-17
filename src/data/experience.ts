import { monthsInclusive } from '../lib/date';

export interface Link {
  label: string;
  href: string;
}

export interface Highlight {
  title: string;
  body: string;
  result: string;
  link?: Link;
}

export interface WorkProject {
  name: string;
  period: string;
  summary: string;
  links?: Link[];
  highlights: Highlight[];
  stack: string[];
}

export interface Company {
  name: string;
  note?: string;
  role: string;
  start: string;
  end?: string;
  description: string;
  projects: WorkProject[];
}

export const companies: Company[] = [
  {
    name: '㈜케이티피',
    note: 'KTP · Korea TaxFree Payments',
    role: '프론트엔드 개발 매니저',
    start: '2025-07',
    description: '외국인 관광객 대상 택스프리·해외 간편결제 서비스',
    projects: [
      {
        name: 'KTP 가맹점 앱',
        period: '2025.10 – 2026.09',
        summary:
          '여권 OCR 스캔·해외결제·즉시환급·캐시백을 처리하는 가맹점용 모바일·태블릿 앱',
        links: [
          {
            label: 'Google Play',
            href: 'https://play.google.com/store/search?q=ktp&c=apps&hl=ko',
          },
        ],
        highlights: [
          {
            title: '결제 로직 통합',
            body: '결제수단마다 흩어져 중복되던 로직을 공통 결제 모듈(커스텀 훅)로 통합해 WeChat Pay·LinePay·AliPay+ 등 5종 해외결제를 단일 플로우로 처리',
            result: '신규 결제수단 연동 공수 약 60% 절감',
          },
          {
            title: '결제 상태 일관성',
            body: 'QR·바코드 결제의 유효시간(TTL)·만료·취소 상태를 일관되게 처리하고 결제 변경·취소 플로우를 신규 구축',
            result: '결제 단계 오류 약 30% 감소',
          },
          {
            title: 'OTA 배포 체계',
            body: '스토어 심사로 1~3일씩 지연되던 긴급 수정에 대응하기 위해 EAS Update 기반 OTA 배포 체계 도입',
            result: '핫픽스 반영 1~3일 → 수십 분',
          },
          {
            title: '현장 UX 개선',
            body: 'iOS·Android 카메라 권한·렌더링 차이로 생긴 여권 스캔 오류를 플랫폼별로 해결하고 결제 UI·동선 개선(기획·백엔드 협업)',
            result: '건당 환급 처리 시간 단축',
          },
        ],
        stack: [
          'React Native',
          'Expo',
          'TypeScript',
          'Redux Toolkit',
          'TanStack Query',
          'EAS',
        ],
      },
      {
        name: '메디큐알 (MediQR)',
        period: '2025.12 – 2026.09',
        summary:
          '외국인 관광객이 의약품 바코드를 스캔해 모국어로 약품 정보를 확인하고 약국 추천·캐시백·환급까지 이어지는 웹 서비스',
        links: [{ label: 'mediqr.ai', href: 'https://www.mediqr.ai/ko/home' }],
        highlights: [
          {
            title: '0→1 단독 구축',
            body: '초기 세팅부터 배포까지 프론트엔드 전반을 단독으로 설계·구현',
            result: '약 1개월 만에 정식 출시',
          },
          {
            title: '다국어·SEO',
            body: 'next-intl로 5개 언어 다국어와 언어별 SEO 라우팅 구축',
            result: '해외 검색 유입 약 35% 증가',
          },
          {
            title: '지도 렌더링 최적화',
            body: '약국 좌표 2만 건을 geohash로 변환·클러스터링해 다수 마커로 인한 성능 저하 해결',
            result: '지도 렌더링 시간 약 40% 단축',
          },
          {
            title: '회귀 결함 방지',
            body: '배포 후 회귀 결함에 대응해 Cypress E2E 테스트와 전역 에러 바운더리 구축',
            result: '배포 후 핫픽스 감소',
          },
        ],
        stack: [
          'Next.js',
          'TypeScript',
          'TanStack Query',
          'Zustand',
          'Firebase',
          'Cypress',
          'next-intl',
          'Vercel',
        ],
      },
      {
        name: '호텔 면세 솔루션',
        period: '2025.08 – 2026.09',
        summary:
          '호텔 투숙객의 숙박 세금 환급을 처리하는 직원용 웹과 투숙객 셀프 환급 웹',
        highlights: [
          {
            title: '정산 로직 공통화',
            body: '분산되어 있던 온라인 예약 환급액·수수료 정산 로직을 재사용 가능한 구조로 통합',
            result: '환급액 계산 오류 0건',
          },
          {
            title: '운영 가시성 확보',
            body: 'Sentry 글로벌 에러 처리와 반려·완료 메일 플로우 구현',
            result: '오류 탐지·대응 시간 단축',
          },
        ],
        stack: ['React', 'Vite', 'TypeScript', 'Zustand', 'TanStack Query', 'Sentry'],
      },
      {
        name: 'Refundit · KTP 홈페이지',
        period: '2025.07 – 2026.06',
        summary: '리브랜딩에 맞춘 마케팅 랜딩, 면세 신청, 가맹점 입점 신청 웹사이트',
        links: [
          { label: 'refundit.kr', href: 'https://www.refundit.kr/' },
          { label: 'ktaxpay.com', href: 'https://www.ktaxpay.com/' },
        ],
        highlights: [
          {
            title: '브랜드·SEO 기반 구축',
            body: '리브랜딩 시안 기반으로 랜딩·면세 신청 페이지를 전면 개발하고 sitemap·JSON-LD·GA 셋업(디자인·마케팅 협업)',
            result: '주요 키워드 검색 1페이지 노출',
          },
          {
            title: '전환율 실험',
            body: '메인 페이지 A/B 테스트와 해외결제 신청·블로그 구현(마케팅·기획 협업)',
            result: '메인 CTA 전환율 약 15% 개선',
          },
          {
            title: '유지보수성 개선',
            body: '레거시 CSS를 styled-components로 마이그레이션하고 framer-motion 인터랙션·공통 컴포넌트를 모듈화',
            result: '스타일 유지보수 공수 절감',
          },
        ],
        stack: [
          'Next.js',
          'TypeScript',
          'Zustand',
          'framer-motion',
          'react-hook-form',
          'Zod',
          'AWS S3',
        ],
      },
    ],
  },
  {
    name: '㈜클라우드가드',
    note: '메가존클라우드 자회사',
    role: 'R&D 개발 매니저',
    start: '2023-12',
    end: '2025-07',
    description: '클라우드 보안 솔루션 B2B SaaS',
    projects: [
      {
        name: 'CSPM 솔루션',
        period: '2023.12 – 2025.07',
        summary: '클라우드 환경의 설정 오류와 보안 취약점을 실시간으로 탐지하는 보안 솔루션',
        highlights: [
          {
            title: '레거시 리팩토링',
            body: '유지보수가 어려운 React 클래스형 레거시의 60% 이상을 Function Component·Hooks 구조로 전환',
            result: '신규 기능 개발 속도·가독성 향상',
          },
          {
            title: '테이블 렌더링 최적화',
            body: '대용량 클라우드 데이터 테이블의 페이지네이션 깜빡임을 TanStack Query keepPreviousData로 해소',
            result: '중복 API 요청 약 40% 감소',
          },
          {
            title: '초기 로딩 개선',
            body: '백엔드와 API 호출 순서를 조정해 초기 렌더링 병목 해소',
            result: '초기 로딩 약 30% 단축',
          },
        ],
        stack: ['React', 'TypeScript', 'styled-components', 'TanStack Query'],
      },
      {
        name: '솔루션 모노레포 분리',
        period: '2025.01 – 2025.07',
        summary: '3개 서비스로 분리되는 솔루션의 공통 모듈·테스트·API 협업 체계 구축',
        highlights: [
          {
            title: '모노레포 분리',
            body: 'Turborepo·Storybook으로 서비스 간 중복되던 컴포넌트·의존성을 공통 package로 분리',
            result: '중복 코드 제거, 빌드 시간 단축',
            link: {
              label: 'Turborepo 도입기',
              href: '/blog/Turborepo-도입기',
            },
          },
          {
            title: 'E2E 테스트 자동화',
            body: 'Cypress로 로그인부터 진단 CRUD까지 전 구간 테스트 자동화',
            result: '배포 전 회귀 결함 사전 차단',
          },
          {
            title: '프론트 선행 개발',
            body: 'TypeSpec·Swagger·Mock API 환경을 구축해 API 연동 전에도 개발 가능하도록 개선',
            result: 'API 연동 대기 시간 단축',
          },
        ],
        stack: ['Turborepo', 'Storybook', 'Cypress', 'TypeSpec'],
      },
      {
        name: 'Kubernetes 배포 환경 구축',
        period: '2025.01 – 2025.07',
        summary: '온프레미스·AWS EKS 기반 3개 서비스의 컨테이너 배포 환경 대응',
        highlights: [
          {
            title: '런타임 환경 변수',
            body: '빌드 시점에 고정되던 환경별 변수를 런타임 주입 방식으로 전환',
            result: '환경별 빌드 신뢰성 확보',
            link: {
              label: '정리 글',
              href: '/blog/React에-런타임-환경-변수-사용하기',
            },
          },
          {
            title: '배포 파이프라인 정비',
            body: '블루-그린 구분이 불명확했던 배포 과정을 Docker·Kubernetes 파이프라인으로 정비',
            result: '일관된 배포 환경 확보',
          },
        ],
        stack: ['Docker', 'Kubernetes', 'AWS EKS'],
      },
    ],
  },
];

const careerStart = companies.reduce(
  (earliest, company) => (company.start < earliest ? company.start : earliest),
  companies[0].start
);

export const totalCareerMonths = (now: Date) => monthsInclusive(careerStart, undefined, now);

export const careerYear = (now: Date) => Math.floor(totalCareerMonths(now) / 12) + 1;
