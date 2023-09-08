/** @jsxImportSource @emotion/react */
import React from 'react';
import { Spacing } from '../../../libs/common/Spacing';

export function Introduce() {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h3
        css={{
          width: '50rem',
          lineHeight: '30px',
        }}
      >
        안녕하세요, 김성용이라고 합니다. 현재 삼성청년SW아카데미 9기 교육생으로
        프론트엔드 개발 분야에서 역량을 키우고 있습니다. JavaScript와
        TypeScript에 깊은 흥미를 가지고 있어, 이를 바탕으로 다양한 프로젝트에
        참여하고 있습니다. React와 Vue를 활용한 웹 개발 경험도 있으며, 최근에는
        React Native를 이용해 모바일 애플리케이션 개발에도 도전하고 있습니다.
      </h3>
      <Spacing rem='5' />
      <div
        css={{
          width: '20%',
          textAlign: 'center',
          borderLeft: '4px solid black',
          borderRight: '4px solid black',
        }}
      >
        <h2>MORE</h2>
      </div>
    </div>
  );
}
