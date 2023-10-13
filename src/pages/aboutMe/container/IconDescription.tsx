/** @jsxImportSource @emotion/react */
import React from 'react';

interface Props {
  img: string;
  title: string;
  description: string;
}

function IconDescription({ img, title, description }: Props) {
  return (
    <div css={{ width: '100%' }}>
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <img width={'50rem'} height={'50rem'} src={img} alt='icon' />
        <h2
          css={{
            position: 'absolute',
            top: '50%',
            left: '1.5rem',
            transform: 'translateY(-50%)',
            lineHeight: '30px',
            fontSize: '20px',
          }}
        >
          {title}
        </h2>
      </div>
      <div>
        <h3
          css={{
            fontSize: '18px',
            lineHeight: '30px',
            paddingLeft: '1.5rem',
          }}
        >
          {description}
        </h3>
      </div>
    </div>
  );
}

export default IconDescription;
