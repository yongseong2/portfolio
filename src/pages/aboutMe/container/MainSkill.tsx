/** @jsxImportSource @emotion/react */
import React from 'react';
import TypeScriptIcon from '../../../libs/Icons/TypeScripyIcon';
import ReactIcon from '../../../libs/Icons/ReactIcon';
import HTML5Icon from '../../../libs/Icons/HTML5Icon';
import CSS3Icon from '../../../libs/Icons/CSS3Icon';
import JavaScriptIcon from '../../../libs/Icons/JavaScriptIcon';
import { Spacing } from '../../../libs/common/Spacing';
import { SkillIcon } from './SkillIcon';

interface Props {
  title: string;
}

export function MainSkill({ title }: Props) {
  const skills = [
    { Icon: ReactIcon, label: 'React' },
    { Icon: TypeScriptIcon, label: 'TypeScript' },
    { Icon: JavaScriptIcon, label: 'JavaScript' },
    { Icon: HTML5Icon, label: 'HTML5' },
    { Icon: CSS3Icon, label: 'CSS3' },
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
