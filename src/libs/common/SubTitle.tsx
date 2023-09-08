/** @jsxImportSource @emotion/react */
import React from 'react';
import colors from '../design/colors';

interface Props {
  title: string;
}

export function SubTitle({ title }: Props) {
  return (
    <div
      css={{
        width: '300px', // Changed from 21vw to 300px
        height: '90px', // Changed from 5vw to 90px
        border: `6px solid ${colors.black}`, // Changed from 0.4vw to 4px
        fontSize: '17px', // Changed from 1vw to 14px
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        letterSpacing: '1.5px', // Changed from 0.1vw to 1.5px
      }}
    >
      <h1>{title}</h1>
    </div>
  );
}
