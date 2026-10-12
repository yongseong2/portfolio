import clsx from 'clsx';
import { awards, certifications, education } from '../data/background';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';

export const Background = () => (
  <Section id='background' printNewPage eyebrow='Awards & Education' title='수상과 학력'>
    <div className='print-avoid-break grid gap-12 md:grid-cols-[1.25fr_1fr] md:gap-16'>
      <Reveal>
        <h3 className='text-[14px] font-semibold text-grey-500'>수상 {awards.length}회</h3>
        <ol className='mt-3 divide-y divide-grey-100 border-y border-grey-100'>
          {awards.map((award) => (
            <li key={award.title} className='flex items-start gap-4 py-5'>
              <span className='w-12 shrink-0 pt-0.5 text-[15px] font-semibold tabular-nums text-grey-400'>
                {award.year}
              </span>
              <div className='min-w-0 flex-1'>
                <p className='flex flex-wrap items-center gap-2 text-[17px] font-semibold text-grey-900'>
                  {award.title}
                  <span
                    className={clsx(
                      'rounded-full px-2 py-0.5 text-[12px] font-semibold',
                      award.rank === '최우수상' ? 'bg-blue-500 text-white' : 'bg-blue-50 text-blue-600'
                    )}
                  >
                    {award.rank}
                  </span>
                </p>
                <p className='mt-1 text-[15px] text-grey-500'>
                  {award.org}
                  <span className='mx-1.5 text-grey-300'>·</span>
                  {award.project}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>

      <div className='space-y-12'>
        <Reveal delay={0.08}>
          <h3 className='text-[14px] font-semibold text-grey-500'>학력 · 교육</h3>
          <ul className='mt-3 divide-y divide-grey-100 border-y border-grey-100'>
            {education.map((item) => (
              <li key={item.title} className='py-5'>
                <p className='text-[17px] font-semibold text-grey-900'>{item.title}</p>
                <p className='mt-1 text-[15px] text-grey-600'>{item.detail}</p>
                <p className='mt-1 text-[14px] tabular-nums text-grey-400'>{item.period}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.12}>
          <h3 className='text-[14px] font-semibold text-grey-500'>자격 · 어학</h3>
          <ul className='mt-3 grid grid-cols-2 gap-2'>
            {certifications.map((item) => (
              <li key={item.title} className='rounded-2xl bg-grey-50 px-4 py-3.5'>
                <p className='text-[15px] font-semibold text-grey-900'>{item.title}</p>
                <p className='mt-0.5 text-[13px] text-grey-500'>{item.org}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  </Section>
);
