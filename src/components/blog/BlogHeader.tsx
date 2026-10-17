import clsx from 'clsx';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';
import { HiArrowUpRight } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { useReadingProgress } from '../../hooks/useReadingProgress';

export const BlogHeader = () => {
  const { scrollY } = useScroll();
  const progress = useReadingProgress();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 8));

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-40 border-b bg-white/80 backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300',
        scrolled ? 'border-grey-200/80' : 'border-transparent'
      )}
    >
      <div className='mx-auto flex h-14 max-w-content items-center justify-between px-5 md:h-16 md:px-8'>
        <Link to='/blog' className='text-[18px] font-bold tracking-tight text-grey-900'>
          seongyong2<span className='text-blue-500'>.blog</span>
        </Link>
        <Link
          to='/'
          className='inline-flex h-9 items-center gap-1 rounded-full bg-grey-100 px-4 text-[14px] font-semibold text-grey-800 transition hover:bg-grey-200 active:scale-95'
        >
          포트폴리오
          <HiArrowUpRight className='h-3.5 w-3.5' aria-hidden />
        </Link>
      </div>

      <motion.div
        aria-hidden
        className='absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-blue-500'
        style={{ scaleX: progress }}
      />
    </header>
  );
};
