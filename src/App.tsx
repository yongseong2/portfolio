/** @jsxImportSource @emotion/react */
import { Global } from '@emotion/react';
import globalStyles from './libs/design/GlobalStyles';

import MainPage from './pages/MainPage';

function App() {
  return (
    <div>
      <Global styles={globalStyles} />
      <MainPage />
    </div>
  );
}

export default App;
