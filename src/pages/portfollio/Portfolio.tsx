/** @jsxImportSource @emotion/react */
import React from 'react';
import { Element } from 'react-scroll';
import PortfolioTitle from './container/PortfolioTitle';
import Project from './container/Project';
import colors from '../../libs/design/colors';

function Portfolio() {
  const projects = [
    {
      img: 'crown.png',
      category: 'coded',
      title: '입찰왕',
      description: '쉽고 재미있는 라이브 경매 플랫폼',
      github: 'https://github.com/bid-king/bidking',
      notion:
        'https://glorious-saturday-7de.notion.site/534c8ece478e433f9acb124394fd1253?pvs=4',
    },
    {
      img: 'benepick.png',
      category: 'coded',
      title: 'BENEPICK',
      description: '위치기반 카드 추천 서비스',
      github: '',
      notion:
        'https://glorious-saturday-7de.notion.site/ca1d3c1683f94710b845ac0e0ef631cb?pvs=4',
    },
    {
      img: 'movie101.png',
      category: 'coded',
      title: 'MOVIE101',
      description: '나만의 영화취향 분석을 위한 월드컵 챌린지',
      github: 'https://github.com/yongseong2/movie101_final_pjt',
      notion:
        'https://glorious-saturday-7de.notion.site/MOVIE101-a54bfbb1d82a44debbc1035074f745e3?pvs=4',
    },
  ];

  return (
    <div>
      <Element name='portfolio'>
        <PortfolioTitle />
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            // flexWrap: 'wrap',
            // justifyContent: 'flex-start',
            alignItems: 'center',
            background: colors.backgroundDark,
          }}
        >
          {projects.map((project, index) => (
            <Project
              key={index}
              img={project.img}
              category={project.category}
              title={project.title}
              description={project.description}
              github={project.github}
              notion={project.notion}
            />
          ))}
        </div>
      </Element>
    </div>
  );
}

export default Portfolio;
