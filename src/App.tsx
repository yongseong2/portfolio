import { MotionConfig } from 'framer-motion';
import { Background } from './components/Background';
import { Contact } from './components/Contact';
import { Experience } from './components/Experience';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Projects } from './components/projects/Projects';
import { Skills } from './components/Skills';
import { usePrintShortcut } from './lib/print';

function App() {
  usePrintShortcut();

  return (
    <MotionConfig reducedMotion='user'>
      <Header />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Background />
      </main>
      <Contact />
    </MotionConfig>
  );
}

export default App;
