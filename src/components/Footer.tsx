import clsx from 'clsx';
import { useNavStore } from '../store/useNavStore';

export const Footer = () => {
  const isExpanded = useNavStore((state) => state.isExpanded);

  return (
    <footer
      className={clsx(' text-blue-500', isExpanded ? 'md:ml-64' : 'md:ml-0')}
    >
      <div className='px-cp-sm sm:px-cp-md lg:px-cp py-4'>
        <p className='text-sm opacity-80'>
          © Copyright {new Date().getFullYear()} Kim Seong Yong All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};
