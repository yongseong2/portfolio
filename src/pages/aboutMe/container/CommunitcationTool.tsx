/** @jsxImportSource @emotion/react */
import React from 'react';
import JiraIcon from '../../../libs/Icons/JiraIcon';
import GitIcon from '../../../libs/Icons/GitIcon';
import GithubIcon from '../../../libs/Icons/GithubIcon';
import FigmaIcon from '../../../libs/Icons/FigmaIcon';

import { Spacing } from '../../../libs/common/Spacing';
import { SkillIcon } from './SkillIcon';

interface Props {
  title: string;
}

export function CommunitcationTool({ title }: Props) {
  const skills = [
    { Icon: FigmaIcon, label: 'Figma' },
    { Icon: JiraIcon, label: 'Jira' },
    { Icon: GitIcon, label: 'Git' },
    { Icon: GithubIcon, label: 'Github' },
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
