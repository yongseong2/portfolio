/** @jsxImportSource @emotion/react */
import React from 'react';
import { keyframes } from '@emotion/react';

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-25px); }
`;

function Hello() {
  const text = 'HELLO!';

  return (
    <div>
      <div className='title'>
        <h1>
          {Array.from(text).map((char, index) => (
            <span
              key={index}
              css={{
                display: 'inline-block',
                animation: `${bounce} 1.5s infinite`,
                fontSize: '3vw',
                animationDelay: `${index * 0.1}s`,
                '@media (max-width: 768px)': {
                  fontSize: '35px',
                },
              }}
            >
              {char}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
}

export default Hello;
