import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiAcademicCap, HiOfficeBuilding } from 'react-icons/hi';
import {
  sectionContainerVariants,
  sectionItemVariants,
  sectionTitleVariants,
} from '../animations/sectionAnimations';
import { FaSchool } from 'react-icons/fa';

interface Career {
  category: string;
  title: string;
  period: string;
  description: string;
  details?: string[];
  icon: JSX.Element;
}

export const Career = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const items: Career[] = [
    {
      category: '프론트엔드 개발',
      title: '클라우드가드',
      period: '2023.12 ~ 재직중',
      description: '클라우드 보안 솔루션 프론트엔드 개발',
      icon: <HiOfficeBuilding className='text-blue-500' />,
      details: [
        'React 기반 CSPM(Cloud Security Posture Management) 솔루션 레거시 코드 리팩토링 작업',
        'Webpack 빌드 시스템에서 Vite 마이그레이션',
        'Context API 최적화',
        'KT Cloud 보안 점검 서비스 개발',
        '보안 항목 예외처리 기능 개발',
        'Cypress를 활용한 E2E 테스트 환경 구축',
        '프론트 github actions + Code Deploy 배포 파이프라인 구축',
        'Turborepo를 활용한 모노레포 환경 구축',
        'Next js 기반 CSPM 솔루션 관리자 페이지 개발',
        '실시간 로그 차트 구현',
        'Ip 접근제어 기능 구현',
        '계정 별 컴플라이언스 관리 기능 구현',
        'Typespec을 활용한 API 명세 이전 작업',
        '프론트엔드 온프레미스(On-premise) 환경 구축',
      ],
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
  }, {} as Record<string, Career[]>);

  return (
    <>
      <motion.div
        ref={ref}
        variants={sectionContainerVariants}
        initial='hidden'
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.h2
          className='text-4xl font-bold mb-16 text-blue-800 text-center'
          variants={sectionTitleVariants}
        >
          Career
        </motion.h2>

        <div className='space-y-16'>
          {Object.entries(groupedItems).map(([category, categoryItems]) => (
            <motion.div
              key={category}
              variants={sectionItemVariants}
              className='relative'
            >
              <motion.h3
                className='text-2xl font-semibold mb-8 text-blue-700 relative inline-block'
                variants={sectionItemVariants}
              >
                {category}
                <div className='absolute bottom-0 left-0 w-full h-1 bg-blue-200 rounded-full -mb-2'></div>
              </motion.h3>

              <motion.div
                className='grid grid-cols-1 gap-6'
                variants={sectionItemVariants}
              >
                {categoryItems.map((item, index) => (
                  <motion.div
                    key={`${item.title}-${index}`}
                    variants={sectionItemVariants}
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
