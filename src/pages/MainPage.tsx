/** @jsxImportSource @emotion/react */
import { Nav } from '../libs/common/Nav';
import AboutMe from './aboutMe/AboutMe';
import Portfolio from './portfollio/Portfolio';
import useMain from '../libs/hooks/useMain';
import Main from './main/Main';
import { css, keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

function MainPage() {
  const { showNav } = useMain();

  return (
    <div
      css={css`
        animation: ${fadeIn} 1.5s ease-in-out;
      `}
    >
      <Main />
      <div
        css={{
          position: 'relative',
        }}
      >
        {showNav && (
          <div
            css={{
              position: 'sticky',
              top: 0,
              zIndex: 1000,
            }}
          >
            <Nav />
          </div>
        )}

        <AboutMe />
        <Portfolio />
      </div>
    </div>
  );
}

export default MainPage;
