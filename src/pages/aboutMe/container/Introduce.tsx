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
          width: '100%',
          lineHeight: '30px',
          fontSize: '18px',
        }}
      >
        눈에 보이는 페이지에 생동감을 불어넣는 매력에 빠져 프론트엔드 개발자가
        되었습니다. <br />
        발전하는 프론트엔드 기술에도 관심이 많지만, 특히 최적화를 통해 새로운
        경험을 제공하는 것에 집중합니다. <br />
        삼성 청년 SW 아카데미에서 수행한 프로젝트를 통해 실질적인 개발 경험을
        쌓았습니다.
        <br /> 가까운 미래에는 다양한 개발자들과 함께 성장하면서, 오픈소스
        프로젝트에 기여하고픈 목표를 가지고 있습니다.
      </h3>
      <Spacing rem='5' />
      <div
        css={{
          width: '10rem',
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
