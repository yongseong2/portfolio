/** @jsxImportSource @emotion/react */
import mainData from '../../data/mainData';
import { Element } from 'react-scroll';
import { MainNav } from './container/MainNav';
import { Spacing } from '../../libs/common/Spacing';
import { keyframes } from '@emotion/react';
import { LinkIcon } from './container/LinkIcon';
import Hello from './container/Hello';

const slideIn = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`;

function Main() {
  return (
    <div
      css={{
        position: 'relative',
      }}
    >
      <Element name='home'>
        <MainNav />
        <div
          className='mainPage'
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundSize: 'cover',
            height: '100vh',
            backgroundPosition: 'center',
            '@media (max-width: 768px)': {
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingInline: '1rem',
            },
          }}
        >
          <div
            css={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              fontSize: '1vw',
              paddingLeft: '5%',
              '@media (max-width: 768px)': {
                fontSize: '8px',
                paddingLeft: '0',
              },
            }}
          >
            <div>
              <Hello />
              <Spacing rem='2.5' />
              <div
                className='title1'
                css={{
                  transform: 'translateX(-100%)',
                  animation: `${slideIn} 1.5s forwards`,
                }}
              >
                <h1>{mainData.title1}</h1>
              </div>
              <Spacing rem='2.5' />
              <div
                className='title2'
                css={{
                  transform: 'translateX(-100%)',
                  animation: `${slideIn} 2s forwards`,
                }}
              >
                <h1>{mainData.title2}</h1>
              </div>
              <Spacing rem='2.5' />

              <div
                css={{
                  display: 'flex',
                  transform: 'translateX(-100%)',
                  animation: `${slideIn} 2.5s forwards`,
                }}
              >
                <LinkIcon
                  href='https://github.com/yongseong2'
                  img={`${process.env.PUBLIC_URL}/Image/github.svg`}
                />
              </div>
            </div>
          </div>
          <div
            css={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              width: '50%',
              '@media (max-width: 768px)': {
                alignItems: 'center',
                width: '100%',
              },
            }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/Image/profileImg.gif`}
              alt='profileImg'
              css={{
                width: '70%',
                '@media (max-width: 768px)': {
                  width: '90%',
                },
              }}
            />
          </div>
        </div>
      </Element>
      {/* <Footer /> */}
    </div>
  );
}

export default Main;
