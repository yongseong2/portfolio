/** @jsxImportSource @emotion/react */
import { Global } from '@emotion/react';
import globalStyles from './libs/design/GlobalStyles';

import MainPage from './pages/MainPage';
import { FollowMouse } from './libs/common/FollowMouse';

function App() {
  return (
    <div>
      <Global styles={globalStyles} />
      <MainPage />
      <FollowMouse />
    </div>
  );
}

export default App;
