import { IntroSection } from './components/IntroSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceEducationSection } from './components/ExperienceEducationSection';
import Navbar from './components/Navbar';
import { SectionLayout } from './components/SectionLayout';
import { Contact } from './components/Contact';

function App() {
  return (
    <div className='relative min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 overflow-x-hidden'>
      {/* 네비게이션 바 */}
      <Navbar />
      {/* 컨텐츠 */}
      <main className='relative z-10'>
        <SectionLayout id='intro' intro>
          <IntroSection />
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
