import { motion } from 'framer-motion';

export const AnimatedBackground = () => {
  return (
    <motion.div
      className='fixed inset-0 z-0 bg-gradient-to-r from-white via-blue-50 to-blue-100'
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      style={{
        backgroundSize: '400% 400%',
      }}
      transition={{
        duration: 10,
        ease: 'linear',
        repeat: Infinity,
      }}
    />
  );
};
