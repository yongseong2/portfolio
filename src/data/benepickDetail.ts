export const benepickDetail = `

# 베네픽

<span style="background-color: #FDFD96; font-weight: bold;">삼성 청년SW아카데미 특화프로젝트 우수상</span>

<br/>

2023.08.21~2023.10.06

_프론트엔드 파트_

<br/>

**시연영상**

<a href="https://www.youtube.com/watch?v=KMJX3GOS7eo" target="_blank" style="background-color: #FDFD96; font-weight: bold;">YouTube 링크</a>

<br/>

- 위치 기반 카드 추천 서비스
  - SSAFY 특화 프로젝트
  - 백엔드4, 프론트엔드2

  <br/>


## 활용 기술스택

**Typescript, React Native, React-Navigation React-query**

<br/>

## 프로젝트 기여

### 1. **챗봇**

![Screenshot_1696556356.png](https://github.com/Benepick/Benepick/raw/master/readme-asset/image/gif/%EC%B1%97%EB%B4%87.gif)

<span style="background-color: #FDFD96; font-weight: bold;">카드의 다양한 혜택 정보를 사용자에게 효과적으로 전달하고자 챗봇 서비스 도입을 고려하였습니다.</span>

- 특정 조건 충족 시 안내 버튼 제공으로 인터랙티브한 경험을 제공하였습니다.
- 사용자 응답과 서비스 조건에 따라 Chat GPT를 통한 적합한 답변을 제공하였습니다.
- 답변에 중복 요청을 방지하기 위한 boolean 타입의 변수 사용하여 챗봇과 관련된 요청을 제한하였습니다.

<br/>

<span style="background-color: #FDFD96; font-weight: bold;">평가</span>

- 챗봇은 주로 카드 혜택에 대해 응답하는 방식이었기 때문에 기능적인 범위가 다소 제한적이었습니다. 예시로 '스타벅스에서 받을 수 있는 카드 혜택 보여줘'와 같은 구체적인 요청보다는 기본 키워드에만 반응하는 경향이 있었습니다.
- 정확한 카드 혜택 질의는 어려웠으나, 최신 데이터에 기반한 응답(카드 혜택 요약 등)을 제공할 수 있었습니다.

<br/>

<span style="background-color: #FDFD96; font-weight: bold;">배운점 및 개선방향</span>

- 단순히 키워드를 파악하는 것을 넘어서, 챗봇이 대화 문맥을 종합적으로 이해하며 응답하는 방식으로 발전시키고자 합니다.

<br/>

### 2. **메인페이지**

![Screenshot_1696556453.png](https://github.com/Benepick/Benepick/raw/master/readme-asset/image/gif/%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%80.gif)

![KakaoTalk_20231006_104524937.jpg](https://github.com/Benepick/Benepick/raw/master/readme-asset/image/gif/%EC%89%91%ED%94%BD.gif)

<span style="background-color: #FDFD96; font-weight: bold;">위치 기반 신용카드 추천 시스템</span>


- 앱을 실행하는 순간 간편 로그인이 활성화 된다면, 자신의 위치에 따른 카드 추천을 받을 수 있도록 메인 페이지를 구현하였습니다.
- 사용자의 위치 정보를 바탕으로 서버에서 상권 데이터를 불러와 정해진 레이아웃에 나타납니다.

<br/>

<span style="background-color: #FDFD96; font-weight: bold;">평가</span>

- 다양한 사용자 상황을 초기 설계에서 충분히 고려하지 못한 점이 아쉬웠습니다.
- 일부 카드의 이미지가 정상적으로 표시되지 않는 문제가 발생하였습니다.

<br/>

<span style="background-color: #FDFD96; font-weight: bold;">배운점 및 개선방향</span>

- 사용자의 위치 권한 거부, 로딩 중 상태, 위치 기반 혜택 부재 등의 상황을 설계 초기부터 고려하면 구현이 더 원활해질 것으로 보입니다.
- 카드 이미지의 크기를 서버 또는 클라이언트에서 미리 조정하여, 카드 이미지가 일관되게 세로 방향으로 렌더링되도록 개선이 필요합니다.

<br/>

### 3. **혜택 및 소비 내역 그래프**

![Screenshot_1696556286.png](https://github.com/Benepick/Benepick/raw/master/readme-asset/image/gif/%EC%86%8C%EB%B9%84%ED%98%9C%ED%83%9D%EA%B7%B8%EB%9E%98%ED%94%84.gif)

<span style="background-color: #FDFD96; font-weight: bold;">수동 SVG 그래프 생성</span>


- 그래프 라이브러리를 활용하는 대신, 세밀한 조정과 특별한 디자인을 위해 SVG를 직접 코드로 생성하였습니다.
- 데이터의 변화에 따라 그래프가 동적으로 변할 수 있도록, SVG의 속성 값을 바꿀 수 있게 설계하였습니다.

<br/>

<span style="background-color: #FDFD96; font-weight: bold;">평가</span>

- 그래프의 각 요소 항목들은 표시되어 있었으나, 수치를 바로 확인하기는 어려웠습니다.

<br/>

<span style="background-color: #FDFD96; font-weight: bold;">배운점 및 개선방향</span>

- SVG의 유연성과 확장성을 경험하였습니다.
- 그래프 상의 수치를 터치하여 직접 확인할 수 있는 기능을 추가하면 사용자 경험을 향상할 수 있을것으로 기대됩니다.

<br/>

### 4. **장소 기반 혜택 검색**

![Screenshot_1696556221.png](https://github.com/Benepick/Benepick/raw/master/readme-asset/image/gif/%ED%98%9C%ED%83%9D%EC%83%81%EC%84%B8%EB%B3%B4%EA%B8%B0.gif)

<span style="background-color: #FDFD96; font-weight: bold;">장소 검색을 통한 혜택 기반 보유 카드와 새로운 카드 추천</span>

- 사용자가 특정 장소나 가맹점을 검색할 때, 그 곳에서 보유하고 있는 카드 중에서 가장 많은 혜택을 받을 수 있는 카드를 우선적으로 추천합니다.
- 더불어, 보유 카드이외에 다른 카드들 중에서 해당 장소에서 가장 높은 혜택을 제공하는 카드도 함께 제시됩니다.

<br/>

<span style="background-color: #FDFD96; font-weight: bold;">평가</span>

- 사용자에게 복잡한 카드 정보를 간결하게 전달하는 점에서 유용했습니다.
- 일부 긴 텍스트가 UI를 방해하는 경우가 있어, 이 부분에 대한 세심한 설계가 필요했다는 아쉬움이 들었습니다.

<br/>

<span style="background-color: #FDFD96; font-weight: bold;">개선방향</span>

- Text 컴포넌트의 특정 속성을 조절하거나, 조건부 렌더링을 적용함으로써, 긴 텍스트가 UI를 방해하는 문제를 해결할 수 있을 것으로 예상됩니다.
`;
