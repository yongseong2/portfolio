/** @jsxImportSource @emotion/react */
import { Nav } from '../libs/common/Nav';
import AboutMe from './aboutMe/AboutMe';
import PortfolioPage from './portfollio/Portfolio';
import useMain from '../libs/hooks/useMain';
import Main from './main/Main';

function MainPage() {
  const { showNav } = useMain();

  return (
    <div>
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
        <PortfolioPage />
      </div>
    </div>
  );
}

export default MainPage;
