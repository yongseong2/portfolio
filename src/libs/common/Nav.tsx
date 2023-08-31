/** @jsxImportSource @emotion/react */
import React from 'react';
import colors from '../design/colors';
import { Spacing } from './Spacing';
import { Link } from 'react-scroll';

export function Nav() {
  return (
    <div
      css={{
        backgroundColor: colors.navBlack,
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
          <Link
            to='home'
            spy={true}
            smooth={true}
            offset={-46.05}
            duration={500}
          >
            <h3
              css={{
                fontSize: '1rem',
              }}
            >
              Home
            </h3>
          </Link>
        </div>
        <ul
          css={{
            display: 'flex',
            justifyContent: 'end',
            listStyleType: 'none',
            alignItems: 'center',
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
              offset={-46.05}
              duration={500}
            >
              <h3
                css={{
                  fontSize: '1rem',
                }}
              >
                Portfolio
              </h3>
            </Link>
          </li>
          <Spacing rem='3' dir='h' />
          <li>
            <h3
              css={{
                fontSize: '1rem',
              }}
            >
              Contact me
            </h3>
          </li>
          <Spacing rem='3' dir='h' />
        </ul>
      </div>
    </div>
  );
}
