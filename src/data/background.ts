export interface Award {
  year: string;
  title: string;
  org: string;
  project: string;
  rank: '최우수상' | '우수상' | '장려상';
}

export const awards: Award[] = [
  {
    year: '2025',
    title: '관광데이터 활용 공모전',
    org: '한국관광공사 × 카카오',
    project: 'Fallaylist',
    rank: '장려상',
  },
  {
    year: '2024',
    title: '구름톤 in 제주 11기',
    org: '카카오 × 구름',
    project: '숨비소리',
    rank: '최우수상',
  },
  {
    year: '2023',
    title: 'SSAFY 핀테크 트랙',
    org: '삼성전자',
    project: '베네픽',
    rank: '우수상',
  },
  {
    year: '2023',
    title: 'SSAFY 웹기술 트랙',
    org: '삼성전자',
    project: '입찰왕',
    rank: '우수상',
  },
  {
    year: '2023',
    title: 'SSAFY 자율 프로젝트',
    org: '삼성전자',
    project: 'ZigLog',
    rank: '우수상',
  },
];

export const education = [
  {
    title: '삼성 청년 SW 아카데미 (SSAFY) 9기',
    detail: 'Python·자료구조·알고리즘·JavaScript·Django 기반 웹 개발 과정',
    period: '2023.01 – 2023.10',
  },
  {
    title: '서경대학교',
    detail: '산업경영시스템공학과 졸업',
    period: '2016.03 – 2021.03',
  },
];

export const certifications = [
  { title: '산업안전기사', org: '한국산업인력공단' },
  { title: '품질경영기사', org: '한국산업인력공단' },
  { title: 'TOEIC 730', org: '2022.10' },
  { title: 'TOEIC Speaking IM3', org: '2022.11' },
];
