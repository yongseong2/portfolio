/** @jsxImportSource @emotion/react */
import React from 'react';

interface Props {
  href: string;
  img: string;
}

export function LinkIcon({ href, img }: Props) {
  return (
    <a href={href}>
      <div
        css={{
          display: 'flex',
          background: '#C4C4C4',
          width: '60px',
          height: '60px',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        }}
      >
        <img width={'40px'} height={'40px'} src={img} alt='github' />
      </div>
    </a>
  );
}
