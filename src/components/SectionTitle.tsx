import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  return (
    <h2 className='text-left text-3xl md:text-4xl lg:text-4xl font-bold leading-normal md:leading-normal lg:leading-normal mb-6 md:mb-8 lg:mb-12 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent py-2'>
      {children}
    </h2>
  );
};
