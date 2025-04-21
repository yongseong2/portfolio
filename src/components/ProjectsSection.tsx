import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projects } from '../data/projects';

export const ProjectsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className='min-h-screen w-full relative z-10'>
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial='hidden'
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.h2
          className='text-4xl font-bold mb-24 text-blue-800 text-center'
          variants={itemVariants}
        >
          프로젝트
        </motion.h2>

        <div className='space-y-40'>
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className='relative flex flex-col lg:flex-row gap-8 lg:gap-16 mb-24 last:mb-0'
            >
              {/* 왼쪽 컨텐츠 */}
              <div className='lg:w-3/5 space-y-6 lg:space-y-8'>
                <div>
                  <h3 className='text-3xl lg:text-4xl font-bold text-blue-800 mb-2 lg:mb-3'>
                    {project.title}
                  </h3>
                  <p className='text-lg lg:text-xl text-gray-600 mb-4 lg:mb-6'>
                    {project.period}
                  </p>
                  <p className='text-xl lg:text-2xl text-gray-700 leading-relaxed'>
                    {project.description}
                  </p>
                  {project.award && (
                    <p className='text-lg lg:text-xl text-blue-600 font-medium mt-4'>
                      {project.award}
                    </p>
                  )}
                </div>

                {project.team && (
                  <div>
                    <h4 className='text-xl lg:text-2xl font-semibold text-blue-800 mb-2 lg:mb-3'>
                      팀 구성
                    </h4>
                    <p className='text-base lg:text-lg text-gray-700'>
                      {project.team}
                    </p>
                  </div>
                )}

                <div>
                  <h4 className='text-xl lg:text-2xl font-semibold text-blue-800 mb-2 lg:mb-3'>
                    기술 스택
                  </h4>
                  <div className='flex flex-wrap gap-2'>
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className='px-3 py-1.5 lg:px-4 lg:py-2 bg-blue-100 text-blue-700 rounded-full text-base lg:text-lg'
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className='text-xl lg:text-2xl font-semibold text-blue-800 mb-2 lg:mb-3'>
                    담당 역할
                  </h4>
                  <ul className='list-disc list-inside space-y-1.5 lg:space-y-2'>
                    {project.role.map((role, index) => (
                      <li
                        key={index}
                        className='text-base lg:text-lg text-gray-700'
                      >
                        {role}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className='text-xl lg:text-2xl font-semibold text-blue-800 mb-2 lg:mb-3'>
                    링크
                  </h4>
                  <div className='flex flex-wrap gap-4 lg:gap-6'>
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2 text-base lg:text-lg'
                      >
                        <span>🔗</span> GitHub
                      </a>
                    )}
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2 text-base lg:text-lg'
                      >
                        <span>🌐</span> 배포 링크
                      </a>
                    )}
                    {project.links.video && (
                      <a
                        href={project.links.video}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2 text-base lg:text-lg'
                      >
                        <span>📺</span> 영상
                      </a>
                    )}
                    {project.links.review &&
                      project.links.review.map((review, index) => (
                        <a
                          key={index}
                          href={review}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2 text-base lg:text-lg'
                        >
                          <span>📝</span> 후기 {index + 1}
                        </a>
                      ))}
                  </div>
                </div>
              </div>

              {/* 오른쪽 이미지 */}
              {project.images && (
                <div className='lg:w-2/5 relative'>
                  <div className='flex flex-col gap-6'>
                    {project.images.slice(0, 2).map((image, imgIndex) => (
                      <div
                        key={imgIndex}
                        className={`relative ${
                          imgIndex === 0
                            ? 'lg:transform lg:translate-x-12'
                            : 'lg:-translate-x-4 lg:translate-y-4'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${project.title} 스크린샷 ${imgIndex + 1}`}
                          className='w-full h-auto max-h-[500px] object-contain'
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
