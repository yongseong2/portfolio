/** @jsxImportSource @emotion/react */
import React from 'react';

interface Props {
  img: string;
  title: string;
  description: string;
}

function IconDescription({ img, title, description }: Props) {
  return (
    <div
      css={{
        width: '400px',
        height: '100px',
      }}
    >
      <div
        css={{
          position: 'relative',
          width: '80px',
          height: '80px',
        }}
      >
        <img
          css={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          src={img}
          alt='icon'
        />
        <h2
          css={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            fontSize: '26px',
          }}
        >
          {title}
        </h2>
        <h3
          css={{
            position: 'absolute',
            top: '95%',
            left: '50%',
            fontSize: '18px',
            width: '30rem',
            lineHeight: '25px',
          }}
        >
          {description}
        </h3>
      </div>
    </div>
  );
}

export default IconDescription;
