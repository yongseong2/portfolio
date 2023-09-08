/** @jsxImportSource @emotion/react */
import React from 'react';
import { Spacing } from './Spacing';
import colors from '../design/colors';

export function Footer() {
  return (
    <div
      css={{
        background: colors.navBlack,
        height: '28vh',
        color: 'white',
        paddingLeft: '2rem',
        paddingRight: '2rem',
      }}
    >
      <Spacing rem='3' />
      <h1>풋터입니다</h1>
    </div>
  );
}
