export const bidkingDetail = `
# 입찰왕

<span style="background-color: #FDFD96; font-weight: bold;">삼성 청년SW아카데미 우수프로젝트 우수상</span>

<br/>

2023.07.04~2023.08.18 (7주)

_프론트엔드 파트_

<br/>

**시연영상**

<a href="https://www.youtube.com/watch?v=iyUf4gSRbaA" target="_blank" rel='noopener noreferrer' style="background-color: #FDFD96; font-weight: bold;">YouTube 링크</a>

<br/>

**쉽고 재미있는 라이브 경매 플랫폼, 입찰왕**
- 프론트엔드 2명 / 백엔드 4명
- 프론트엔드 개발 담당

<br/>

**담당 역할**

- 메인페이지 및 Scroll event 수신 시 쓰로틀링을 이용한 API 요청으로 무한 스크롤 경매방 탐색 기능
- Openvidu를 활용한 판매자 실시간 화면 송출 기능(1:N)
- Socket.io를 활용한 경매방 구매자간의 채팅 기능
- SSE를 활용한 알림 수신 기능 및 알림 내역 조회 기능
- 토큰 기반의 회원 인증 및 갱신 기능(Access Token, Refresh Token 활용)
- 경매방 생성, 수정, 삭제 기능
- 판매자와 구매자를 구분하는 다크모드와 라이트모드 기능

<br/>

**활용 기술스택**

Typescript, React, Redux-toolkit, Emotion, Yarn berry, Storybook, React-query

![Untitled](https://github.com/yongseong2/portfolio/assets/122865525/049bb7bd-dcf5-4991-9bfd-51b9269cf43b)

<br/>

**경매진행 페이지**

![aution-seller](https://github.com/yongseong2/portfolio/assets/122865525/3868c63c-daba-4d81-8478-8c5dc4d66274)
![auction-buyer](https://github.com/yongseong2/portfolio/assets/122865525/dca46f0d-c54d-423d-a686-aeb92e3672f9)

<br/>

- 판매자는 Openvidu로 상품을 실시간 송출하고, 구매자는 동시에 이를 시청하여 다수와 함께 경매에 참여합니다.
- 판매자와 구매자 간의 실시간 채팅을 지원하며, 판매자는 채팅방 참여자의 닉네임을 확인할 수 있습니다.

<br/>

**메인페이지 (구매자 페이지)**

![seller-main-bookmarked](https://github.com/yongseong2/portfolio/assets/122865525/022b2de8-3adc-4a91-867a-10e67c1de9ed)

<br/>

- 메인페이지의 경매 목록 탐색에 카테고리 및 무한 스크롤링 기능을 도입하였습니다.

<br/>

**Atomic 디자인 기반의 컴포넌트와 Storybook 사용**

![Untitled 1](https://github.com/yongseong2/portfolio/assets/122865525/0482758c-d53a-4530-97a6-4b6ce58f60d0)

<br/>

- 각 컴포넌트의 사용법과 속성을 명확하게 해, 팀원들이 컴포넌트를 쉽게 이해하고 사용할 수 있도록 도움을 주었습니다.

<br/>

**Yarn Berry 도입 및 최적화**

- 의존성 설치 시간을 40% 줄이고, 빌드 속도를 20% 향상하였습니다. CI 과정의 속도 개선으로 인해, 배포 과정이 빠르게 진행되어 신속한 서비스 제공이 가능해졌습니다.
- Zero Install 기능을 도입하면서 프로젝트 실행 및 관리 효율성이 향상되었습니다.
`;
