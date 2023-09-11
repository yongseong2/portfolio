/** @jsxImportSource @emotion/react */
import React from 'react';
import SCSSIcon from '../../../libs/Icons/SCSSIcon';

import { Spacing } from '../../../libs/common/Spacing';
import { SkillIcon } from './SkillIcon';
import StyledComponentsIcon from '../../../libs/Icons/StyledComponentsIcon';

interface Props {
  title: string;
}

export function JustUsed({ title }: Props) {
  const skills = [
    { Icon: SCSSIcon, label: 'SCSS' },
    { Icon: StyledComponentsIcon, label: 'Styled-components' },
  ];

  return (
    <div>
      <div
        css={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <h1
          css={{
            fontSize: '26px',
            lineHeight: '30px',
            justifyContent: 'center',
          }}
        >
          {title}
        </h1>
        <Spacing rem='5' />
      </div>
      <div
        css={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Spacing rem='2' />
        <div
          css={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
            maxWidth: '1200px',
          }}
        >
          {skills.map((skill, index) => (
            <SkillIcon
              key={index}
              IconComponent={skill.Icon}
              label={skill.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
