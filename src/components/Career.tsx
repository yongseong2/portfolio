import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiOfficeBuilding } from 'react-icons/hi';
import {
  sectionContainerVariants,
  sectionItemVariants,
  sectionTitleVariants,
} from '../animations/sectionAnimations';
import { careerData } from '../data/career';

export const Career = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      variants={sectionContainerVariants}
      initial='hidden'
      animate={inView ? 'visible' : 'hidden'}
      className='min-h-screen'
    >
      <motion.h2
        className='text-4xl font-bold mb-24 text-blue-800 text-center'
        variants={sectionTitleVariants}
      >
        Career
      </motion.h2>

      <div className='space-y-16'>
        {careerData.map((item, index) => (
          <motion.div
            key={index}
            variants={sectionItemVariants}
            className='flex flex-col md:flex-row gap-8 md:gap-16'
          >
            <div className='md:w-1/3'>
              <div className='flex items-center gap-3 mb-4'>
                <HiOfficeBuilding className='text-blue-500 text-2xl' />
                <h3 className='text-2xl font-bold text-gray-800'>
                  {item.title}
                </h3>
              </div>
              <p className='text-lg text-gray-600 mb-2'>{item.period}</p>
              <p className='text-lg text-gray-700'>{item.description}</p>
            </div>

            <div className='md:w-2/3'>
              <ul className='space-y-3'>
                {item.details.map((detail, detailIndex) => (
                  <li
                    key={detailIndex}
                    className='text-gray-700 flex items-start gap-2'
                  >
                    <span className='text-blue-500 mt-1.5'>•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
