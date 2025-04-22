import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projects } from '../data/projects';
import { useState } from 'react';
import { ImageGallery } from './ImageGallery';
import { BsArrowsFullscreen } from 'react-icons/bs';
import {
  sectionContainerVariants,
  sectionItemVariants,
  sectionTitleVariants,
} from '../animations/sectionAnimations';
import clsx from 'clsx';
import { SectionTitle } from './SectionTitle';

export const ProjectsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  const [galleryState, setGalleryState] = useState<{
    isOpen: boolean;
    projectImages: { url: string; description?: string; title?: string }[];
    title: string;
    initialSlide: number;
  }>({
    isOpen: false,
    projectImages: [],
    title: '',
    initialSlide: 0,
  });

  const openGallery = (project: (typeof projects)[0], initialSlide: number) => {
    if (!project.projectImages) return;

    setGalleryState({
      isOpen: true,
      projectImages: project.projectImages,
      title: project.title,
      initialSlide,
    });
  };

  const closeGallery = () => {
    setGalleryState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className='min-h-screen w-full relative'>
      <motion.div
        ref={ref}
        variants={sectionContainerVariants}
        initial='hidden'
        animate={inView ? 'visible' : 'hidden'}
      >
        <SectionTitle>Projects</SectionTitle>

        <div className='space-y-40'>
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={sectionItemVariants}
              className='relative flex flex-col lg:flex-row gap-8 lg:gap-16 mb-24 last:mb-0'
            >
              {/* 왼쪽 컨텐츠 */}
              <div className='lg:w-3/5 space-y-6 lg:space-y-8'>
                <div>
                  <h3 className='text-2xl lg:text-3xl font-bold text-blue-600 mb-2 lg:mb-3 '>
                    {project.title}
                  </h3>
                  <p className='text-lg lg:text-xl text-gray-600 mb-4 lg:mb-6'>
                    {project.period}
                  </p>
                  <p className='text-lg lg:text-xl text-gray-700 leading-relaxed'>
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
                    <h4 className='text-xl lg:text-2xl font-semibold text-blue-600 mb-2 lg:mb-3'>
                      팀 구성
                    </h4>
                    <p className='text-base lg:text-lg text-gray-700 whitespace-pre-line'>
                      {project.team}
                    </p>
                  </div>
                )}

                <div>
                  <h4 className='text-xl lg:text-2xl font-semibold text-blue-600 mb-2 lg:mb-3'>
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
                  <h4 className='text-xl lg:text-2xl font-semibold text-blue-600 mb-2 lg:mb-3'>
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
                  <h4 className='text-xl lg:text-2xl font-semibold text-blue-600 mb-2 lg:mb-3'>
                    링크
                  </h4>
                  <div className='flex flex-col gap-4 lg:gap-6'>
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2 text-base lg:text-lg'
                      >
                        <span>🔗</span> GitHub: {project.links.github}
                      </a>
                    )}
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2 text-base lg:text-lg'
                      >
                        <span>🌐</span> 배포 링크: {project.links.demo}
                      </a>
                    )}
                    {project.links.video && (
                      <a
                        href={project.links.video}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2 text-base lg:text-lg'
                      >
                        <span>📺</span> 영상: {project.links.video}
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
                          <span>📝</span> 후기 {index + 1}: {review}
                        </a>
                      ))}
                  </div>
                </div>
              </div>

              {/* 오른쪽 이미지 */}
              {project.projectImages && project.projectImages.length > 0 && (
                <div className='lg:w-2/5'>
                  <div className='space-y-6'>
                    {project.projectImages
                      .slice(0, 2)
                      .map((image, imgIndex) => (
                        <div
                          key={imgIndex}
                          className={clsx(
                            'relative group',
                            imgIndex === 0
                              ? 'lg:translate-x-12'
                              : 'lg:-translate-x-4 lg:translate-y-4',
                            'cursor-pointer'
                          )}
                        >
                          <div className='relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'>
                            <img
                              src={image.url}
                              alt={`${project.title} 스크린샷 ${imgIndex + 1}`}
                              className='w-full h-auto max-h-[500px] object-contain select-none border border-gray-200/20'
                              onClick={() => openGallery(project, imgIndex)}
                            />
                            <button
                              className='absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110'
                              onClick={(e) => {
                                e.stopPropagation();
                                openGallery(project, imgIndex);
                              }}
                              aria-label='갤러리에서 보기'
                            >
                              <BsArrowsFullscreen className='w-5 h-5' />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
      <ImageGallery
        isOpen={galleryState.isOpen}
        projectImages={galleryState.projectImages}
        title={galleryState.title}
        initialSlide={galleryState.initialSlide}
        onClose={closeGallery}
      />
    </div>
  );
};
