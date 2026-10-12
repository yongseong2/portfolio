import clsx from 'clsx';
import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface SectionProps {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: 'white' | 'grey';
  printNewPage?: boolean;
  children: ReactNode;
}

export const Section = ({
  id,
  eyebrow,
  title,
  description,
  tone = 'white',
  printNewPage = false,
  children,
}: SectionProps) => (
  <section
    id={id}
    aria-labelledby={`${id}-title`}
    // scroll-mt + section padding leaves the heading ~30-40px below the fixed header (≈99px mobile, 65px desktop).
    className={clsx(
      'scroll-mt-16 py-16 md:scroll-mt-2 md:py-24 print:!py-14',
      tone === 'grey' && 'bg-grey-50',
      printNewPage && 'print:break-before-page print:!pt-0'
    )}
  >
    <div className='mx-auto max-w-content px-5 md:px-8'>
      <Reveal className='print-avoid-break print-keep-with-next'>
        <p className='mb-3 text-[15px] font-semibold text-blue-500 md:text-[17px]'>
          {eyebrow}
        </p>
        <h2
          id={`${id}-title`}
          className='text-[30px] font-bold leading-[1.25] tracking-tighter text-grey-900 md:text-[46px]'
        >
          {title}
        </h2>
        {description && (
          <p className='mt-4 max-w-2xl text-[17px] leading-relaxed text-grey-600 md:text-[19px]'>
            {description}
          </p>
        )}
      </Reveal>
      <div className='mt-10 md:mt-12 print:!mt-10'>{children}</div>
    </div>
  </section>
);
