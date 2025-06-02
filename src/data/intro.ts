export interface IntroData {
  texts: string[];
  description: string[];
  contacts: {
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    velog: string;
    portfolio: string;
  };
}

export const introData: IntroData = {
  texts: ['안녕하세요', '프론트엔드 개발자 김성용입니다'],
  description: [
    '눈에 보이는 페이지에 생동감을 불어넣는 매력에 빠져 프론트엔드 개발자가 되었습니다.',
    '특히, 디자인을 보며 구현 과정에 대해 깊이 고민하는 것을 좋아합니다.',
    '완벽함이란 없다고 생각하고 있습니다.',
    '더 나은 방법을 찾으며 고민하는 개발자 김성용입니다.',
  ],
  contacts: {
    email: 'ancjs369@naver.com',
    phone: '010-9380-1663',
    github: 'https://github.com/yongseong2',
    linkedin: 'https://www.linkedin.com/in/seongyong-kim-048a49297',
    velog: 'https://velog.io/@yongseong2/posts',
    portfolio: 'https://seongyong2.vercel.app/',
  },
};
