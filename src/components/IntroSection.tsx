import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ReactTypingEffect from 'react-typing-effect';

export const IntroSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className='flex-1 flex flex-col items-center justify-center relative'>
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial='hidden'
        animate={inView ? 'visible' : 'hidden'}
        className='w-full relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12'
      >
        <motion.div
          className='w-48 h-48 md:w-64 md:h-64 md:order-2 flex-shrink-0'
          variants={itemVariants}
        >
          <div className='relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl'>
            <img
              src='/assets/images/profile.jpg'
              alt='프로필 이미지'
              className='object-cover'
            />
          </div>
        </motion.div>

        <motion.div
          className='w-full md:w-2/3 md:order-1 flex flex-col items-start justify-center space-y-6 md:space-y-8'
          variants={itemVariants}
        >
          <motion.div
            className='text-xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent'
            variants={itemVariants}
          >
            <ReactTypingEffect
              text={['안녕하세요', '프론트엔드 개발자 김성용입니다.']}
              speed={100}
              eraseSpeed={100}
              eraseDelay={2000}
              typingDelay={1000}
            />
          </motion.div>
          <motion.p className='text-sm md:text-lg text-gray-600 leading-relaxed max-w-2xl'>
            사용자 경험을 중요시하며, 혁신적이고 직관적인 웹 인터페이스를
            구현하는 것을 즐기는 개발자입니다.
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};
