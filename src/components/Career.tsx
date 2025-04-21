import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiOfficeBuilding } from 'react-icons/hi';
import {
  sectionContainerVariants,
  sectionItemVariants,
  sectionTitleVariants,
} from '../animations/sectionAnimations';
import { careerData } from '../data/career';

const listItemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

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
            className='flex flex-col md:flex-row gap-8 md:gap-16 relative'
          >
            <div className='md:w-1/3 relative'>
              {/* 타임라인 선 */}
              <div className='absolute left-4 top-12 bottom-0 w-0.5 bg-blue-200' />
              {index !== careerData.length - 1 && (
                <div className='absolute left-4 top-12 bottom-[-4rem] w-0.5 bg-blue-200' />
              )}
              {/* 타임라인 원 */}
              <div className='absolute left-2 top-3 w-4 h-4 rounded-full bg-blue-500 border-4 border-blue-100' />

              <div className='pl-12'>
                <div className='flex items-center gap-3 mb-4'>
                  <HiOfficeBuilding className='text-blue-500 text-2xl' />
                  <h3 className='text-2xl font-bold text-gray-800'>
                    {item.title}
                  </h3>
                </div>
                <p className='text-lg text-gray-600 mb-2'>{item.period}</p>
                <p className='text-lg text-gray-700'>{item.description}</p>
              </div>
            </div>

            <div className='md:w-2/3'>
              <ul className='space-y-4'>
                {item.details.map((detail, detailIndex) => (
                  <motion.li
                    key={detailIndex}
                    custom={detailIndex}
                    variants={listItemVariants}
                    initial='hidden'
                    animate={inView ? 'visible' : 'hidden'}
                    className='text-gray-700 flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300 hover:bg-blue-50'
                  >
                    <span className='text-blue-500 text-lg font-bold min-w-[24px]'>
                      •
                    </span>
                    <span className='text-gray-700 leading-relaxed'>
                      {detail}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
