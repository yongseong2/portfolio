'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import type { Heading } from '../../lib/markdown';

const READING_LINE = 120;

// Headings are extracted on the server (see extractHeadings), so the list is part of the prerendered HTML.
export const TableOfContents = ({ headings }: { headings: Heading[] }) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    // The section being read is the last heading that has passed the reading line under the header.
    const updateActive = () => {
      const passed = elements.filter((element) => element.getBoundingClientRect().top <= READING_LINE);
      setActiveId((passed[passed.length - 1] ?? elements[0]).id);
    };
    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    return () => window.removeEventListener('scroll', updateActive);
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label='목차' className='sticky top-28'>
      <p className='text-[13px] font-semibold text-grey-500'>목차</p>
      <ul className='mt-3 space-y-0.5 border-l border-grey-200'>
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={(event) => {
                event.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                history.replaceState(history.state, '', `#${heading.id}`);
              }}
              className={clsx(
                '-ml-px block border-l py-1 text-[14px] leading-snug transition-colors',
                heading.level === 3 ? 'pl-6' : 'pl-3',
                activeId === heading.id
                  ? 'border-blue-500 font-semibold text-blue-600'
                  : 'border-transparent text-grey-500 hover:text-grey-900'
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
