import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiAcademicCap, HiOfficeBuilding } from 'react-icons/hi';

interface Experience {
  category: string;
  title: string;
  period: string;
  description: string;
  details?: string[];
  icon: JSX.Element;
}

export const ExperienceEducationSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const items: Experience[] = [
    {
      category: '경험',
      title: 'SSAFY 9기',
      period: '2023.01 ~ 2023.12',
      description: '삼성청년SW아카데미',
      icon: <HiOfficeBuilding className='text-[#0052CC]' />,
      details: [
        'Python, 자료구조, 알고리즘, JavaScript, Django 등 기초적인 Web 개발 역량 학습 과정',
      ],
    },
    {
      category: '교육',
      title: '서경대학교',
      period: '2016.03 ~ 2021.02',
      description: '산업경영시스템공학 전공',
      icon: <HiAcademicCap className='text-[#4FC08D]' />,
    },
  ];

  // 아이템을 카테고리별로 그룹화
  const groupedItems = items.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, Experience[]>);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <>
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial='hidden'
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.h2
          className='text-4xl font-bold mb-16 text-blue-800 text-center'
          variants={categoryVariants}
        >
          경험 및 교육
        </motion.h2>

        <div className='space-y-16'>
          {Object.entries(groupedItems).map(([category, categoryItems]) => (
            <motion.div
              key={category}
              variants={categoryVariants}
              className='relative'
            >
              <motion.h3
                className='text-2xl font-semibold mb-8 text-blue-700 relative inline-block'
                variants={cardVariants}
              >
                {category}
                <div className='absolute bottom-0 left-0 w-full h-1 bg-blue-200 rounded-full -mb-2'></div>
              </motion.h3>

              <motion.div
                className='grid grid-cols-1 gap-6'
                variants={categoryVariants}
              >
                {categoryItems.map((item, index) => (
                  <motion.div
                    key={`${item.title}-${index}`}
                    variants={cardVariants}
                    className='p-6 bg-white rounded-lg border border-blue-100 shadow-sm
                      hover:shadow-lg hover:border-blue-200 transition-all duration-300 relative hover:z-10
                      backdrop-blur-sm'
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <div className='flex items-center gap-3 mb-4'>
                      <div className='p-2 bg-blue-50 rounded-lg'>
                        {item.icon}
                      </div>
                      <div className='flex-1'>
                        <h4 className='text-xl font-medium text-blue-700'>
                          {item.title}
                        </h4>
                        <p className='text-gray-500 text-sm'>{item.period}</p>
                      </div>
                    </div>
                    <p className='text-gray-700 mb-3'>{item.description}</p>
                    {item.details && (
                      <ul className='space-y-1.5 text-sm text-gray-600'>
                        {item.details.map((detail, index) => (
                          <li key={index} className='flex items-start gap-2'>
                            <span className='w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0' />
                            <span className='break-keep'>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
};
