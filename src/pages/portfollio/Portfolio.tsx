/** @jsxImportSource @emotion/react */
import React from 'react';
import { Element } from 'react-scroll';
import PortfolioTitle from './container/PortfolioTitle';
import Project from './container/Project';

function PortfolioPage() {
  return (
    <div
      css={{
        height: '100vh',
      }}
    >
      <Element name='portfolio'>
        <PortfolioTitle />
        <Project
          img='crown.png'
          category='coded'
          title='입찰왕'
          description='쉽고 재미있는 라이브 경매 플랫폼'
          github='#'
          notion='#'
        />
        <Project
          img='movie101.png'
          category='coded'
          title='입찰왕'
          description='쉽고 재미있는 라이브 경매 플랫폼'
          github='#'
          notion='#'
        />
      </Element>
    </div>
  );
}

export default PortfolioPage;
