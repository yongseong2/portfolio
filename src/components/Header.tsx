import clsx from 'clsx';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState, type MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { profile } from '../data/profile';
import { useActiveSection } from '../hooks/useActiveSection';
import { useReadingProgress } from '../hooks/useReadingProgress';
import { NavTabs, type NavItem } from './NavTabs';
import { PdfButton } from './ui/PdfButton';

const SECTION_ITEMS = [
  { id: 'experience', label: '경력' },
  { id: 'projects', label: '프로젝트' },
  { id: 'skills', label: '기술' },
  { id: 'background', label: '수상·학력' },
];

const SECTION_IDS = SECTION_ITEMS.map((item) => item.id);

const NAV_ITEMS: NavItem[] = [
  ...SECTION_ITEMS.map((item) => ({ ...item, to: `/#${item.id}` })),
  { id: 'blog', label: '블로그', to: '/blog' },
];

const smoothScrollTo = (target: Element | null) => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
};

export const Header = () => {
  const { pathname } = useLocation();
  const onHome = pathname === '/';
  const activeId = useActiveSection(SECTION_IDS);
  const { scrollY } = useScroll();
  const progress = useReadingProgress();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 8));

  // On the home page, section links scroll in place instead of navigating.
  const handleItemClick = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (!onHome || id === 'blog') return;
    event.preventDefault();
    smoothScrollTo(document.getElementById(id));
  };

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!onHome) return;
    event.preventDefault();
    smoothScrollTo(document.getElementById('top'));
  };

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-40 border-b bg-white/80 backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300 print:hidden',
        scrolled ? 'border-grey-200/80' : 'border-transparent'
      )}
    >
      <div className='mx-auto grid h-14 max-w-content grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 md:h-16 md:px-8'>
        <Link
          to='/'
          onClick={handleLogoClick}
          className='justify-self-start text-[18px] font-bold tracking-tight text-grey-900'
          aria-label='포트폴리오 맨 위로'
        >
          {profile.name}
          <span className='ml-1.5 text-[14px] font-semibold text-grey-500'>Frontend</span>
        </Link>

        <NavTabs
          items={NAV_ITEMS}
          activeId={activeId}
          onItemClick={handleItemClick}
          className='hidden md:flex'
        />

        <div className='col-start-3 justify-self-end'>
          <PdfButton
            label='PDF 저장'
            className='inline-flex h-9 items-center gap-1.5 rounded-full bg-blue-500 px-4 text-[14px] font-semibold text-white transition hover:bg-blue-600 active:scale-95'
            iconClassName='h-4 w-4'
          />
        </div>
      </div>

      <NavTabs
        items={NAV_ITEMS}
        activeId={activeId}
        onItemClick={handleItemClick}
        className='no-scrollbar flex overflow-x-auto px-3 pb-2 md:hidden'
      />

      <motion.div
        aria-hidden
        className='absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-blue-500'
        style={{ scaleX: progress }}
      />
    </header>
  );
};
