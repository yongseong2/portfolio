/** @jsxImportSource @emotion/react */
import React from 'react';
import { SubTitle } from '../../../libs/common/SubTitle';
import { Spacing } from '../../../libs/common/Spacing';

function PortfolioTitle() {
  return (
    <div
      css={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${process.env.PUBLIC_URL}/Image/portfolioBackgroundImg.jpg)`,
        height: '15vh',
        backgroundPosition: 'center',
        boxShadow:
          '0 4px 10px rgba(0, 0, 0, 0.5), 0 -4px 10px rgba(0, 0, 0, 0.5)',
      }}
    >
      <SubTitle title='PORTFOLIO' theme='white' />
    </div>
  );
}

export default PortfolioTitle;
