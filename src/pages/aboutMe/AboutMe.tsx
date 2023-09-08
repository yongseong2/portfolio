/** @jsxImportSource @emotion/react */
import { Element } from 'react-scroll';
import { SubTitle } from '../../libs/common/SubTitle';
import { Spacing } from '../../libs/common/Spacing';
import IconDescription from './container/IconDescription';
import { MainSkill } from './container/MainSkill';
import { SubSkill } from './container/SubSkill';
import { JustUsed } from './container/JustUsed';
import { Introduce } from './container/Introduce';

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
              description='Stack overflow, Git Hub과 같은 개발 커뮤니티에 적극적으로 참여하고, 기술 블로그를 통해 지식을 습득하는 것을 중요하게 생각합니다. 이를 통해 다양한 경험과 지식을 얻고, 더 나아가 프론트엔드 개발의 새로운 가능성을 모색하고 있습니다. 미래에는 훌륭한 기술 리더가 되어 다양한 개발 프로젝트와 팀을 선도하는 것이 목표입니다.'
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
            description='서비스 개발에 있어서도 개발 능력만큼 중요한 것은 팀과의 원활한 커뮤니케이션입니다. 이에 능동적이고 적극적인 커뮤니케이션을 통해 개발 문제뿐만 아니라 프로젝트 목표 달성에도 기여하고 있습니다. 이러한 전반적인 노력과 경험을 바탕으로 더 우수한 프론트엔드 개발자로 계속 성장하려고 노력하고 있습니다.'
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
            <MainSkill title='주력기술로 연습중이에요:' />
            <Spacing rem='3' />

            <SubSkill title='일반적으로 개발에 사용했어요:' />
            <Spacing rem='3' />

            <JustUsed title='가볍게 사용만 해봤어요:' />
            <Spacing rem='3' />
          </div>
        </div>
      </div>
    </Element>
  );
}

export default AboutMe;
