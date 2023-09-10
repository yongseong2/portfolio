/** @jsxImportSource @emotion/react */
import React from 'react';
import colors from '../design/colors';

interface Props {
  title: string;
  theme?: 'white' | 'black';
}

export function SubTitle({ title, theme = 'black' }: Props) {
  return (
    <div
      css={{
        width: '300px',
        height: '90px',
        border: `6px solid ${
          theme === 'black' ? `${colors.black}` : `${colors.white}`
        }`,
        fontSize: '17px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        letterSpacing: '1.5px',
        color: theme === 'black' ? `${colors.black}` : `${colors.white}`,
      }}
    >
      <h1>{title}</h1>
    </div>
  );
}
