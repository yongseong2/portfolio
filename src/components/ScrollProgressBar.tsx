import { useEffect, useState } from 'react';

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress);

    // 초기 progress 설정
    updateScrollProgress();

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className='fixed top-0 left-0 w-full h-1 z-50'>
      <div
        className='h-full bg-blue-500'
        style={{ width: `${scrollProgress}%`, transition: 'width 0.1s' }}
      />
    </div>
  );
};

export default ScrollProgressBar;
