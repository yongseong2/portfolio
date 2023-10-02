/** @jsxImportSource @emotion/react */
import React from 'react';
import { Link } from 'react-scroll';
import colors from '../../../libs/design/colors';
import { Spacing } from '../../../libs/common/Spacing';
import { ViewCount } from '../../../libs/common/ViewCount';

export function MainNav() {
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
          <h3
            css={{
              fontSize: '1rem',
              cursor: 'pointer',
              color: colors.backgroundDark,
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
