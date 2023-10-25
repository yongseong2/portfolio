/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import colors from '../../../libs/design/colors';
import { Spacing } from '../../../libs/common/Spacing';
import { ViewCount } from '../../../libs/common/ViewCount';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '../../../libs/Icons/MenuIcon';

export function MainNav() {
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
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        backgroundColor: 'transparent',
        color: colors.white,
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        zIndex: 1,
      }}
    >
      <ul
        css={{
          display: 'flex',
          justifyContent: 'start',
          listStyleType: 'none',
          alignItems: 'center',
          color: colors.backgroundDark,
        }}
      >
        <li>
          <ViewCount />
        </li>
      </ul>

      <ul
        css={{
          display: 'flex',
          justifyContent: 'flex-end',
          listStyleType: 'none',
          alignItems: 'center',
          '@media (max-width: 768px)': {
            display: 'none',
          },
        }}
      >
        <li>
          <Link to='about-me' spy={true} smooth={true} duration={500}>
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
            offset={1.05}
            spy={true}
            smooth={true}
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
        <MenuIcon fill={colors.black} />
      </div>
      {menuOpen && (
        <div
          css={{
            position: 'absolute',
            top: '100%',
            right: 0,
            backgroundColor: colors.barckgroundGrey,
            borderBottomLeftRadius: '0.5rem',
            borderBottomRightRadius: '0.5rem',
            boxShadow: '3px 3px 3px gray',
            color: colors.black,
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
                offset={1.05}
                spy={true}
                smooth={true}
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
              <RouterLink onClick={() => setMenuOpen(false)} to={'/contact-me'}>
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
  );
}
