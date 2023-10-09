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
          overflowY: 'scroll',
          background: 'white',
          padding: '40px',
          borderRadius: '10px',
          position: 'relative',
          marginRight: '30px', // close 버튼을 모달 오른쪽 바깥에 위치시키기 위해 여백 추가
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
          position: 'fixed', // 화면에 고정
          top: '15%', // 화면 중앙에 수직 위치
          right: '19%', // 화면 오른쪽에서 15% 위치
          transform: 'translateY(-50%) translateX(-50%)', // Y축에서 50%만큼 이동하여 수직 중앙 정렬 보정
          cursor: 'pointer',
        }}
        onClick={onClose}
        src={`${process.env.PUBLIC_URL}/icons/close.svg`}
        alt='close'
      />
    </div>
  );
}
