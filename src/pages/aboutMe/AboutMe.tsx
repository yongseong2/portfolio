/** @jsxImportSource @emotion/react */
import { Element } from 'react-scroll';
import { SubTitle } from '../../libs/common/SubTitle';
import { Spacing } from '../../libs/common/Spacing';
import IconDescription from './container/IconDescription';
import { MainSkill } from './container/MainSkill';
import { SubSkill } from './container/SubSkill';
import { JustUsed } from './container/JustUsed';
import { Introduce } from './container/Introduce';
import { CommunitcationTool } from './container/CommunitcationTool';

function AboutMe() {
  return (
    <Element name='about-me'>
      <Spacing rem='3' />
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <SubTitle title='ABOUT ME' />
        <Spacing rem='5' />
        <Introduce />
        <Spacing rem='5' />

        <div
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <div
            css={{
              minWidth: '45%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <IconDescription
              img={`${process.env.PUBLIC_URL}/Image/aboutImg/development.svg`}
              title='DEVELOPMENT'
              description='프론트엔드 기술을 활용하여 사용자에게 더 나은 경험을 제공하는 것을 지향합니다. 서비스의 성능과 사용성, 그리고 안정성에 대한 컨벤션 고민을 통해 확장 가능하고 유지보수가 쉬운 프론트엔드 아키텍처를 구축하려고 노력하고 있습니다.'
            />
          </div>
          <div
            css={{
              minWidth: '55%',
              display: 'flex',
              justifyContent: 'center',
              '@media (max-width: 768px)': {
                marginTop: '5rem',
              },
            }}
          >
            <IconDescription
              img={`${process.env.PUBLIC_URL}/Image/aboutImg/target.svg`}
              title='TARGET'
              description='3개의 프로젝트를 통해 실질적인 개발 경험을 쌓았습니다. 프로젝트를 진행하며 겪는 문제를 해결하기 위해 Stack Overflow와 온라인 자료를 적극적으로 활용했습니다. 이 과정에서 다양한 기술과 방법론을 배우고 적용해보며, 프론트엔드 개발에 있어 새로운 가능성을 탐색하고 있습니다.'
            />
          </div>
        </div>
        <div
          css={{
            display: 'flex',
            justifyContent: 'center',
            '@media (min-width: 768px)': {
              marginTop: '10rem',
            },
            '@media (max-width: 768px)': {
              marginTop: '7rem',
            },
          }}
        >
          <IconDescription
            img={`${process.env.PUBLIC_URL}/Image/aboutImg/communication.svg`}
            title='COMMUNICAITION'
            description='장기적인 목표로는 훌륭한 기술 리더가 되어 다양한 개발 프로젝트와 팀을 선도하는 것입니다. 이를 향한 첫걸음으로, 적극적인 커뮤니케이션을 통해 프로젝트의 목표를 정확히 이해하고, 이를 구현하기 위한 효율적인 방법을 모색하고 있습니다.'
          />
        </div>
        <Spacing rem='5' />
        <Spacing rem='5' />
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/Image/separatorBlack.png`}
            alt=''
          />
        </div>
        <Spacing rem='5' />
        <SubTitle title='SKILLS' />
        <Spacing rem='3' />
        <div
          css={{
            width: '78%',
          }}
        >
          <Spacing rem='3' />
          <div>
            <MainSkill title='주력기술로 연습중이에요' />
            <Spacing rem='5' />

            <SubSkill title='일반적으로 개발에 사용했어요' />
            <Spacing rem='5' />

            <JustUsed title='가볍게 사용만 해봤어요' />
            <Spacing rem='5' />

            <CommunitcationTool title='Communitcation & Tools' />
            <Spacing rem='5' />
          </div>
        </div>
      </div>
    </Element>
  );
}

export default AboutMe;
