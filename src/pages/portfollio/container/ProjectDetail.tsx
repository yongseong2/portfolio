/** @jsxImportSource @emotion/react */
import React from 'react';
import { MarkdownRenderer } from '../../../markdown/MarkdownRenders';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  markdown?: string;
}

export function ProjectDetail({ isOpen, onClose, markdown }: Props) {
  if (!isOpen) return null;

  return (
    <div
      css={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      }}
    >
      <div
        css={{
          width: '70%',
          height: '80%',
          '@media (max-width: 768px)': {
            width: '100%',
            height: '100%',
            marginTop: '8rem',
          },
          overflowY: 'scroll',
          background: 'white',
          padding: '40px',
          borderRadius: '10px',
          position: 'relative',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'rgba(0, 0, 0, 0.8)',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '4px',
          },
        }}
      >
        <MarkdownRenderer content={markdown ? markdown : '정보가없어요'} />
      </div>
      <img
        css={{
          position: 'fixed',
          top: '15%',
          right: '19%',
          transform: 'translateY(-50%) translateX(-50%)',
          cursor: 'pointer',
          '@media (max-width: 768px)': {
            top: '15%',
            right: '8%',
          },
        }}
        onClick={onClose}
        src={`${process.env.PUBLIC_URL}/icons/close.svg`}
        alt='close'
      />
    </div>
  );
}
