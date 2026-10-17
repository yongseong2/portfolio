import clsx from 'clsx';
import { useLayoutEffect, useRef, useState, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';

export interface NavItem {
  id: string;
  label: string;
  to: string;
}

interface PillBox {
  left: number;
  top: number;
  width: number;
  height: number;
  animate: boolean;
}

// The pill is measured against the nav itself (offsetLeft), so page scroll and route changes
// can never offset it — it only slides sideways between tabs.
export const NavTabs = ({
  items,
  activeId,
  onItemClick,
  className,
}: {
  items: NavItem[];
  activeId: string | null;
  onItemClick: (id: string) => (event: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}) => {
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());
  const [pill, setPill] = useState<PillBox | null>(null);

  useLayoutEffect(() => {
    // 'navigate' slides to a newly active tab; 'measure' just follows size changes and keeps the current mode.
    const place = (reason: 'navigate' | 'measure') => {
      const nav = navRef.current;
      const link = activeId ? linkRefs.current.get(activeId) : undefined;
      if (!nav || !link) {
        setPill(null);
        return;
      }
      // Sub-pixel rects (offsetLeft rounds); scroll offsets keep it right in the scrollable mobile nav.
      const navBox = nav.getBoundingClientRect();
      const linkBox = link.getBoundingClientRect();
      setPill((previous) => ({
        left: linkBox.left - navBox.left + nav.scrollLeft - nav.clientLeft,
        top: linkBox.top - navBox.top + nav.scrollTop - nav.clientTop,
        width: linkBox.width,
        height: linkBox.height,
        animate: reason === 'navigate' ? previous !== null : previous?.animate ?? false,
      }));
    };
    place('navigate');

    // Tabs change size when the web font swaps in or the viewport changes.
    const observer = new ResizeObserver(() => place('measure'));
    linkRefs.current.forEach((link) => observer.observe(link));
    return () => observer.disconnect();
  }, [activeId]);

  return (
    <nav ref={navRef} aria-label='페이지 이동' className={clsx('relative isolate items-center gap-0.5', className)}>
      <span
        aria-hidden
        className={clsx(
          'absolute left-0 top-0 -z-10 rounded-full bg-grey-100',
          pill?.animate && 'transition-[transform,width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
          !pill && 'opacity-0'
        )}
        style={
          pill
            ? { width: pill.width, height: pill.height, transform: `translate(${pill.left}px, ${pill.top}px)` }
            : undefined
        }
      />
      {items.map((item) => {
        const active = activeId === item.id;
        return (
          <Link
            key={item.id}
            ref={(element) => {
              if (element) linkRefs.current.set(item.id, element);
              else linkRefs.current.delete(item.id);
            }}
            to={item.to}
            onClick={onItemClick(item.id)}
            aria-current={active ? 'true' : undefined}
            className={clsx(
              'shrink-0 rounded-full px-3.5 py-1.5 text-[15px] font-medium transition-colors duration-200',
              active ? 'text-grey-900' : 'text-grey-600 hover:text-grey-900'
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};
