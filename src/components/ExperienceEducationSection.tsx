import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiAcademicCap, HiOfficeBuilding } from 'react-icons/hi';
import { FaSchool } from 'react-icons/fa';
import {
  sectionContainerVariants,
  sectionItemVariants,
  sectionTitleVariants,
} from '../animations/sectionAnimations';
import { experienceData } from '../data/experience';
import { SectionTitle } from './SectionTitle';

export const ExperienceEducationSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // 아이콘 매핑
  const getIcon = (category: string) => {
    switch (category) {
      case '개발 교육':
        return <HiOfficeBuilding className='text-blue-500' />;
      case '대학교':
        return <HiAcademicCap className='text-green-500' />;
      case '고등학교':
        return <FaSchool className='text-yellow-500' />;
      default:
        return <HiOfficeBuilding className='text-blue-500' />;
    }
  };

  // 아이템을 카테고리별로 그룹화
  const groupedItems = experienceData.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({ ...item, icon: getIcon(category) });
    return acc;
  }, {} as Record<string, ((typeof experienceData)[0] & { icon: JSX.Element })[]>);

  return (
    <motion.div
      ref={ref}
      variants={sectionContainerVariants}
      initial='hidden'
      animate={inView ? 'visible' : 'hidden'}
    >
      <SectionTitle>Experience & Education</SectionTitle>

      <div className='space-y-16'>
        {Object.entries(groupedItems).map(([category, items]) => (
          <motion.div key={category} variants={sectionItemVariants}>
            <h3 className='text-2xl font-semibold mb-8 text-blue-700 relative inline-block'>
              {category}
              <div className='absolute bottom-0 left-0 w-full h-1 bg-blue-200 rounded-full -mb-2'></div>
            </h3>

            <div className='grid grid-cols-1 gap-6'>
              {items.map((item, index) => (
                <motion.div
                  key={`${item.title}-${index}`}
                  variants={sectionItemVariants}
                  className='p-6 bg-white rounded-lg border border-blue-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300'
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='p-2 bg-blue-50 rounded-lg'>{item.icon}</div>
                    <div>
                      <h4 className='text-xl font-medium text-blue-700'>
                        {item.title}
                      </h4>
                      <p className='text-gray-500'>{item.period}</p>
                    </div>
                  </div>
                  <p className='text-gray-700'>{item.description}</p>
                  {item.details && (
                    <ul className='mt-4 space-y-2'>
                      {item.details.map((detail, detailIndex) => (
                        <li
                          key={detailIndex}
                          className='text-gray-600 flex items-start gap-2'
                        >
                          <span className='w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0' />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
