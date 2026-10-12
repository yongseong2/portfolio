import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { HiArrowRight, HiOutlineTrophy } from 'react-icons/hi2';
import { sideProjects, type SideProject } from '../../data/projects';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';
import { ProjectCover } from './ProjectCover';
import { ProjectModal } from './ProjectModal';
import { ProjectPrintDetails } from './ProjectPrintDetails';

const FEATURED_ID = 'sumbisori';
const VISIBLE_STACK = 4;

const ProjectCard = ({
  project,
  featured = false,
  onOpen,
}: {
  project: SideProject;
  featured?: boolean;
  onOpen: () => void;
}) => {
  const hiddenStack = project.stack.length - VISIBLE_STACK;

  return (
    <article className='group relative flex h-full flex-col overflow-hidden rounded-[28px] bg-grey-50 transition duration-300 focus-within:ring-2 focus-within:ring-blue-500 hover:shadow-lift active:scale-[0.99]'>
      <div
        className={clsx(
          'print-avoid-break flex flex-1 flex-col print:!grid print:!grid-cols-2',
          featured && 'md:grid md:grid-cols-2',
        )}
      >
        <div
          className={clsx(
            'relative overflow-hidden bg-grey-100 print:!order-2 print:!aspect-auto print:!min-h-[340px]',
            featured
              ? 'aspect-[16/11] md:order-2 md:aspect-auto md:min-h-[460px]'
              : 'aspect-[16/11]',
          )}
        >
          <ProjectCover project={project} featured={featured} />
        </div>

        <div
          className={clsx(
            'flex flex-1 flex-col p-6 md:p-8 print:!justify-center print:!p-10',
            featured && 'md:justify-center md:p-12',
          )}
        >
          <p className='inline-flex items-center gap-1 text-[13px] font-semibold text-blue-600'>
            <HiOutlineTrophy className='h-4 w-4' aria-hidden />
            {project.award}
          </p>
          <h3
            className={clsx(
              'mt-2 font-bold tracking-tight text-grey-900',
              featured
                ? 'text-[26px] md:text-[34px]'
                : 'text-[22px] md:text-[24px]',
            )}
          >
            <button
              type='button'
              onClick={onOpen}
              aria-haspopup='dialog'
              className='text-left outline-none after:absolute after:inset-0 after:content-[""]'
            >
              {project.title}
            </button>
          </h3>
          <p className='mt-1 text-[16px] text-grey-600 md:text-[17px]'>
            {project.subtitle}
          </p>
          <p className='mt-2 text-[14px] text-grey-500'>
            {project.period}
            <span className='mx-1.5 text-grey-300'>·</span>
            {project.team}
          </p>

          {featured && (
            <ul className='mt-5 hidden space-y-1.5 md:block print:!hidden'>
              {project.highlights.slice(0, 3).map((highlight) => (
                <li
                  key={highlight}
                  className='flex gap-2 text-[15px] leading-relaxed text-grey-700'
                >
                  <span
                    className='mt-[9px] h-1 w-1 shrink-0 rounded-full bg-grey-400'
                    aria-hidden
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          )}

          <ul className='mt-5 flex flex-wrap gap-1.5' aria-label='기술 스택'>
            {project.stack.slice(0, VISIBLE_STACK).map((tech) => (
              <li
                key={tech}
                className='rounded-full bg-white px-2.5 py-1 text-[13px] font-medium text-grey-600'
              >
                {tech}
              </li>
            ))}
            {hiddenStack > 0 && (
              <li className='rounded-full bg-white px-2.5 py-1 text-[13px] font-medium text-grey-400 print:hidden'>
                +{hiddenStack}
              </li>
            )}
          </ul>

          <span
            className='mt-6 inline-flex items-center gap-1 text-[15px] font-semibold text-blue-500 md:mt-auto md:pt-6 print:hidden'
            aria-hidden
          >
            자세히 보기
            <HiArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
          </span>
        </div>
      </div>

      <ProjectPrintDetails project={project} />
    </article>
  );
};

export const Projects = () => {
  const [selected, setSelected] = useState<SideProject | null>(null);
  const featured = sideProjects.find((project) => project.id === FEATURED_ID)!;
  const others = sideProjects.filter((project) => project.id !== FEATURED_ID);

  return (
    <Section
      id='projects'
      printNewPage
      eyebrow='Projects'
      title='프로젝트'
      description='해커톤과 공모전에서 기획·디자인·백엔드와 함께 빠르게 완성도를 끌어올린 프로젝트입니다. 카드를 누르면 화면과 구현 내용을 볼 수 있어요.'
    >
      <div className='grid gap-4 md:grid-cols-2 md:gap-5 print:!grid-cols-1 print:!gap-8'>
        <Reveal className='md:col-span-2 print:!col-span-1'>
          <ProjectCard
            project={featured}
            featured
            onOpen={() => setSelected(featured)}
          />
        </Reveal>
        {others.map((project, index) => (
          <Reveal
            key={project.id}
            delay={(index % 2) * 0.08}
            className='h-full'
          >
            <ProjectCard
              project={project}
              onOpen={() => setSelected(project)}
            />
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal
            key={selected.id}
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </Section>
  );
};
