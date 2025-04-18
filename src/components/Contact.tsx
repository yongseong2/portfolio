import { motion } from 'framer-motion';
import { MdEmail, MdPhone } from 'react-icons/md';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiVelog } from 'react-icons/si';
import { IoIosArrowBack } from 'react-icons/io';
import { useState } from 'react';

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
};

const containerVariants = {
  open: {
    x: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  closed: {
    x: 'calc(100% + 1rem)',
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
};

export const Contact = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='fixed bottom-8 right-8 z-30'>
      <motion.div
        className='relative flex gap-4'
        variants={containerVariants}
        animate={isOpen ? 'open' : 'closed'}
        initial='open'
      >
        <button
          className='absolute right-full top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-l-xl shadow-lg hover:bg-white/90 transition-colors'
          onClick={() => setIsOpen(!isOpen)}
        >
          <IoIosArrowBack
            className={`text-gray-600 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>

        <motion.div
          className='floating-card bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow'
          variants={itemVariants}
        >
          <div className='flex items-center gap-4'>
            <a
              href='mailto:ancjs369@naver.com'
              className='flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group'
            >
              <MdEmail className='text-2xl text-blue-500 group-hover:text-blue-600' />
              <span className='text-sm sr-only sm:not-sr-only sm:inline'>
                ancjs369@naver.com
              </span>
            </a>
            <a
              href='tel:010-9380-1663'
              className='flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group'
            >
              <MdPhone className='text-2xl text-green-500 group-hover:text-green-600' />
              <span className='text-sm sr-only sm:not-sr-only sm:inline'>
                010-9380-1663
              </span>
            </a>
            <div className='flex items-center gap-4'>
              <a
                href='https://github.com/yongseong2'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group'
              >
                <FaGithub className='text-2xl text-gray-700 group-hover:text-gray-800' />
              </a>
              <a
                href='https://www.linkedin.com/in/seongyong-kim-048a49297'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group'
              >
                <FaLinkedin className='text-2xl text-blue-600 group-hover:text-blue-700' />
              </a>
              <a
                href='https://velog.io/@yongseong2/posts'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group'
              >
                <SiVelog className='text-2xl text-green-600 group-hover:text-green-700' />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
