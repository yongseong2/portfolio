/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Spacing } from '../../../libs/common/Spacing';
import colors from '../../../libs/design/colors';
import { ProjectDetail } from './ProjectDetail';

interface Props {
  category: string;
  title: string;
  description: string;
  github: string;
  notion: string;
  img: string;
  date: string;
  markdown?: string;
}

function Project({
  img,
  category,
  title,
  description,
  github,
  notion,
  date,
  markdown,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
        height: '30rem',
        background: isHovered
          ? `linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), url(${process.env.PUBLIC_URL}/Image/portfolioImg/${img}) center center / cover no-repeat lightgray`
          : `linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), url(${process.env.PUBLIC_URL}/Image/portfolioImg/${img}) center center / cover no-repeat lightgray`,
        color: colors.white,
        margin: '50px',
        borderRadius: '1rem',
        '@media (max-width: 768px)': {
          width: '80%',
          height: '20rem',
        },
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
            fontSize: 'calc(15px + 0.5vw)',
          }}
        >
          {category}
        </b>
        <Spacing rem='1' />
        <h3
          css={{
            fontSize: 'calc(15px + 1vw)',
          }}
        >
          {title}
        </h3>
        <Spacing rem='1' />
        <b
          css={{
            fontSize: 'calc(10px + 0.5vw)',
          }}
        >
          {description}
        </b>
        <Spacing rem='0.5' />
        <p
          css={{
            fontSize: 'calc(10px + 0.5vw)',
          }}
        >
          {date}
        </p>
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
        {github !== '' && (
          <a
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            href={github}
            target='_blank'
            rel='noopener noreferrer'
            css={{
              width: '120px',
              textAlign: 'center',
              borderLeft: '4px solid white',
              borderRight: '4px solid white',
              fontSize: 'calc(10px + 0.2vw)',
            }}
          >
            <h2>Github</h2>
          </a>
        )}
        <div
          onClick={(e) => {
            e.preventDefault();
            setIsModalOpen(true);
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          rel='noopener noreferrer'
          css={{
            width: '120px',
            textAlign: 'center',
            marginLeft: '10px',
            borderLeft: '4px solid white',
            borderRight: '4px solid white',
            fontSize: 'calc(10px + 0.2vw)',
          }}
        >
          <h2>Detail</h2>
        </div>
      </div>
      <ProjectDetail
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        markdown={markdown}
      />
    </div>
  );
}

export default Project;
