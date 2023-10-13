/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import colors from '../design/colors';
import { Spacing } from './Spacing';
import { Link } from 'react-scroll';
import { keyframes } from '@emotion/react';
import { ViewCount } from './ViewCount';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '../Icons/MenuIcon';

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
`;

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      css={{
        background: colors.navBlack,
        color: colors.white,
        padding: '1rem',
      }}
    >
      <div
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          css={{
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
          }}
        >
          <ViewCount />
          <Link
            to='home'
            spy={true}
            smooth={true}
            offset={-46.05}
            duration={500}
          >
            <img
              width={'7%'}
              height={'7%'}
              src={`${process.env.PUBLIC_URL}/Image/arrowUp.svg`}
              css={{
                cursor: 'pointer',
                position: 'fixed',
                bottom: '5%',
                right: '5%',
                animation: `${bounce} 2s infinite`,
              }}
              alt='arrow'
            />
          </Link>
        </div>
        <ul
          css={{
            display: 'flex',
            justifyContent: 'end',
            listStyleType: 'none',
            alignItems: 'center',
            '@media (max-width: 768px)': {
              display: 'none',
            },
          }}
        >
          <li>
            <Link
              to='about-me'
              spy={true}
              smooth={true}
              offset={-46.05}
              duration={500}
            >
              <h3
                css={{
                  fontSize: '1rem',
                  cursor: 'pointer',
                }}
              >
                About me
              </h3>
            </Link>
          </li>
          <Spacing rem='3' dir='h' />
          <li>
            <Link
              to='portfolio'
              spy={true}
              smooth={true}
              offset={-45}
              duration={500}
            >
              <h3
                css={{
                  fontSize: '1rem',
                  cursor: 'pointer',
                }}
              >
                Portfolio
              </h3>
            </Link>
          </li>
          <Spacing rem='3' dir='h' />
          <li>
            <RouterLink to={'/contact-me'}>
              <h3
                css={{
                  fontSize: '1rem',
                }}
              >
                Contact me
              </h3>
            </RouterLink>
          </li>
          <Spacing rem='1' dir='h' />
        </ul>
        <div
          onClick={() => setMenuOpen(!menuOpen)}
          css={{
            display: 'none',
            listStyleType: 'none',
            '@media (max-width: 768px)': {
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            },
          }}
        >
          <MenuIcon fill={colors.white} />
        </div>
        {menuOpen && (
          <div
            css={{
              position: 'absolute',
              top: '100%',
              right: 0,
              backgroundColor: '#1D1D1D',
              borderBottomLeftRadius: '0.5rem',
              borderBottomRightRadius: '0.5rem',
              color: colors.white,
              boxShadow: '3px 3px 3px gray',
              zIndex: 2,
              '@media (max-width: 768px)': {
                width: '100%',
              },
            }}
          >
            <ul
              css={{
                listStyleType: 'none',
                padding: 0,
                margin: 0,
                textAlign: 'center',
              }}
            >
              <Spacing rem='0.5' />
              <li>
                <Link
                  onClick={() => setMenuOpen(false)}
                  to='about-me'
                  spy={true}
                  smooth={true}
                  offset={-46.05}
                  duration={500}
                >
                  <h3
                    css={{
                      fontSize: '1rem',
                      cursor: 'pointer',
                    }}
                  >
                    About me
                  </h3>
                </Link>
              </li>
              <Spacing rem='0.5' />
              <li>
                <Link
                  onClick={() => setMenuOpen(false)}
                  to='portfolio'
                  spy={true}
                  smooth={true}
                  offset={-46.05}
                  duration={500}
                >
                  <h3
                    css={{
                      fontSize: '1rem',
                      cursor: 'pointer',
                    }}
                  >
                    Portfolio
                  </h3>
                </Link>
              </li>
              <Spacing rem='0.5' />
              <li>
                <RouterLink
                  onClick={() => setMenuOpen(false)}
                  to={'/contact-me'}
                >
                  <h3
                    css={{
                      fontSize: '1rem',
                    }}
                  >
                    Contact me
                  </h3>
                </RouterLink>
              </li>
              <Spacing rem='0.5' />
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
