import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

export const Header = () => {
  const menuItems = [
    { title: '소개', to: 'intro' },
    { title: '기술', to: 'skills' },
    { title: '프로젝트', to: 'projects' },
    { title: '경험', to: 'experience' },
    { title: '교육', to: 'education' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className='fixed top-0 left-0 right-0 z-50 bg-white dark:bg-primary shadow-lg'
    >
      <nav className='px-4 py-4'>
        <ul className='flex justify-center space-x-8'>
          {menuItems.map((item) => (
            <motion.li
              key={item.to}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={item.to}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className='cursor-pointer text-lg font-medium hover:text-accent'
              >
                {item.title}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
};
