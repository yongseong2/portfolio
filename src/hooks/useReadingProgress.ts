import { useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

// framer-motion's scrollYProgress reports 1 for a page that can't scroll yet (e.g. while a post loads)
// and isn't re-measured when the content grows, so the bar would show full until the first scroll.
export const useReadingProgress = () => {
  const progress = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      progress.set(scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0);
    };
    update();

    window.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(document.documentElement);
    return () => {
      window.removeEventListener('scroll', update);
      observer.disconnect();
    };
  }, [progress]);

  return useSpring(progress, { stiffness: 200, damping: 40, restDelta: 0.001 });
};
