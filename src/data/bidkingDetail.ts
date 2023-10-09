export const bidkingDetail = `
# 입찰왕

<span style="background-color: #FDFD96; font-weight: bold;">삼성 청년SW아카데미 우수프로젝트 우수상</span>

<br/>

2023.07.04~2023.08.18

_프론트엔드 파트_

<br/>

- 쉽고 재미있는 라이브 경매 플랫폼, 입찰왕
  - SSAFY 공통 프로젝트
  - 백엔드4, 프론트엔드2

<br/>

## 활용 기술스택

**Typescript, React, Redux-toolkit, Emotion, Yarn berry, Storybook, React-query**

![Untitled](https://github.com/yongseong2/portfolio/assets/122865525/049bb7bd-dcf5-4991-9bfd-51b9269cf43b)

<br/>

## 프로젝트 기여

### 1. **경매진행 페이지**

![aution-seller](https://github.com/yongseong2/portfolio/assets/122865525/3868c63c-daba-4d81-8478-8c5dc4d66274)
![auction-buyer](https://github.com/yongseong2/portfolio/assets/122865525/dca46f0d-c54d-423d-a686-aeb92e3672f9)


<span style="background-color: #FDFD96; font-weight: bold;">Openvidu를 활용한 실시간 화면 송출 기능 구현</span>

- 판매자는 Openvidu를 통해 경매 상품을 실시간으로 송출하며, 마이크와 카메라의 상태를 조절하거나 "경매 종료" 버튼으로 세션을 종료할 수 있습니다.
- 구매자는 실시간으로 판매자의 화면 송출을 시청하며, Openvidu를 활용해 다수의 구매자가 동시에 경매에 참여하는 환경을 제공합니다.

<br/>

<span style="background-color: #FDFD96; font-weight: bold;">실시간 채팅 기능의 도입</span>

- Node.js와 [Socket.io](http://Socket.io) 기반으로 실시간 채팅 기능을 구현하였습니다.
- 판매자와 구매자 간의 실시간 소통을 지원하며, 판매자는 채팅방 참여자의 닉네임을 확인하여 적절한 대응을 할 수 있습니다.

<br/>

<span style="background-color: #FDFD96; font-weight: bold;">평가</span>

- 판매자와 구매자 간의 실시간 상호작용을 효과적으로 제공하였습니다.
- 1:N의 방송 환경을 구축함으로써 여러 구매자들이 동시에 경매 화면을 시청할 수 있게 하였습니다.


<br/>

<span style="background-color: #FDFD96; font-weight: bold;">배운점</span>

- [Socket.io](http://Socket.io) 라이브러리를 활용하며 실시간 채팅 구현 방법에 대해 배울 수 있었습니다.
- Openvidu 오픈 소스를 활용하는 과정에서, 공식문서와 예시코드의 중요성을 깨달았습니다.

<br/>

### 2. **메인페이지 (구매자 페이지)**

![seller-main-bookmarked](https://github.com/yongseong2/portfolio/assets/122865525/022b2de8-3adc-4a91-867a-10e67c1de9ed)


<span style="background-color: #FDFD96; font-weight: bold;">무한 스크롤링 구현과 최적화 경험</span>

- 메인페이지의 경매 목록 탐색에 무한 스크롤링 기능을 도입하였습니다.
- 페이지 끝에 도달 시, 다음 페이지의 목록이 자동으로 로드되는 구조로 사용자의 편의성을 높였습니다.

<br/>

<span style="background-color: #FDFD96; font-weight: bold;">평가</span>

- 사용자는 끊김 없이 편리하게 경매 목록을 탐색할 수 있게 되었습니다.
- 페이지 로드 속도와 부하 최소화를 위해 쓰로틀링 및 메모이제이션 기법을 적용하였습니다, 이로 인해 전반적인 성능 향상을 이루었습니다.

<br/>

<span style="background-color: #FDFD96; font-weight: bold;">배운점 및 개선방향</span>

- 무한 스크롤링 외의 다른 기능에도 쓰로틀링을 적용할 수 있다는 인사이트를 얻었습니다.
- useMemo 훅을 활용하면서, 원시타입과 객체타입에 따른 렌더링 최적화의 중요성과 방법에 대해 이해하게 되었습니다.

<br/>

### 3. **Yarn Berry 도입 및 최적화**

- npm의 의존성 관리와 빌드 속도 문제로 인해, Yarn Berry를 선택하여 프로젝트에 도입하였습니다.
- Yarn Berry의 Plug’n’Play 전략을 활용해 의존성 설치 시간을 40% 줄이고, 빌드 속도를 20% 향상하였습니다.

<span style="background-color: #FDFD96; font-weight: bold;">평가</span>

- Yarn Berry의 Zero Install 기능을 도입하면서 프로젝트 실행 및 관리 효율성이 크게 향상되었습니다.
- CI 과정의 속도 개선으로 인해, 배포 과정이 빠르게 진행되어 신속한 서비스 제공이 가능해졌습니다.
- Zip 아카이브를 사용한 의존성 관리와 Zero Install 적용으로, 프로젝트 협업이 더욱 원활해졌습니다.
- Typescript 호환성 문제가 발생하여 오류를 해결하기까지 시간을 크게 소요하였습니다.

<span style="background-color: #FDFD96; font-weight: bold;">배운점 및 개선방향</span>

- webpack과 babel의 설정을 조정하여 호환성 문제를 해결하였습니다.
- 새로운 기술을 도입할 때의 초기 학습의 중요성을 깨달았습니다. 세심한 준비를 했다면 더 효율적으로 시간을 활용할 수 있었을 것입니다.

<br/>

### 4. **Atomic 디자인 기반의 컴포넌트와 Storybook 사용**

![Untitled 1](https://github.com/yongseong2/portfolio/assets/122865525/0482758c-d53a-4530-97a6-4b6ce58f60d0)

![Untitled 2](https://github.com/yongseong2/portfolio/assets/122865525/5ef022b9-4ed0-4763-a2cc-66ef14e7ef5b)

<span style="background-color: #FDFD96; font-weight: bold;">평가</span>

- 코드의 일관성을 증진시키고 프로젝트의 유지보수를 용이하게 만들었습니다.
- 버튼, 카드, 목록과 같은 기본 컴포넌트를 모듈화하고 재사용성을 높였습니다.
- Storybook은 각 컴포넌트의 사용법과 속성을 명확하게 해, 팀원들이 컴포넌트를 쉽게 이해하고 사용할 수 있도록 도움을 주었습니다.

<br/>

<span style="background-color: #FDFD96; font-weight: bold;">배운점</span>

- 개발자 경험(DX)이 크게 향상되며, 이로 인해 전반적인 개발 속도가 빨라짐을 체감하였습니다.
- 요구사항 변동 시 컴포넌트의 유연한 수정과 재사용이 가능함을 체감하며, 디자인 시스템 구축의 중요성을 깨달았습니다.
`;
