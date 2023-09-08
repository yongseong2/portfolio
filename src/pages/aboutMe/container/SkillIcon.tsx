// SkillIcon.tsx
/** @jsxImportSource @emotion/react */
import React from 'react';
import { Spacing } from '../../../libs/common/Spacing';

interface SkillIconProps {
  IconComponent: React.FC;
  label: string;
}

export const SkillIcon: React.FC<SkillIconProps> = ({
  IconComponent,
  label,
}) => (
  <div
    css={{
      display: 'flex',
      width: '300px',
      justifyContent: 'center',
      marginTop: '2rem',
    }}
  >
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <IconComponent />
      <Spacing rem='0.5' />
      <div
        css={{
          textAlign: 'center',
        }}
      >
        <p
          css={{
            fontSize: '22px',
          }}
        >
          {label}
        </p>
      </div>
    </div>
  </div>
);
