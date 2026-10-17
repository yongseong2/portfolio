'use client';

import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { profile } from '../../data/profile';
import { useNow } from '../../hooks/useNow';

const socialLinks = [
  { label: 'GitHub', href: profile.contacts.github, icon: FaGithub },
  { label: 'LinkedIn', href: profile.contacts.linkedin, icon: FaLinkedin },
];

export const BlogFooter = () => {
  const now = useNow();

  return (
    <footer className='border-t border-grey-100'>
      <div className='mx-auto flex max-w-content flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8'>
        <div>
          <Link href='/blog' className='text-[16px] font-bold tracking-tight text-grey-900'>
            seongyong2<span className='text-blue-500'>.blog</span>
          </Link>
          <p className='mt-1 text-[14px] text-grey-500'>
            © {now.getFullYear()} {profile.nameEn}
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <Link
            href='/'
            className='inline-flex h-10 items-center rounded-full bg-grey-100 px-4 text-[14px] font-semibold text-grey-700 transition hover:bg-grey-200'
          >
            포트폴리오
          </Link>
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={label}
              className='flex h-10 w-10 items-center justify-center rounded-full bg-grey-100 text-grey-700 transition hover:bg-grey-200'
            >
              <Icon className='h-[18px] w-[18px]' />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
