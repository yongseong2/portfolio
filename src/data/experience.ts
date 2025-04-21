export interface Experience {
  category: string;
  title: string;
  period: string;
  description: string;
  details?: string[];
}

export const experienceData: Experience[] = [
  {
    category: '개발 교육',
    title: 'SSAFY 9기',
    period: '2023.01 ~ 2023.12',
    description: '삼성청년SW아카데미',
    details: [
      'Python, 자료구조, 알고리즘, JavaScript, Django 등 기초적인 Web 개발 역량 학습 과정',
    ],
  },
  {
    category: '대학교',
    title: '서경대학교',
    period: '2016.03 ~ 2021.02',
    description: '산업경영시스템공학 전공',
  },
  {
    category: '고등학교',
    title: '의정부고등학교',
    period: '2012.03 ~ 2015.02',
    description: '인문계열',
  },
];
