/** @jsxImportSource @emotion/react */
import React from 'react';
import { Link } from 'react-scroll';
import colors from '../../../libs/design/colors';
import { Spacing } from '../../../libs/common/Spacing';

export function MainNav() {
  return (
    <div
      css={{
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'transparent',
        color: colors.white,
        padding: '1rem',
        zIndex: 1,
      }}
    >
      <ul
        css={{
          display: 'flex',
          justifyContent: 'end',
          listStyleType: 'none',
          alignItems: 'center',
        }}
      >
        <li>
          <Link to='about-me' spy={true} smooth={true} duration={500}>
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
          <Link to='portfolio' spy={true} smooth={true} duration={500}>
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
  );
}
