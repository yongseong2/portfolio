import { ReactNode } from 'react';
import clsx from 'clsx';
interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  intro?: boolean;
}

export const SectionLayout = ({
  children,
  intro = false,
  ...props
}: LayoutProps) => {
  return (
    <section
      className={clsx(
        'relative flex flex-col min-h-screen',
        intro ? 'pt-16 pb-24' : 'py-24',
        'px-cp-sm sm:px-cp-md lg:px-cp'
      )}
      {...props}
    >
      {children}
    </section>
  );
};
