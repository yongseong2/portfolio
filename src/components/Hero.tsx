import clsx from 'clsx';
import { motion, useReducedMotion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import { SiVelog } from 'react-icons/si';
import { totalCareerMonths } from '../data/experience';
import { displayUrl, profile } from '../data/profile';
import { formatDuration } from '../lib/date';
import { CountUp } from './ui/CountUp';
import { PdfButton } from './ui/PdfButton';
import { EASE_OUT, Reveal } from './ui/Reveal';

const metrics = [
  { value: null, display: formatDuration(totalCareerMonths), label: '프론트엔드 실무 경력' },
  { value: 60, suffix: '%', label: '공통 모듈화로 줄인 연동 공수' },
  { value: 40, suffix: '%', label: '대용량 데이터 렌더링 시간 단축' },
  { value: 5, suffix: '회', label: '공모전·해커톤 수상' },
];

const printContacts = [
  profile.contacts.email,
  profile.contacts.phone,
  displayUrl(profile.contacts.github),
  displayUrl(profile.contacts.velog),
  displayUrl(profile.contacts.portfolio),
];

const iconButtonClass =
  'inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-grey-100 text-grey-800 transition hover:bg-grey-200 active:scale-[0.97]';

export const Hero = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id='top' className='pb-4 pt-32 md:pb-8 md:pt-32 print:!pt-0'>
      <div className='mx-auto max-w-content px-5 md:px-8'>
        <Reveal className='flex items-center gap-3'>
          <img
            src={profile.photo}
            alt=''
            width={48}
            height={48}
            className='h-12 w-12 rounded-full object-cover ring-1 ring-grey-200'
          />
          <div className='leading-tight'>
            <p className='text-[16px] font-bold text-grey-900'>{profile.name}</p>
            <p className='text-[14px] font-medium text-grey-500'>{profile.role}</p>
          </div>
        </Reveal>

        <h1 className='mt-8 text-[38px] font-bold leading-[1.18] tracking-tightest text-grey-900 sm:text-[48px] md:mt-10 md:text-[68px]'>
          {profile.headline.map((line, index) => (
            <span key={line} className='block overflow-hidden pb-[0.08em]'>
              <motion.span
                data-reveal
                className={clsx('block', index === 1 && 'text-blue-500')}
                initial={reduceMotion ? false : { y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.15 + index * 0.1 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <Reveal delay={0.45}>
          <div className='mt-7 max-w-[660px] space-y-4 text-[17px] leading-[1.75] text-grey-600 md:mt-9 md:text-[19px]'>
            {profile.summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className='mt-9 flex flex-wrap items-center gap-2.5 print:hidden'>
            <PdfButton
              label='PDF로 저장하기'
              className='inline-flex h-12 items-center gap-2 rounded-2xl bg-blue-500 px-5 text-[16px] font-semibold text-white transition hover:bg-blue-600 active:scale-[0.97]'
              iconClassName='h-5 w-5'
            />
            <a
              href={`mailto:${profile.contacts.email}`}
              className='inline-flex h-12 items-center gap-2 rounded-2xl bg-grey-100 px-5 text-[16px] font-semibold text-grey-800 transition hover:bg-grey-200 active:scale-[0.97]'
            >
              <HiOutlineEnvelope className='h-5 w-5' aria-hidden />
              메일 보내기
            </a>
            <a
              href={profile.contacts.github}
              target='_blank'
              rel='noopener noreferrer'
              aria-label='GitHub'
              className={iconButtonClass}
            >
              <FaGithub className='h-5 w-5' />
            </a>
            <a
              href={profile.contacts.velog}
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Velog 블로그'
              className={iconButtonClass}
            >
              <SiVelog className='h-[18px] w-[18px]' />
            </a>
          </div>

          <p className='mt-8 hidden text-[16px] font-medium text-grey-700 print:block'>
            {printContacts.map((item, index) => (
              <span key={item}>
                {index > 0 && <span className='mx-2 text-grey-300'>|</span>}
                {item}
              </span>
            ))}
          </p>
        </Reveal>

        <div className='mt-12 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-4 md:gap-4 print:!mt-12'>
          {metrics.map((metric, index) => (
            <Reveal key={metric.label} delay={0.55 + index * 0.08} className='h-full'>
              <div className='print-avoid-break flex h-full flex-col gap-2 rounded-3xl bg-grey-50 p-5 md:p-7'>
                <p className='text-[26px] font-bold tracking-tighter text-grey-900 md:text-[40px]'>
                  {metric.value === null ? (
                    metric.display
                  ) : (
                    <CountUp value={metric.value} suffix={metric.suffix} />
                  )}
                </p>
                <p className='text-[14px] leading-snug text-grey-600 md:text-[15px]'>
                  {metric.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
