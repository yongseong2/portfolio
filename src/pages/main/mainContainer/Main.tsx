/** @jsxImportSource @emotion/react */
import mainData from '../../../data/mainData';
import { Element } from 'react-scroll';
import { MainNav } from './MainNav';
import { Spacing } from '../../../libs/common/Spacing';
import { keyframes } from '@emotion/react';

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
              fontSize: '0.9vw',
            }}
          >
            <div>
              <div
                className='title1'
                css={{
                  transform: 'translateX(-100%)',
                  animation: `${slideIn} 1s forwards`,
                }}
              >
                <h1>{mainData.title1}</h1>
              </div>
              <Spacing rem='2'></Spacing>
              <div
                className='title2'
                css={{
                  transform: 'translateX(-100%)',
                  animation: `${slideIn} 1.5s forwards`,
                }}
              >
                <h1>{mainData.title2}</h1>
              </div>
            </div>
          </div>
          <div
            css={{
              display: 'flex',
              justifyContent: 'center',
              width: '53%',
              alignItems: 'flex-end',
              // backgroundColor: colors.black,
            }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/Image/profileImg.png`}
              alt='profileImg'
            />
          </div>
        </div>
      </Element>
    </div>
  );
}

export default Main;
