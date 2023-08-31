import { useState, useEffect } from 'react';

const useMain = () => {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const mainPageHeight = window.innerHeight - 46.05; // 100vh를 pixel로 계산
      const scrollY = window.scrollY; // 현재 스크롤 위치

      if (scrollY > mainPageHeight) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { showNav };
};

export default useMain;
