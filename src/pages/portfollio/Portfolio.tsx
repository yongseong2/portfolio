/** @jsxImportSource @emotion/react */
import React from 'react';
import { Element } from 'react-scroll';
import PortfolioTitle from './container/PortfolioTitle';
import Project from './container/Project';

function Portfolio() {
  return (
    <div>
      <Element name='portfolio'>
        <PortfolioTitle />
        <div
          css={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '83.6vh',
          }}
        >
          <Project
            img='crown.png'
            category='coded'
            title='입찰왕'
            description='쉽고 재미있는 라이브 경매 플랫폼'
            github='https://github.com/bid-king/bidking'
            notion='https://glorious-saturday-7de.notion.site/534c8ece478e433f9acb124394fd1253?pvs=4'
          />
          <Project
            img='movie101.png'
            category='coded'
            title='MOVIE101'
            description='쉽고 재미있는 라이브 경매 플랫폼'
            github='https://github.com/yongseong2/movie101_final_pjt'
            notion='https://glorious-saturday-7de.notion.site/MOVIE101-a54bfbb1d82a44debbc1035074f745e3?pvs=4'
          />
        </div>
      </Element>
    </div>
  );
}

export default Portfolio;
