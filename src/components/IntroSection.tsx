import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ReactTypingEffect from 'react-typing-effect';
import { FaPlay, FaStop, FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';
import { SiVelog } from 'react-icons/si';
import { useState } from 'react';
import {
  sectionContainerVariants,
  sectionItemVariants,
} from '../animations/sectionAnimations';

export const IntroSection = () => {
  const [showFullText, setShowFullText] = useState(false);
  const texts = ['안녕하세요', '프론트엔드 개발자 김성용입니다!'];
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className='flex-1 flex flex-col items-center justify-center relative'>
      <button
        onClick={() => setShowFullText(!showFullText)}
        className='fixed top-4 right-4 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors text-white shadow-lg'
      >
        {showFullText ? <FaPlay size={14} /> : <FaStop size={14} />}
      </button>
      <motion.div
        ref={ref}
        variants={sectionContainerVariants}
        initial='hidden'
        animate={inView ? 'visible' : 'hidden'}
        className='w-full relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12'
      >
        <motion.div
          className='w-48 h-48 md:w-64 md:h-64 md:order-2 flex-shrink-0'
          variants={sectionItemVariants}
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
          variants={sectionItemVariants}
        >
          <motion.div
            className='relative text-2xl md:text-4xl lg:text-6xl font-bold text-gray-800 leading-tight mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent'
            variants={sectionItemVariants}
          >
            <div className='flex items-center gap-4'>
              {showFullText ? (
                <div className='flex flex-col gap-2'>
                  {texts.map((text, index) => (
                    <div key={index}>{text}</div>
                  ))}
                </div>
              ) : (
                <ReactTypingEffect
                  text={texts}
                  speed={100}
                  eraseSpeed={100}
                  eraseDelay={2000}
                  typingDelay={1000}
                />
              )}
            </div>
          </motion.div>
          <motion.p className='text-sm md:text-lg text-gray-600 leading-relaxed max-w-2xl flex flex-col gap-2'>
            <span>
              눈에 보이는 페이지에 생동감을 불어넣는 매력에 빠져 프론트엔드
              개발자가 되었습니다.
            </span>
            <span className='text-blue-600'>
              특히, 디자인을 보며 구현 과정에 대해 깊이 고민하는 것을
              좋아합니다.
            </span>
            <span>완벽함이란 없다고 생각하고 있습니다.</span>
            <span>더 나은 방법을 찾으며 고민하는 개발자 김성용입니다.</span>
          </motion.p>
          <motion.div
            variants={sectionItemVariants}
            className='flex flex-col gap-3 mt-6'
          >
            <div className='text-gray-700 font-medium mb-2'>
              Contact & Links
            </div>
            <div className='flex flex-col gap-3'>
              <a
                href='mailto:ancjs369@naver.com'
                className='flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group'
              >
                <MdEmail className='text-xl text-blue-500 group-hover:text-blue-600' />
                <span className='text-sm'>ancjs369@naver.com</span>
              </a>
              <a
                href='tel:010-9380-1663'
                className='flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group'
              >
                <MdPhone className='text-xl text-green-500 group-hover:text-green-600' />
                <span className='text-sm'>010-9380-1663</span>
              </a>
              <div className='flex flex-col gap-3'>
                <a
                  href='https://github.com/yongseong2'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group'
                >
                  <FaGithub className='text-xl text-gray-700 group-hover:text-gray-800' />
                  <span className='text-sm'>github.com/yongseong2</span>
                </a>
                <a
                  href='https://www.linkedin.com/in/seongyong-kim-048a49297'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group'
                >
                  <FaLinkedin className='text-xl text-blue-600 group-hover:text-blue-700' />
                  <span className='text-sm'>
                    linkedin.com/in/seongyong-kim-048a49297
                  </span>
                </a>
                <a
                  href='https://velog.io/@yongseong2/posts'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group'
                >
                  <SiVelog className='text-xl text-green-600 group-hover:text-green-700' />
                  <span className='text-sm'>velog.io/@yongseong2</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
