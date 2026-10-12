import clsx from 'clsx';
import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { useState } from 'react';
import { profile } from '../data/profile';
import { useActiveSection } from '../hooks/useActiveSection';
import { PdfButton } from './ui/PdfButton';

const NAV_ITEMS = [
  { id: 'experience', label: '경력' },
  { id: 'projects', label: '프로젝트' },
  { id: 'skills', label: '기술' },
  { id: 'background', label: '수상·학력' },
];

const NAV_IDS = NAV_ITEMS.map((item) => item.id);

export const Header = () => {
  const activeId = useActiveSection(NAV_IDS);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 8));

  const navLinks = (variant: 'desktop' | 'mobile') =>
    NAV_ITEMS.map((item) => {
      const active = activeId === item.id;
      return (
        <a
          key={item.id}
          href={`#${item.id}`}
          aria-current={active ? 'true' : undefined}
          className={clsx(
            'relative shrink-0 rounded-full px-3.5 py-1.5 text-[15px] font-medium transition-colors duration-200',
            active ? 'text-grey-900' : 'text-grey-600 hover:text-grey-900'
          )}
        >
          {active && (
            <motion.span
              layoutId={`nav-pill-${variant}`}
              className='absolute inset-0 -z-10 rounded-full bg-grey-100'
              transition={{ type: 'spring', stiffness: 420, damping: 36 }}
            />
          )}
          {item.label}
        </a>
      );
    });

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-40 border-b bg-white/80 backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300 print:hidden',
        scrolled ? 'border-grey-200/80' : 'border-transparent'
      )}
    >
      <div className='mx-auto flex h-14 max-w-content items-center justify-between gap-4 px-5 md:h-16 md:px-8'>
        <a
          href='#top'
          className='text-[18px] font-bold tracking-tight text-grey-900'
          aria-label='맨 위로'
        >
          {profile.name}
          <span className='ml-1.5 text-[14px] font-semibold text-grey-500'>
            Frontend
          </span>
        </a>

        <nav aria-label='섹션 이동' className='isolate hidden items-center gap-0.5 md:flex'>
          {navLinks('desktop')}
        </nav>

        <PdfButton
          label='PDF 저장'
          className='inline-flex h-9 items-center gap-1.5 rounded-full bg-blue-500 px-4 text-[14px] font-semibold text-white transition hover:bg-blue-600 active:scale-95'
          iconClassName='h-4 w-4'
        />
      </div>

      <nav
        aria-label='섹션 이동'
        className='no-scrollbar isolate flex items-center gap-0.5 overflow-x-auto px-3 pb-2 md:hidden'
      >
        {navLinks('mobile')}
      </nav>

      <motion.div
        aria-hidden
        className='absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-blue-500'
        style={{ scaleX: progress }}
      />
    </header>
  );
};
