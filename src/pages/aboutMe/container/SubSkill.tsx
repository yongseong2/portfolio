// MainSkill.tsx
/** @jsxImportSource @emotion/react */
import React from 'react';
import VueIcon from '../../../libs/Icons/VueIcon';
import ReduxIcon from '../../../libs/Icons/ReduxIcon';
import ReactQueryIcon from '../../../libs/Icons/ReactQueryIcon';
import YarnIcon from '../../../libs/Icons/YarnIcon';
import StoryBookIcon from '../../../libs/Icons/StoryBook';
import ReactIcon from '../../../libs/Icons/ReactIcon';

import EmotionIcon from '../../../libs/Icons/EmotionIcon';
import { Spacing } from '../../../libs/common/Spacing';
import { SkillIcon } from './SkillIcon'; // import your new SkillIcon component

interface Props {
  title: string;
}

export function SubSkill({ title }: Props) {
  const skills = [
    { Icon: ReactIcon, label: 'React Native' },
    { Icon: ReduxIcon, label: 'Redux' },
    { Icon: ReactQueryIcon, label: 'React Query' },
    { Icon: EmotionIcon, label: 'Emotion CSS' },
    { Icon: StoryBookIcon, label: 'StoryBook' },
    { Icon: YarnIcon, label: 'Yarn' },
    { Icon: VueIcon, label: 'Vue' },
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
