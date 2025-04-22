import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skills, Skill } from '../data/skills';
import {
  sectionContainerVariants,
  sectionItemVariants,
  sectionTitleVariants,
} from '../animations/sectionAnimations';
import { SectionTitle } from './SectionTitle';
import { Markdown } from './Markdown';

export const SkillsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // 스킬을 카테고리별로 그룹화
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <motion.div
      ref={ref}
      variants={sectionContainerVariants}
      initial='hidden'
      animate={inView ? 'visible' : 'hidden'}
    >
      <SectionTitle>Skills</SectionTitle>

      <div className='space-y-16'>
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
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
              className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              variants={sectionItemVariants}
            >
              {categorySkills.map((skill, index) => (
                <motion.div
                  key={`${skill.name}-${index}`}
                  variants={sectionItemVariants}
                  className='p-6 bg-white rounded-lg border border-blue-100 shadow-sm
                      hover:shadow-lg hover:border-blue-200 transition-all duration-300 relative 
                      backdrop-blur-sm'
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='p-2 bg-blue-50 rounded-lg'>
                      {skill.icon}
                    </div>
                    <h4 className='text-xl font-medium text-blue-700'>
                      {skill.name}
                    </h4>
                  </div>
                  <Markdown className='text-sm'>{skill.description}</Markdown>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
