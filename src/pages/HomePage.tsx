import { Background } from '../components/Background';
import { Contact } from '../components/Contact';
import { Experience } from '../components/Experience';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Projects } from '../components/projects/Projects';
import { Skills } from '../components/Skills';
import { usePrintShortcut } from '../lib/print';

export const HomePage = () => {
  usePrintShortcut();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Background />
      </main>
      <Contact />
    </>
  );
};
