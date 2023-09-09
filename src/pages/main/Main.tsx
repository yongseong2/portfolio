/** @jsxImportSource @emotion/react */
import mainData from '../../data/mainData';
import { Element } from 'react-scroll';
import { MainNav } from './container/MainNav';
import { Spacing } from '../../libs/common/Spacing';
import { keyframes } from '@emotion/react';
import { LinkIcon } from './container/LinkIcon';

// import { Footer } from '../../../libs/common/Footer';

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
            height: '100vh',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            paddingLeft: '3.5rem',
          }}
        >
          <div
            css={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              fontSize: '1vw',
            }}
          >
            <div>
              <div
                className='title'
                css={{
                  transform: 'translateX(-100%)',
                  animation: `${slideIn} 1s forwards`,
                  fontSize: '1.5vw',
                }}
              >
                <h1>HELLO!</h1>
              </div>
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
              width: '53%',
              alignItems: 'flex-end',
            }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/Image/profileImg.gif`}
              alt='profileImg'
            />
          </div>
        </div>
      </Element>
      {/* <Footer /> */}
    </div>
  );
}

export default Main;
