/** @jsxImportSource @emotion/react */
import { Global } from '@emotion/react';
import globalStyles from './libs/design/GlobalStyles';
import { AppRouter } from './router/AppRouter';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div>
      <Global styles={globalStyles} />
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
