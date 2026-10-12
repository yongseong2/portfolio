import clsx from 'clsx';
import { HiCheck } from 'react-icons/hi2';
import { displayUrl } from '../../data/profile';
import type { SideProject } from '../../data/projects';

// Everything the modal shows, laid out for paper. Hidden on screen, so its lazy images never load there.
export const ProjectPrintDetails = ({ project }: { project: SideProject }) => {
  const described = project.gallery.filter((image) => image.points && image.points.length > 0);
  const landscape = project.cover.type === 'desktop';

  return (
    <div className='hidden border-t border-grey-200 px-10 pb-10 pt-8 print:block'>
      <div className='grid grid-cols-[1fr_280px] gap-12'>
        <div>
          <h4 className='text-[14px] font-semibold text-grey-500'>주요 구현</h4>
          <ul className='mt-3 space-y-2.5'>
            {project.highlights.map((highlight) => (
              <li key={highlight} className='flex gap-2.5 text-[16px] leading-relaxed text-grey-800'>
                <HiCheck className='mt-1 h-4 w-4 shrink-0 text-blue-500' aria-hidden />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <dl className='space-y-4 text-[15px]'>
          <div>
            <dt className='text-[13px] font-semibold text-grey-500'>기술 스택</dt>
            <dd className='mt-1 leading-relaxed text-grey-800'>{project.stack.join(' · ')}</dd>
          </div>
          <div>
            <dt className='text-[13px] font-semibold text-grey-500'>링크</dt>
            {project.links.map((link) => (
              <dd key={link.href} className='mt-1 text-grey-800'>
                <span className='font-semibold'>{link.label}</span>{' '}
                <a href={link.href} className='break-all text-blue-600'>
                  {displayUrl(link.href)}
                </a>
              </dd>
            ))}
          </div>
        </dl>
      </div>

      {described.length > 0 && (
        <div className='mt-8'>
          <h4 className='print-keep-with-next text-[14px] font-semibold text-grey-500'>화면별 구현 내용</h4>
          <div className={clsx('mt-4 grid gap-x-5 gap-y-6', landscape ? 'grid-cols-3' : 'grid-cols-5')}>
            {described.map((image) => (
              <figure
                key={image.src}
                className={clsx('print-avoid-break', image.wide && !landscape && 'col-span-3')}
              >
                <div
                  className={clsx(
                    'flex items-center justify-center rounded-2xl bg-grey-100 p-3',
                    landscape ? 'h-[190px]' : 'h-[240px]'
                  )}
                >
                  <img
                    src={image.src}
                    alt={`${project.title} — ${image.title}`}
                    loading='lazy'
                    className='max-h-full max-w-full rounded-lg object-contain'
                  />
                </div>
                <figcaption className='mt-2.5'>
                  <p className='text-[15px] font-bold text-grey-900'>{image.title}</p>
                  {image.points?.map((point) => (
                    <p key={point} className='mt-1 text-[14px] leading-snug text-grey-600'>
                      {point}
                    </p>
                  ))}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
