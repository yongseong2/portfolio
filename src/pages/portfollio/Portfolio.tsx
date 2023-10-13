/** @jsxImportSource @emotion/react */
import React from 'react';
import { Element } from 'react-scroll';
import PortfolioTitle from './container/PortfolioTitle';
import Project from './container/Project';
import colors from '../../libs/design/colors';
import { benepickDetail } from '../../data/benepickDetail';
import { bidkingDetail } from '../../data/bidkingDetail';
import { movie101Detail } from '../../data/movie101Detail';
import { Spacing } from '../../libs/common/Spacing';
import { SubTitle } from '../../libs/common/SubTitle';

function Portfolio() {
  const projects = [
    {
      detail: benepickDetail,
      img: 'benepick.png',
      category: 'coded',
      title: 'BENEPICK',
      description: '위치기반 카드 추천 서비스',
      github: 'https://github.com/Benepick/Benepick',
      date: '2023.08.21~2023.10.06',
      notion:
        'https://glorious-saturday-7de.notion.site/ca1d3c1683f94710b845ac0e0ef631cb?pvs=4',
    },
    {
      detail: bidkingDetail,
      img: 'crown.png',
      category: 'coded',
      title: '입찰왕',
      description: '쉽고 재미있는 라이브 경매 플랫폼',
      github: 'https://github.com/bid-king/bidking',
      date: '2023.07.04~2023.08.18',
      notion:
        'https://glorious-saturday-7de.notion.site/534c8ece478e433f9acb124394fd1253?pvs=4',
    },
    {
      detail: movie101Detail,
      img: 'movie101.png',
      category: 'coded',
      title: 'MOVIE101',
      description: '나만의 영화취향 분석을 위한 월드컵 챌린지',
      github: 'https://github.com/yongseong2/movie101_final_pjt',
      date: '2023.05.17~2023.05.25',
      notion:
        'https://glorious-saturday-7de.notion.site/MOVIE101-a54bfbb1d82a44debbc1035074f745e3?pvs=4',
    },
  ];

  return (
    <div>
      <Element name='portfolio'>
        {/* <PortfolioTitle /> */}
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: colors.backgroundDark,
          }}
        >
          <Spacing rem='3' />
          <SubTitle title='PORTFOLIO' theme='white' />
          {projects.map((project, index) => (
            <Project
              key={index}
              date={project.date}
              img={project.img}
              category={project.category}
              title={project.title}
              description={project.description}
              github={project.github}
              notion={project.notion}
              markdown={project.detail}
            />
          ))}
          <Spacing rem='3' />
        </div>
      </Element>
    </div>
  );
}

export default Portfolio;
