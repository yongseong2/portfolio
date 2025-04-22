import { IntroSection } from './components/IntroSection';
import { Career } from './components/Career';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceEducationSection } from './components/ExperienceEducationSection';
import { AnimatedBackground } from './components/AnimatedBackground';
import { useState } from 'react';
import Navbar from './components/Navbar';
import { SectionLayout } from './components/SectionLayout';
import { Contact } from './components/Contact';
import ScrollProgressBar from './components/ScrollProgressBar';
import { Footer } from './components/Footer';
import { PlayingButton } from './components/PlayingButton';

function App() {
  return (
    <div className='relative min-h-screen overflow-x-hidden'>
      <AnimatedBackground />
      <div className='relative z-10'>
        {/* 텍스트 플레이 버튼 */}
        <PlayingButton />
        {/* 스크롤 프로그레스 바 */}
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
          <Footer />

          <Contact />
        </main>
      </div>
    </div>
  );
}

export default App;
