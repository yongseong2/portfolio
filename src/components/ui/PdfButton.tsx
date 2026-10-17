'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { HiOutlineArrowDownTray } from 'react-icons/hi2';
import { printPortfolio, usePrintPreparing } from '../../lib/print';

interface PdfButtonProps {
  label: string;
  className: string;
  iconClassName: string;
}

export const PdfButton = ({ label, className, iconClassName }: PdfButtonProps) => {
  const preparing = usePrintPreparing();
  const pathname = usePathname();

  // The PDF is the portfolio page only; other pages (e.g. the blog) never print it.
  if (pathname !== '/') return null;

  return (
    <button
      type='button'
      onClick={printPortfolio}
      disabled={preparing}
      aria-busy={preparing}
      className={clsx('disabled:cursor-wait disabled:opacity-80 print:hidden', className)}
    >
      {preparing ? (
        <span
          className={clsx('animate-spin rounded-full border-2 border-current border-t-transparent', iconClassName)}
          aria-hidden
        />
      ) : (
        <HiOutlineArrowDownTray className={iconClassName} aria-hidden />
      )}
      {preparing ? 'PDF 준비 중' : label}
    </button>
  );
};
