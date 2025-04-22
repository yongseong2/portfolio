import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
}

export const SectionTitle = ({ children }: SectionTitleProps) => {
  return (
    <h2 className='relative text-left text-3xl md:text-4xl lg:text-4xl font-bold leading-normal md:leading-normal lg:leading-normal mb-6 md:mb-8 lg:mb-12 bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent py-2 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-1/2 after:h-[2px] after:bg-gradient-to-r after:from-blue-600 after:to-blue-200'>
      {children}
    </h2>
  );
};
