'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect, useEffectEvent, useRef, useState } from 'react';
import {
  HiArrowUpRight,
  HiCheck,
  HiChevronLeft,
  HiChevronRight,
  HiOutlineTrophy,
  HiXMark,
} from 'react-icons/hi2';
import type { Swiper as SwiperInstance } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import type { SideProject } from '../../data/projects';
import { EASE_OUT } from '../ui/Reveal';

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const useDialogBehavior = (onClose: () => void) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const handleClose = useEffectEvent(onClose);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.documentElement.style;
    document.documentElement.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.documentElement.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, []);

  return { panelRef, closeRef };
};

const Gallery = ({ project }: { project: SideProject }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const active = project.gallery[activeIndex];
  const total = project.gallery.length;

  return (
    <div>
      <div className='relative bg-grey-100 md:mx-8 md:rounded-[20px]'>
        <Swiper
          onSwiper={setSwiper}
          onSlideChange={(instance) => setActiveIndex(instance.activeIndex)}
          spaceBetween={16}
          className='h-[46vh] max-h-[520px] min-h-[300px]'
        >
          {project.gallery.map((image, index) => (
            <SwiperSlide key={image.src} className='!flex !h-full items-center justify-center p-5 md:p-8'>
              <img
                src={image.src}
                alt={`${project.title} — ${image.title}`}
                loading={index < 2 ? 'eager' : 'lazy'}
                className='max-h-full max-w-full rounded-xl object-contain shadow-card'
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type='button'
          onClick={() => swiper?.slidePrev()}
          disabled={activeIndex === 0}
          aria-label='이전 이미지'
          className='absolute left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-grey-800 shadow-card transition hover:bg-white disabled:opacity-0 md:flex'
        >
          <HiChevronLeft className='h-5 w-5' />
        </button>
        <button
          type='button'
          onClick={() => swiper?.slideNext()}
          disabled={activeIndex === total - 1}
          aria-label='다음 이미지'
          className='absolute right-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-grey-800 shadow-card transition hover:bg-white disabled:opacity-0 md:flex'
        >
          <HiChevronRight className='h-5 w-5' />
        </button>
        <span className='absolute bottom-3 right-3 z-10 rounded-full bg-grey-900/70 px-2.5 py-1 text-[12px] font-semibold tabular-nums text-white'>
          {activeIndex + 1} / {total}
        </span>
      </div>

      <div className='no-scrollbar mt-2 flex gap-2 overflow-x-auto px-5 py-1 md:px-8' role='tablist' aria-label='이미지 선택'>
        {project.gallery.map((image, index) => (
          <button
            key={image.src}
            type='button'
            role='tab'
            aria-selected={index === activeIndex}
            aria-label={image.title}
            onClick={() => swiper?.slideTo(index)}
            className={clsx(
              'h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-grey-100 ring-2 transition',
              index === activeIndex ? 'ring-blue-500' : 'ring-transparent opacity-60 hover:opacity-100'
            )}
          >
            <img src={image.src} alt='' loading='lazy' className='h-full w-full object-cover object-top' />
          </button>
        ))}
      </div>

      <div className='px-5 pt-5 md:px-8' aria-live='polite'>
        <p className='text-[17px] font-bold text-grey-900'>{active.title}</p>
        {active.points && (
          <ul className='mt-2 space-y-1.5'>
            {active.points.map((point) => (
              <li key={point} className='flex gap-2 text-[15px] leading-relaxed text-grey-600'>
                <span className='mt-[9px] h-1 w-1 shrink-0 rounded-full bg-grey-400' aria-hidden />
                {point}
              </li>
            ))}
          </ul>
        )}
        {active.link && (
          <a
            href={active.link.href}
            target='_blank'
            rel='noopener noreferrer'
            className='mt-2 inline-flex items-center gap-0.5 text-[15px] font-medium text-blue-500 hover:underline'
          >
            {active.link.label}
            <HiArrowUpRight className='h-3.5 w-3.5' aria-hidden />
          </a>
        )}
      </div>
    </div>
  );
};

export const ProjectModal = ({
  project,
  onClose,
}: {
  project: SideProject;
  onClose: () => void;
}) => {
  const { panelRef, closeRef } = useDialogBehavior(onClose);
  const titleId = `${project.id}-dialog-title`;

  return (
    <div className='fixed inset-0 z-50 flex items-end justify-center md:items-center md:p-6 print:hidden'>
      <motion.div
        className='absolute inset-0 bg-grey-900/50 backdrop-blur-sm'
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      />

      <motion.div
        ref={panelRef}
        role='dialog'
        aria-modal='true'
        aria-labelledby={titleId}
        className='relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[28px] bg-white shadow-lift md:max-h-[88vh] md:max-w-[920px] md:rounded-[28px]'
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 32 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
      >
        <div className='flex items-start justify-between gap-4 px-5 pb-4 pt-6 md:px-8 md:pt-8'>
          <div>
            <p className='inline-flex items-center gap-1 text-[13px] font-semibold text-blue-600'>
              <HiOutlineTrophy className='h-4 w-4' aria-hidden />
              {project.award}
            </p>
            <h3 id={titleId} className='mt-1 text-[24px] font-bold tracking-tight text-grey-900 md:text-[28px]'>
              {project.title}
            </h3>
            <p className='mt-0.5 text-[16px] text-grey-600'>{project.subtitle}</p>
          </div>
          <button
            ref={closeRef}
            type='button'
            onClick={onClose}
            aria-label='닫기'
            className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-grey-100 text-grey-700 transition hover:bg-grey-200 active:scale-95'
          >
            <HiXMark className='h-5 w-5' />
          </button>
        </div>

        <div className='overflow-y-auto overscroll-contain pb-8'>
          {project.gallery.length > 0 && <Gallery project={project} />}

          <div className='mt-8 grid gap-8 px-5 md:grid-cols-[1fr_240px] md:px-8'>
            <div>
              <h4 className='text-[14px] font-semibold text-grey-500'>주요 구현</h4>
              <ul className='mt-3 space-y-3'>
                {project.highlights.map((highlight) => (
                  <li key={highlight} className='flex gap-2.5 text-[15px] leading-relaxed text-grey-800 md:text-[16px]'>
                    <HiCheck className='mt-1 h-4 w-4 shrink-0 text-blue-500' aria-hidden />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div className='space-y-5'>
              <dl className='space-y-3 text-[15px]'>
                <div>
                  <dt className='text-[13px] font-semibold text-grey-500'>기간</dt>
                  <dd className='mt-0.5 text-grey-800'>{project.period}</dd>
                </div>
                <div>
                  <dt className='text-[13px] font-semibold text-grey-500'>팀 구성</dt>
                  <dd className='mt-0.5 text-grey-800'>{project.team}</dd>
                </div>
                <div>
                  <dt className='text-[13px] font-semibold text-grey-500'>수상</dt>
                  <dd className='mt-0.5 text-grey-800'>
                    {project.award}
                    <span className='block text-[13px] text-grey-500'>{project.awardOrg}</span>
                  </dd>
                </div>
              </dl>

              <ul className='flex flex-wrap gap-1.5' aria-label='기술 스택'>
                {project.stack.map((tech) => (
                  <li key={tech} className='rounded-full bg-grey-100 px-2.5 py-1 text-[13px] font-medium text-grey-700'>
                    {tech}
                  </li>
                ))}
              </ul>

              <div className='flex flex-col gap-2'>
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex h-11 items-center justify-between rounded-xl bg-grey-100 px-4 text-[15px] font-semibold text-grey-800 transition hover:bg-grey-200 active:scale-[0.98]'
                  >
                    {link.label}
                    <HiArrowUpRight className='h-4 w-4' aria-hidden />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
