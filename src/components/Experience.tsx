'use client';

import clsx from 'clsx';
import { HiArrowUpRight, HiCheck } from 'react-icons/hi2';
import { companies, type Company, type WorkProject } from '../data/experience';
import { useNow } from '../hooks/useNow';
import { formatDuration, formatPeriod, monthsInclusive } from '../lib/date';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';

const ExternalLink = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    className='inline-flex items-center gap-0.5 rounded-full bg-white px-2.5 py-1 text-[13px] font-medium text-grey-700 ring-1 ring-grey-200 transition hover:text-blue-600 hover:ring-blue-200'
  >
    {label}
    <HiArrowUpRight className='h-3 w-3' aria-hidden />
  </a>
);

const ProjectCard = ({ project }: { project: WorkProject }) => (
  <article className='print-avoid-break rounded-3xl bg-grey-50 p-6 md:p-8'>
    <div className='flex flex-wrap items-center gap-x-3 gap-y-2'>
      <h4 className='text-[20px] font-bold tracking-tight text-grey-900 md:text-[22px]'>
        {project.name}
      </h4>
      <span className='text-[14px] font-medium text-grey-500'>{project.period}</span>
      {project.links && (
        <div className='flex flex-wrap gap-1.5 md:ml-auto'>
          {project.links.map((link) => (
            <ExternalLink key={link.href} {...link} />
          ))}
        </div>
      )}
    </div>
    <p className='mt-2 text-[15px] leading-relaxed text-grey-600 md:text-[16px]'>
      {project.summary}
    </p>

    <ul className='mt-5 divide-y divide-grey-200/80 border-t border-grey-200/80'>
      {project.highlights.map((highlight) => (
        <li key={highlight.title} className='py-4'>
          <div className='flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-6'>
            <div className='min-w-0'>
              <p className='text-[16px] font-semibold text-grey-900'>{highlight.title}</p>
              <p className='mt-1 text-[15px] leading-relaxed text-grey-600'>
                {highlight.body}
                {highlight.link && (
                  <a
                    href={highlight.link.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='ml-1.5 inline-flex items-center gap-0.5 font-medium text-blue-500 hover:underline'
                  >
                    {highlight.link.label}
                    <HiArrowUpRight className='h-3 w-3' aria-hidden />
                  </a>
                )}
              </p>
            </div>
            <p className='inline-flex shrink-0 items-center gap-1 self-start rounded-full bg-blue-50 px-3 py-1.5 text-[13px] font-semibold text-blue-600 md:max-w-[240px]'>
              <HiCheck className='h-3.5 w-3.5 shrink-0' aria-hidden />
              {highlight.result}
            </p>
          </div>
        </li>
      ))}
    </ul>

    <ul className='mt-1 flex flex-wrap gap-1.5' aria-label='기술 스택'>
      {project.stack.map((tech) => (
        <li
          key={tech}
          className='rounded-full bg-white px-2.5 py-1 text-[13px] font-medium text-grey-600'
        >
          {tech}
        </li>
      ))}
    </ul>
  </article>
);

const CompanyBlock = ({ company, index }: { company: Company; index: number }) => {
  const months = monthsInclusive(company.start, company.end, useNow());

  return (
    <div
      className={clsx(
        'grid gap-6 md:grid-cols-[260px_1fr] md:gap-12',
        index > 0 && 'mt-12 border-t border-grey-200 pt-12 md:mt-16 md:pt-16 print:!mt-12 print:!pt-12'
      )}
    >
      <Reveal className='self-start md:sticky md:top-28 print:!static'>
        <div className='flex items-center gap-2'>
          <h3 className='text-[24px] font-bold tracking-tight text-grey-900'>{company.name}</h3>
          {!company.end && (
            <span className='rounded-full bg-blue-50 px-2 py-0.5 text-[12px] font-semibold text-blue-600'>
              재직 중
            </span>
          )}
        </div>
        {company.note && (
          <p className='mt-1 text-[14px] font-medium text-grey-500'>{company.note}</p>
        )}
        <p className='mt-4 text-[16px] font-semibold text-grey-800'>{company.role}</p>
        <p className='mt-1 text-[15px] text-grey-600'>
          {formatPeriod(company.start, company.end)}
          <span className='mx-1.5 text-grey-300'>·</span>
          {formatDuration(months)}
        </p>
        <p className='mt-3 text-[15px] leading-relaxed text-grey-600'>{company.description}</p>
      </Reveal>

      <div className='space-y-4'>
        {company.projects.map((project) => (
          <Reveal key={project.name}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export const Experience = () => (
  <Section
    id='experience'
    printNewPage
    eyebrow='Experience'
    title='경력'
    description='결제·환급·보안처럼 실수가 허용되지 않는 도메인에서, 사용자가 겪는 문제를 구조로 풀어왔습니다.'
  >
    <div>
      {companies.map((company, index) => (
        <CompanyBlock key={company.name} company={company} index={index} />
      ))}
    </div>
  </Section>
);
