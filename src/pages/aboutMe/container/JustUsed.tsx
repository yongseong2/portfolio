// MainSkill.tsx
/** @jsxImportSource @emotion/react */
import React from 'react';
import SCSSIcon from '../../../libs/Icons/SCSSIcon';

import { Spacing } from '../../../libs/common/Spacing';
import { SkillIcon } from './SkillIcon'; // import your new SkillIcon component

interface Props {
  title: string;
}

export function JustUsed({ title }: Props) {
  const skills = [{ Icon: SCSSIcon, label: 'SCSS' }];

  return (
    <div>
      <div
        css={{
          display: 'flex',
          justifyContent: 'start',
        }}
      >
        <h1
          css={{
            fontSize: '26px',
            lineHeight: '30px',
            '@media (min-width: 768px)': {
              paddingLeft: '240px',
            },
            '@media (max-width: 768px)': {
              justifyContent: 'center',
            },
          }}
        >
          {title}
        </h1>
        <Spacing rem='2' />
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
