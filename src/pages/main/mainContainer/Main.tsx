/** @jsxImportSource @emotion/react */
import mainData from '../../../data/mainData';
import { Element } from 'react-scroll';
import { MainNav } from './MainNav';

function Main() {
  return (
    <div
      css={{
        position: 'relative', // 이 부분을 추가합니다.
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
            backgroundImage: 'url(/Image/mainBackground.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            padding: '4rem',
          }}
        >
          <div
            css={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              width: '50%',
              height: '100%',
            }}
          >
            <div>
              <div className='title1'>
                <h1>{mainData.title1}</h1>
              </div>
              <div css={{ marginTop: '1rem' }} className='title2'>
                <h1>{mainData.title2}</h1>
              </div>
            </div>
          </div>
          <div
            css={{
              display: 'flex',
              justifyContent: 'center',
              width: '50%',
              alignItems: 'flex-end',
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
