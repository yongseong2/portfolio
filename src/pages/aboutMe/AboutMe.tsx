/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useRef } from 'react';
import { Element } from 'react-scroll';
import { SubTitle } from '../../libs/common/SubTitle';
import { Spacing } from '../../libs/common/Spacing';
import IconDescription from './container/IconDescription';
import { MainSkill } from './container/MainSkill';
import { SubSkill } from './container/SubSkill';
import { JustUsed } from './container/JustUsed';
import { Introduce } from './container/Introduce';
import { CommunitcationTool } from './container/CommunitcationTool';
import aboutmeData from '../../data/aboutmeData';

function AboutMe() {
  const introduceRef = useRef<HTMLDivElement | null>(null);
  const developmentRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const communicationRef = useRef<HTMLDivElement | null>(null);

  const [introduceOpacity, setIntroduceOpacity] = useState(0);
  const [developmentOpacity, setDevelopmentOpacity] = useState(0);
  const [targetOpacity, setTargetOpacity] = useState(0);
  const [communicationOpacity, setCommunicationOpacity] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            switch (entry.target) {
              case introduceRef.current:
                setIntroduceOpacity(1);
                break;
              case developmentRef.current:
                setDevelopmentOpacity(1);
                break;
              case targetRef.current:
                setTargetOpacity(1);
                break;
              case communicationRef.current:
                setCommunicationOpacity(1);
                break;
              default:
                break;
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (introduceRef.current) observer.observe(introduceRef.current);
    if (developmentRef.current) observer.observe(developmentRef.current);
    if (targetRef.current) observer.observe(targetRef.current);
    if (communicationRef.current) observer.observe(communicationRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Element name='about-me'>
      <Spacing rem='3' />
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '@media (max-width: 768px)': {
            padding: '1rem',
          },
        }}
      >
        <SubTitle title='ABOUT ME' />
        <Spacing rem='5' />
        <div
          ref={introduceRef}
          css={{
            opacity: introduceOpacity,
            transition: 'opacity 4.5s ease',
          }}
        >
          <Introduce />
        </div>
        <Spacing rem='5' />

        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            css={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <div
              ref={developmentRef}
              css={{
                width: '30%',
                opacity: developmentOpacity,
                transition: 'opacity 4.5s ease',
                '@media (max-width: 768px)': {
                  width: '100%',
                },
              }}
            >
              <IconDescription
                img={`${process.env.PUBLIC_URL}/Image/aboutImg/development.svg`}
                title='DEVELOPMENT'
                description={aboutmeData.development}
              />
            </div>
            <div
              ref={targetRef}
              css={{
                width: '30%',
                opacity: targetOpacity,
                transition: 'opacity 4.5s ease',
                marginLeft: '10rem',
                '@media (max-width: 768px)': {
                  width: '100%',
                  marginTop: '3rem',
                  marginLeft: '0',
                },
              }}
            >
              <IconDescription
                img={`${process.env.PUBLIC_URL}/Image/aboutImg/target.svg`}
                title='TARGET'
                description={aboutmeData.target}
              />
            </div>
          </div>
          <div
            ref={communicationRef}
            css={{
              display: 'flex',
              opacity: communicationOpacity,
              transition: 'opacity 4.5s ease',
              alignSelf: 'center',
              marginTop: '3rem',
              width: '30%',
              '@media (max-width: 768px)': {
                width: '100%',
              },
            }}
          >
            <IconDescription
              img={`${process.env.PUBLIC_URL}/Image/aboutImg/communication.svg`}
              title='COMMUNICAITION'
              description={aboutmeData.communication}
            />
          </div>
        </div>
        <Spacing rem='5' />
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/Image/separatorBlack.png`}
            alt='seperator'
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
