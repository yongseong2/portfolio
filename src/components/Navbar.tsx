import { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavStore } from './SectionLayout';
import ReactTypingEffect from 'react-typing-effect';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isExpanded, setIsExpanded } = useNavStore();

  // 스크롤 위치에 따른 활성 섹션 감지
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach((section) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'intro', name: 'Intro' },
    { id: 'career', name: 'Career' },
    { id: 'skills', name: 'Skills' },
    { id: 'projects', name: 'Projects' },
    { id: 'experience', name: 'Experience' },
  ];

  return (
    <>
      {/* 데스크톱 사이드바 */}
      <nav
        className={`hidden md:flex fixed left-0 top-0 h-screen bg-white/80 backdrop-blur-sm text-gray-600 flex-col justify-center shadow-sm z-40 transition-all duration-300 ${
          isExpanded ? 'w-64' : 'w-14'
        }`}
      >
        <div className={`px-8 relative ${!isExpanded && 'px-4'}`}>
          <h1
            className={`text-xl font-bold mb-12 text-gray-800 transition-opacity duration-300 ${
              !isExpanded && 'opacity-0'
            }`}
          >
            <ReactTypingEffect
              text={['npm start', 'Loading...', '<SeongYong />']}
              speed={50}
              eraseSpeed={50}
              typingDelay={1000}
              eraseDelay={2000}
              displayTextRenderer={(text) => {
                return (
                  <span className='typing-effect'>
                    {text.split('').map((char, i) => (
                      <span
                        key={i}
                        style={{
                          animation: 'glitch 0.3s infinite',
                          animationDelay: `${i * 0.1}s`,
                        }}
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                );
              }}
            />
          </h1>
          <div className='space-y-8'>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={handleNavClick(item.id)}
                className={`w-full text-left text-lg font-medium transition-all duration-500 relative group ${
                  activeSection === item.id
                    ? 'text-blue-600 translate-x-2'
                    : 'hover:text-blue-600 hover:translate-x-2'
                } ${!isExpanded && 'opacity-0'}`}
              >
                {item.name}
                <span
                  className={`absolute left-0 -bottom-2 w-full h-0.5 bg-blue-600 transform origin-left transition-transform duration-500 ${
                    activeSection === item.id
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-75'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* 토글 버튼 */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className='absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-all duration-300'
          >
            <IoIosArrowBack
              className={`h-5 w-5 text-gray-600 transition-transform duration-300 ${
                !isExpanded && 'rotate-180'
              }`}
            />
          </button>
        </div>
      </nav>

      {/* 모바일 네비게이션 */}
      <nav className='md:hidden fixed top-0 left-0 w-full z-40 bg-white/80 backdrop-blur-sm shadow-sm'>
        <div className='px-4 py-4 flex justify-between items-center'>
          <h1 className='text-xl font-bold text-gray-800'>{'<SeongYong />'}</h1>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='p-2 text-gray-600 hover:text-blue-600 transition-colors'
          >
            {isMobileMenuOpen ? (
              <HiX className='h-6 w-6' />
            ) : (
              <HiMenu className='h-6 w-6' />
            )}
          </button>
        </div>

        {/* 모바일 메뉴 패널 */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden bg-white/90`}
        >
          <div className='px-4 py-4 space-y-4'>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={handleNavClick(item.id)}
                className={`block w-full text-left text-base font-medium transition-all duration-500 relative group ${
                  activeSection === item.id
                    ? 'text-blue-600 translate-x-2'
                    : 'text-gray-600 hover:text-blue-600 hover:translate-x-2'
                }`}
              >
                {item.name}
                <span
                  className={`absolute left-0 -bottom-2 w-full h-0.5 bg-blue-600 transform origin-left transition-transform duration-500 ${
                    activeSection === item.id
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-75'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
