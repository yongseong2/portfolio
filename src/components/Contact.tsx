'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiCheckCircle, HiOutlineDocumentDuplicate } from 'react-icons/hi2';
import { SiVelog } from 'react-icons/si';
import { profile } from '../data/profile';
import { useNow } from '../hooks/useNow';
import { PdfButton } from './ui/PdfButton';
import { Reveal } from './ui/Reveal';

const socialLinks = [
  { label: 'GitHub', href: profile.contacts.github, icon: FaGithub },
  { label: 'Velog', href: profile.contacts.velog, icon: SiVelog },
  { label: 'LinkedIn', href: profile.contacts.linkedin, icon: FaLinkedin },
];

export const Contact = () => {
  const [toastVisible, setToastVisible] = useState(false);
  const now = useNow();

  useEffect(() => {
    if (!toastVisible) return;
    const timer = window.setTimeout(() => setToastVisible(false), 2200);
    return () => window.clearTimeout(timer);
  }, [toastVisible]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.contacts.email);
      setToastVisible(true);
    } catch {
      window.location.href = `mailto:${profile.contacts.email}`;
    }
  };

  return (
    <footer id='contact' className='bg-grey-900 text-white print:hidden'>
      <div className='mx-auto max-w-content px-5 pb-10 pt-16 md:px-8 md:pb-14 md:pt-24'>
        <Reveal>
          <p className='text-[15px] font-semibold text-blue-400 md:text-[17px]'>Contact</p>
          <h2 className='mt-3 text-[32px] font-bold leading-[1.25] tracking-tighter md:text-[52px]'>
            함께 풀어갈 다음 문제를
            <br />
            기다리고 있어요
          </h2>

          <div className='mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap'>
            <button
              type='button'
              onClick={copyEmail}
              className='group inline-flex h-14 items-center justify-between gap-6 rounded-2xl bg-white px-5 text-left text-grey-900 transition hover:bg-grey-100 active:scale-[0.98] sm:justify-start'
            >
              <span>
                <span className='block text-[12px] font-semibold text-grey-500'>이메일 복사</span>
                <span className='block text-[16px] font-semibold'>{profile.contacts.email}</span>
              </span>
              <HiOutlineDocumentDuplicate className='h-5 w-5 text-grey-500 transition group-hover:text-blue-500' aria-hidden />
            </button>
            <a
              href={`tel:${profile.contacts.phone}`}
              className='inline-flex h-14 items-center rounded-2xl bg-white/10 px-5 text-[16px] font-semibold transition hover:bg-white/15 active:scale-[0.98]'
            >
              {profile.contacts.phone}
            </a>
            <PdfButton
              label='포트폴리오 PDF 저장'
              className='inline-flex h-14 items-center gap-2 rounded-2xl bg-blue-500 px-5 text-[16px] font-semibold transition hover:bg-blue-600 active:scale-[0.98]'
              iconClassName='h-5 w-5'
            />
          </div>
        </Reveal>

        <div className='mt-14 flex flex-col-reverse gap-6 border-t border-white/10 pt-8 md:mt-20 md:flex-row md:items-center md:justify-between'>
          <p className='text-[14px] text-grey-500'>
            © {now.getFullYear()} {profile.nameEn}. All rights reserved.
          </p>
          <ul className='flex gap-2'>
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={label}
                  className='flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-grey-200 transition hover:bg-white/20 hover:text-white'
                >
                  <Icon className='h-[18px] w-[18px]' />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className='pointer-events-none fixed inset-x-0 bottom-8 z-50 flex justify-center px-5'
        aria-live='polite'
      >
        <AnimatePresence>
          {toastVisible && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 500, damping: 32 }}
              className='flex items-center gap-2 rounded-2xl bg-grey-800/95 px-5 py-3.5 text-[15px] font-medium text-white shadow-lift backdrop-blur'
            >
              <HiCheckCircle className='h-5 w-5 text-blue-400' aria-hidden />
              이메일 주소를 복사했어요
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </footer>
  );
};
