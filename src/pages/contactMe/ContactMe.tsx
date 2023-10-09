/** @jsxImportSource @emotion/react */
import React from 'react';
import { css, keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export function ContactMe() {
  const navigation = useNavigate();
  const contactData = [
    'Name: Kim Seong Yong',
    'Email: ancjs369@naver.com',
    'Phone: 010-9380-1663',
  ];

  const pasteText = async (text: string) => {
    if (text === 'Email: ancjs369@naver.com') {
      await navigator.clipboard.writeText('ancjs369@naver.com');
      alert('이메일이 복사되었습니다');
    } else if (text === 'Phone: 010-9380-1663') {
      await navigator.clipboard.writeText(text);
      alert('전화번호가 복사되었습니다');
    }
  };

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        animation: `${fadeIn} 1.5s ease-in-out`,
        fontFamily: 'SedgwickAve',
        fontSize: '4.5vw',
      }}
    >
      <img
        onClick={() => navigation('/portfolio')}
        css={{
          position: 'fixed',
          top: '0',
          right: '0',
          width: '6%',
          height: '6%',
          margin: '20px',
        }}
        src={`${process.env.PUBLIC_URL}/icons/close.svg`}
      />
      {contactData.map((text, index) => (
        <div
          onClick={() => pasteText(text)}
          key={index}
          css={{
            position: 'relative',
            height: 'auto',
            marginBottom: index < 2 ? '15vh' : undefined,
            '&:hover img': {
              opacity: 1,
            },
          }}
        >
          {text}
          <img
            css={{
              position: 'absolute',
              width: '100%',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0,
              transition: 'opacity 0.3s ease-in-out',
            }}
            src={`${process.env.PUBLIC_URL}/Image/scratch.png`}
            alt='scratch'
          />
        </div>
      ))}
    </div>
  );
}
