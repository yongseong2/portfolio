/** @jsxImportSource @emotion/react */
import { Global } from '@emotion/react';
import globalStyles from './libs/design/GlobalStyles';

import { FollowMouse } from './libs/common/FollowMouse';
import { AppRouter } from './router/AppRouter';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Global styles={globalStyles} />
        <FollowMouse />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
