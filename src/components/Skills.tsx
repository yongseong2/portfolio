'use client';

import { coreSkills, skillGroups } from '../data/skills';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';

export const Skills = () => (
  <Section
    id='skills'
    tone='grey'
    eyebrow='Skills'
    title='이렇게 일합니다'
    description='도구 자체보다, 도구로 어떤 문제를 풀었는지를 기준으로 정리했습니다.'
  >
    <ul className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4'>
      {coreSkills.map(({ name, icon: Icon, color, description }, index) => (
        <li key={name}>
          <Reveal
            delay={(index % 4) * 0.06}
            className='print-avoid-break flex h-full flex-col rounded-3xl bg-white p-6'
          >
            <span className='flex h-11 w-11 items-center justify-center rounded-2xl bg-grey-50'>
              <Icon className='h-[22px] w-[22px]' style={{ color }} aria-hidden />
            </span>
            <p className='mt-4 text-[17px] font-bold text-grey-900'>{name}</p>
            <p className='mt-2 text-[14px] leading-relaxed text-grey-600'>{description}</p>
          </Reveal>
        </li>
      ))}
    </ul>

    <Reveal className='print-avoid-break mt-6 rounded-3xl bg-white p-6 md:mt-8 md:p-8'>
      <h3 className='text-[17px] font-bold text-grey-900'>다뤄본 기술</h3>
      <dl className='mt-5 divide-y divide-grey-100'>
        {skillGroups.map((group) => (
          <div key={group.label} className='flex flex-col gap-2 py-3.5 md:flex-row md:items-center md:gap-6'>
            <dt className='w-44 shrink-0 text-[14px] font-semibold text-grey-500'>{group.label}</dt>
            <dd className='flex flex-wrap gap-1.5'>
              {group.items.map((item) => (
                <span
                  key={item}
                  className='rounded-full bg-grey-100 px-3 py-1 text-[14px] font-medium text-grey-700'
                >
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Reveal>
  </Section>
);
