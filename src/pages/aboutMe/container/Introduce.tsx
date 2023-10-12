/** @jsxImportSource @emotion/react */
import React from 'react';
import { Spacing } from '../../../libs/common/Spacing';
import aboutmeData from '../../../data/aboutmeData';

export function Introduce() {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h3
        css={{
          width: '100%',
          lineHeight: '30px',
          fontSize: '18px',
          whiteSpace: 'pre-line',
        }}
      >
        {aboutmeData.introduce}
      </h3>
      <Spacing rem='5' />
      <div
        css={{
          width: '10rem',
          textAlign: 'center',
          borderLeft: '4px solid black',
          borderRight: '4px solid black',
        }}
      >
        <h2>MORE</h2>
      </div>
    </div>
  );
}
