import clsx from 'clsx';
import { useEffect, useState, type RefObject } from 'react';

const READING_LINE = 120;

interface Heading {
  id: string;
  text: string;
  level: number;
}

// Built from the rendered article so ids always match what rehype-slug produced.
export const TableOfContents = ({
  articleRef,
  contentKey,
}: {
  articleRef: RefObject<HTMLElement>;
  contentKey: string;
}) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = Array.from(articleRef.current?.querySelectorAll<HTMLElement>('h2[id], h3[id]') ?? []);
    setHeadings(
      elements.map((element) => ({
        id: element.id,
        text: element.textContent ?? '',
        level: Number(element.tagName[1]),
      }))
    );
    if (elements.length === 0) return;

    // The section being read is the last heading that has passed the reading line under the header.
    const updateActive = () => {
      const passed = elements.filter((element) => element.getBoundingClientRect().top <= READING_LINE);
      setActiveId((passed[passed.length - 1] ?? elements[0]).id);
    };
    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    return () => window.removeEventListener('scroll', updateActive);
  }, [articleRef, contentKey]);

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
