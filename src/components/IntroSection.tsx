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
import { introData } from '../data/intro';

export const IntroSection = () => {
  const [showFullText, setShowFullText] = useState(false);
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
                  {introData.texts.map((text, index) => (
                    <div key={index}>{text}</div>
                  ))}
                </div>
              ) : (
                <ReactTypingEffect
                  text={introData.texts}
                  speed={100}
                  eraseSpeed={100}
                  eraseDelay={2000}
                  typingDelay={1000}
                />
              )}
            </div>
          </motion.div>

          <motion.p
            className='text-lg md:text-xl text-gray-600 leading-relaxed space-y-2'
            variants={sectionItemVariants}
          >
            {introData.description.map((text, index) => (
              <span key={index} className={index === 1 ? 'text-blue-600' : ''}>
                {text}
              </span>
            ))}
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
                href={`mailto:${introData.contacts.email}`}
                className='flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group'
              >
                <MdEmail className='text-xl text-blue-500 group-hover:text-blue-600' />
                <span className='text-sm'>{introData.contacts.email}</span>
              </a>
              <a
                href={`tel:${introData.contacts.phone}`}
                className='flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group'
              >
                <MdPhone className='text-xl text-green-500 group-hover:text-green-600' />
                <span className='text-sm'>{introData.contacts.phone}</span>
              </a>
              <div className='flex flex-col gap-3'>
                <a
                  href={introData.contacts.github}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group'
                >
                  <FaGithub className='text-xl text-gray-700 group-hover:text-gray-800' />
                  <span className='text-sm'>{introData.contacts.github}</span>
                </a>
                <a
                  href={introData.contacts.linkedin}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group'
                >
                  <FaLinkedin className='text-xl text-blue-600 group-hover:text-blue-700' />
                  <span className='text-sm'>{introData.contacts.linkedin}</span>
                </a>
                <a
                  href={introData.contacts.velog}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group'
                >
                  <SiVelog className='text-xl text-green-600 group-hover:text-green-700' />
                  <span className='text-sm'>{introData.contacts.velog}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
