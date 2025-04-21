import { ReactNode } from 'react';
import clsx from 'clsx';
import { create } from 'zustand';

interface NavStore {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

export const useNavStore = create<NavStore>((set) => ({
  isExpanded: true,
  setIsExpanded: (expanded) => set({ isExpanded: expanded }),
}));

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  intro?: boolean;
}

export const SectionLayout = ({
  children,
  intro = false,
  ...props
}: LayoutProps) => {
  const isExpanded = useNavStore((state) => state.isExpanded);

  return (
    <section
      className={clsx(
        'relative flex flex-col min-h-screen',
        intro ? 'pt-24 md:pt-16 pb-24' : 'py-24',
        'px-cp-sm sm:px-cp-md lg:px-cp',
        'transition-all duration-300',
        isExpanded ? 'md:ml-64' : 'md:ml-14'
      )}
      {...props}
    >
      {children}
    </section>
  );
};
