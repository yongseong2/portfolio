import clsx from 'clsx';
import { HiOutlineMapPin, HiOutlineQueueList, HiOutlineSparkles } from 'react-icons/hi2';
import type { SideProject } from '../../data/projects';

export const ProjectCover = ({
  project,
  featured = false,
}: {
  project: SideProject;
  featured?: boolean;
}) => {
  const { cover } = project;

  if (cover.type === 'mobile') {
    return (
      <div
        className={clsx(
          'absolute inset-0 flex justify-center gap-3 overflow-hidden px-6 md:gap-4',
          featured ? 'items-start pt-10 md:items-center md:pt-0' : 'items-start pt-10 md:pt-12'
        )}
      >
        {cover.images.map((src, index) => (
          <img
            key={src}
            src={src}
            alt=''
            loading='lazy'
            decoding='async'
            className={clsx(
              'rounded-[16px] shadow-lift ring-1 ring-black/5 transition-transform duration-700 ease-out md:rounded-[20px]',
              featured ? 'w-[27%] max-w-[148px] md:w-[30%] md:max-w-[176px]' : 'w-[27%] max-w-[148px]',
              index === 1
                ? 'translate-y-0 group-hover:-translate-y-2'
                : 'translate-y-6 group-hover:translate-y-3'
            )}
          />
        ))}
      </div>
    );
  }

  if (cover.type === 'desktop') {
    return (
      <div className='absolute inset-0 flex items-start justify-center overflow-hidden px-6 pt-10 md:px-10 md:pt-12'>
        <div className='w-full translate-y-2 overflow-hidden rounded-xl bg-white shadow-lift ring-1 ring-black/5 transition-transform duration-700 ease-out group-hover:-translate-y-1'>
          <div className='flex gap-1.5 border-b border-grey-100 px-3 py-2.5' aria-hidden>
            <span className='h-2.5 w-2.5 rounded-full bg-[#ff5f57]' />
            <span className='h-2.5 w-2.5 rounded-full bg-[#febc2e]' />
            <span className='h-2.5 w-2.5 rounded-full bg-[#28c840]' />
          </div>
          <img
            src={cover.image}
            alt=''
            loading='lazy'
            decoding='async'
            className='block aspect-[16/10] w-full object-cover object-top'
          />
        </div>
      </div>
    );
  }

  return (
    <div className='absolute inset-0 overflow-hidden' aria-hidden>
      <div className='absolute -right-16 -top-16 h-64 w-64 rounded-full bg-blue-200/60 blur-3xl transition-transform duration-700 group-hover:scale-110' />
      <div className='absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-[#b8f0d8]/70 blur-3xl transition-transform duration-700 group-hover:scale-110' />
      <div className='relative flex h-full flex-col items-center justify-center gap-3'>
        {FEATURE_CHIPS.map(({ icon: Icon, label, offset }) => (
          <span
            key={label}
            className={clsx(
              'inline-flex items-center gap-2.5 rounded-2xl bg-white/90 px-4 py-3 text-[15px] font-semibold text-grey-800 shadow-card backdrop-blur transition-transform duration-700 ease-out md:text-[16px]',
              offset
            )}
          >
            <span className='flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-500'>
              <Icon className='h-[18px] w-[18px]' />
            </span>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

const FEATURE_CHIPS = [
  { icon: HiOutlineMapPin, label: '계곡 지도 탐색', offset: '-translate-x-10 group-hover:-translate-x-12' },
  { icon: HiOutlineSparkles, label: 'AI 테마 추천', offset: 'translate-x-8 group-hover:translate-x-10' },
  { icon: HiOutlineQueueList, label: '여행 일정 Funnel', offset: '-translate-x-4 group-hover:-translate-x-6' },
];
