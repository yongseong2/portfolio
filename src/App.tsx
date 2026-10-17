import { MotionConfig } from 'framer-motion';
import { Outlet, ScrollRestoration } from 'react-router-dom';

// ScrollRestoration scrolls before paint: new pages start at the top, `/#section` links land
// on the section, and back/forward restore the previous position.
function App() {
  return (
    <MotionConfig reducedMotion='user'>
      <ScrollRestoration />
      <Outlet />
    </MotionConfig>
  );
}

export default App;
