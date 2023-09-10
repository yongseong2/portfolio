/** @jsxImportSource @emotion/react */
import React from 'react';
import { Spacing } from '../../../libs/common/Spacing';
import colors from '../../../libs/design/colors';

interface Props {
  category: string;
  title: string;
  description: string;
  github: string;
  notion: string;
  img: string;
}

function Project({ img, category, title, description, github, notion }: Props) {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '640px',
        height: '401px',
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.80) 0%, rgba(0, 0, 0, 0.80) 100%),  url(${process.env.PUBLIC_URL}/Image/portfolioImg/${img}), lightgray 50% / cover no-repeat`,
        color: colors.white,
      }}
    >
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <b
          css={{
            fontSize: '10px',
          }}
        >
          {category}
        </b>
        <Spacing rem='1' />
        <h3
          css={{
            fontSize: '25px',
          }}
        >
          {title}
        </h3>
        <Spacing rem='1' />
        <b
          css={{
            fontSize: '10px',
          }}
        >
          {description}
        </b>
      </div>
      <Spacing rem='1' />
      <div
        css={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <a
          href={github}
          css={{
            width: '120px',
            textAlign: 'center',
            borderLeft: '4px solid white',
            borderRight: '4px solid white',
          }}
        >
          <h2>Github</h2>
        </a>
        <Spacing rem='1' dir='h' />
        <a
          href={notion}
          css={{
            width: '120px',
            textAlign: 'center',
            borderLeft: '4px solid white',
            borderRight: '4px solid white',
          }}
        >
          <h2>Notion</h2>
        </a>
      </div>
    </div>
  );
}

export default Project;