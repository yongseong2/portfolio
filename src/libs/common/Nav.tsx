/** @jsxImportSource @emotion/react */
import React from 'react';
import colors from '../design/colors';
import { Spacing } from './Spacing';
import { Link } from 'react-scroll';
import { keyframes } from '@emotion/react';
import { ViewCount } from './ViewCount';

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
              width={'65x'}
              height={'65px'}
              src={`${process.env.PUBLIC_URL}/Image/arrowUp.svg`}
              css={{
                cursor: 'pointer',
                position: 'fixed',
                bottom: 40,
                right: 40,
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
