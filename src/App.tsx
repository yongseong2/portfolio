import { IntroSection } from './components/IntroSection';
import { Career } from './components/Career';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceEducationSection } from './components/ExperienceEducationSection';

import Navbar from './components/Navbar';
import { SectionLayout } from './components/SectionLayout';
import { Contact } from './components/Contact';
import ScrollProgressBar from './components/ScrollProgressBar';

function App() {
  return (
    <div className='relative min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 overflow-x-hidden'>
      <ScrollProgressBar />
      {/* 네비게이션 바 */}
      <Navbar />
      {/* 컨텐츠 */}
      <main className='relative'>
        <SectionLayout id='intro' intro>
          <IntroSection />
        </SectionLayout>

        <SectionLayout id='career'>
          <Career />
        </SectionLayout>

        <SectionLayout id='skills'>
          <SkillsSection />
        </SectionLayout>

        <SectionLayout id='projects'>
          <ProjectsSection />
        </SectionLayout>

        <SectionLayout id='experience'>
          <ExperienceEducationSection />
        </SectionLayout>

        <Contact />
      </main>
    </div>
  );
}

export default App;
