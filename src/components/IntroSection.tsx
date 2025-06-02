import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';
import { SiVelog } from 'react-icons/si';
import {
  sectionContainerVariants,
  sectionItemVariants,
} from '../animations/sectionAnimations';
import { introData } from '../data/intro';
import { BsPersonVcard } from 'react-icons/bs';

export const IntroSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className='flex-1 flex flex-col items-center justify-center relative'>
      <motion.div
        ref={ref}
        variants={sectionContainerVariants}
        initial='hidden'
        animate={inView ? 'visible' : 'hidden'}
        className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-16'
      >
        <motion.div
          className='size-40 sm:size-40 md:size-48 lg:size-52 xl:size-56 flex-shrink-0 transform hover:scale-105 transition-transform duration-300'
          variants={sectionItemVariants}
        >
          <div className='relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl hover:shadow-3xl transition-shadow duration-300'>
            <img
              src='/assets/images/profile.jpg'
              alt='프로필 이미지'
              className='object-cover'
            />
          </div>
        </motion.div>

        <motion.div
          className='w-full md:w-2/3 flex flex-col items-start justify-center space-y-8 md:space-y-10 md:pl-8'
          variants={sectionItemVariants}
        >
          <motion.div
            className='relative text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-gray-800 leading-snug mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent'
            variants={sectionItemVariants}
          >
            <div className='flex flex-col gap-2'>
              {introData.texts.map((text, index) => (
                <div key={index} className='break-words'>
                  {text}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.p
            className='text-lg md:text-xl text-gray-600 leading-relaxed space-y-3 font-light'
            variants={sectionItemVariants}
          >
            {introData.description.map((text, index) => (
              <span
                key={index}
                className={index === 1 ? 'text-blue-600 block' : 'block'}
              >
                {text}
              </span>
            ))}
          </motion.p>

          <motion.div
            variants={sectionItemVariants}
            className='flex flex-col gap-4 mt-8'
          >
            <div className='text-gray-700 font-semibold text-lg mb-2'>
              Contact & Links
            </div>
            <div className='flex flex-col gap-4'>
              <a
                href={`mailto:${introData.contacts.email}`}
                className='flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-all duration-300 transform hover:translate-x-2 group'
              >
                <MdEmail className='text-xl text-blue-500 group-hover:text-blue-600' />
                <span className='text-sm'>
                  Email : {introData.contacts.email}
                </span>
              </a>
              <a
                href={`tel:${introData.contacts.phone}`}
                className='flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-all duration-300 transform hover:translate-x-2 group'
              >
                <MdPhone className='text-xl text-green-500 group-hover:text-green-600' />
                <span className='text-sm'>
                  Phone : {introData.contacts.phone}
                </span>
              </a>
              <div className='flex flex-col gap-4'>
                <a
                  href={introData.contacts.github}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-all duration-300 transform hover:translate-x-2 group'
                >
                  <FaGithub className='text-xl text-gray-700 group-hover:text-gray-800' />
                  <span className='text-sm'>
                    GitHub : {introData.contacts.github}
                  </span>
                </a>
                <a
                  href={introData.contacts.linkedin}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-all duration-300 transform hover:translate-x-2 group'
                >
                  <FaLinkedin className='text-xl text-blue-600 group-hover:text-blue-700' />
                  <span className='text-sm'>
                    LinkedIn : {introData.contacts.linkedin}
                  </span>
                </a>
                <a
                  href={introData.contacts.velog}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-all duration-300 transform hover:translate-x-2 group'
                >
                  <SiVelog className='text-xl text-green-600 group-hover:text-green-700' />
                  <span className='text-sm'>
                    Velog : {introData.contacts.velog}
                  </span>
                </a>
                <a
                  href={introData.contacts.portfolio}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-all duration-300 transform hover:translate-x-2 group'
                >
                  <BsPersonVcard className='text-2xl text-blue-500 group-hover:text-blue-600' />
                  <span className='text-sm'>
                    Portfolio : {introData.contacts.portfolio}
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
