---
title: 브라우저 렌더링과 리플로우
description: 브라우저가 한 프레임을 그리는 순서와 리플로우가 일어나는 조건을 정리하고, DOM을 읽고 쓰는 순서와 애니메이션 속성에 따라 레이아웃 횟수와 시간이 얼마나 달라지는지 직접 측정했다.
date: '2026-10-17T07:15:09.650Z'
series: frontend
tags:
  - 브라우저
  - 렌더링
  - 성능
thumbnail: /assets/blog/browser-rendering-and-reflow/thumbnail.webp
---
> 브라우저가 화면을 그리는 과정과 리플로우를 정리하고, DOM을 읽고 쓰는 순서에 따라 얼마나 차이가 나는지 직접 측정해봤다.

## 1. 들어가며
### 1-1. 한 프레임이 그려지는 순서
화면을 바꾸는 코드가 실행되면 브라우저는 보통 다섯 단계를 거쳐 새 프레임을 만든다.

1. **JavaScript**: DOM이나 스타일을 바꾼다.
2. **Style**: 어떤 CSS 규칙이 어느 요소에 적용되는지 계산한다.
3. **Layout**: 각 요소의 크기와 위치를 계산한다.
4. **Paint**: 픽셀을 채운다.
5. **Composite**: 그려진 레이어를 순서대로 합친다.

![JavaScript, Style, Layout, Paint, Composite 순서로 한 프레임이 그려지는 과정](/assets/blog/browser-rendering-and-reflow/01-pipeline.webp)

화면이 초당 60번 갱신된다면 한 프레임에 쓸 수 있는 시간은 약 16.6ms다. 브라우저도 일을 해야 하니, 우리 코드는 10ms 안에 끝내는 것이 좋다고 web.dev는 권한다.

### 1-2. 리플로우란?
Layout 단계를 Firefox에서는 리플로우(reflow)라고 부른다. 요소의 크기나 위치가 바뀌면 그 영향을 받는 요소들의 위치를 다시 계산해야 하는데, 요소가 많을수록 이 계산이 비싸진다.

보통 브라우저는 스타일 변경을 모아뒀다가 프레임을 그릴 때 한 번에 레이아웃을 계산한다. 문제는 JS가 이 타이밍을 앞당길 수 있다는 점이다.

## 2. 강제 동기 레이아웃
### 2-1. 무엇이 문제인가
스타일을 바꾼 직후에 `offsetWidth`나 `getBoundingClientRect()` 같은 크기 값을 읽으면, 브라우저는 정확한 값을 돌려주기 위해 그 자리에서 레이아웃을 계산해야 한다. 이것을 **강제 동기 레이아웃**이라고 한다. 이게 반복문 안에서 읽기, 쓰기, 읽기, 쓰기로 이어지면 매번 레이아웃이 돌아가는데, 이 상태를 **레이아웃 스래싱**이라고 부른다.

### 2-2. 직접 측정해보기
요소 1,000개의 너비를 바꾸는 코드를 두 가지 방식으로 작성했다.

```js
const items = [...document.querySelectorAll('.item')]; // 1,000개

// A. 읽고 쓰기를 번갈아
items.forEach((el, i) => {
  const width = el.offsetWidth; // 읽기: 최신 레이아웃이 필요하다
  el.style.width = `${width - (i % 50)}px`; // 쓰기: 레이아웃이 무효화된다
});

// B. 읽기를 먼저 모으고, 쓰기는 나중에
const widths = items.map((el) => el.offsetWidth);
items.forEach((el, i) => {
  el.style.width = `${widths[i] - (i % 50)}px`;
});
```

Chrome 155에서 각각 7번 실행했다. 실행 시간은 `performance.now()`로, 레이아웃 횟수는 Chrome DevTools Protocol의 `Performance.getMetrics`가 주는 `LayoutCount`로 쟀다.

| 방식 | 실행 시간 (중앙값) | 레이아웃 횟수 |
|---|---|---|
| A. 번갈아 읽고 쓰기 | 325.6ms | 1,000번 |
| B. 읽기 먼저, 쓰기 나중 | 0.9ms | 0번 |

![요소 1,000개를 바꿀 때 읽기와 쓰기를 번갈아 하면 325.6ms와 레이아웃 1,000번, 읽기를 먼저 모으면 0.9ms와 강제 레이아웃 0번](/assets/blog/browser-rendering-and-reflow/02-thrashing.webp)

코드가 하는 일은 똑같은데 300배 넘게 차이가 났다. A는 매번 쓴 직후에 다음 요소를 읽으니 1,000번 모두 레이아웃을 강제로 계산했다. B는 읽는 동안에는 레이아웃이 이미 최신이고, 쓰기 결과는 다음 프레임에서 한 번만 계산되니 측정 구간에서는 강제 레이아웃이 한 번도 없었다. 헤드리스가 아닌 실제 창에서 돌려도 338.8ms와 1.0ms로 비슷했다.

### 2-3. 해결: 읽기와 쓰기를 나눈다
원칙은 단순하다. **읽기를 먼저 모아서 하고, 쓰기는 그다음에 한 번에** 한다. 반복문 안에서 크기를 읽어야 한다면 반복문 밖으로 빼거나 위의 B처럼 배열에 먼저 모은다. 쓰기를 다음 프레임 직전으로 미루고 싶으면 `requestAnimationFrame` 안에서 하면 된다.

어디서 강제 레이아웃이 일어나는지 찾을 때는 Chrome DevTools Performance 패널의 Forced reflow 인사이트가 도움이 된다.

## 3. 무엇을 바꾸느냐에 따라 다시 도는 단계가 다르다
모든 스타일 변경이 다섯 단계를 다 거치는 건 아니다.
- **레이아웃 속성**(`width`, `height`, `top`, `left` 등)을 바꾸면 Layout부터 다시 돈다.
- **페인트 속성**(`color`, `background-image` 등)은 Layout을 건너뛰고 Paint부터 다시 돈다.
- **합성 속성**(`transform`, `opacity`)은 Layout과 Paint를 건너뛰고 Composite만 다시 할 수 있다.

![레이아웃 속성은 Layout부터, 페인트 속성은 Paint부터, transform과 opacity는 Composite만 다시 도는 차이](/assets/blog/browser-rendering-and-reflow/03-properties.webp)

이것도 직접 확인해봤다. 상자 하나를 `requestAnimationFrame`으로 60프레임 동안 옮기면서, 한 번은 `left`를 바꾸고 한 번은 `transform: translateX()`를 바꿨다.

```js
// left: 레이아웃 속성
box.style.left = `${frame * 3}px`;

// transform: 합성 속성
box.style.transform = `translateX(${frame * 3}px)`;
```

| 방식 | 60프레임 동안 레이아웃 | 스타일 계산 |
|---|---|---|
| `left` | 60번 | 60번 |
| `transform` | 1번 | 60번 |

스타일 계산은 둘 다 매 프레임 일어났지만, 레이아웃은 `left`만 매 프레임 다시 계산했다. 움직임이 같다면 애니메이션은 `transform`과 `opacity`로 만드는 게 낫다는 말이 숫자로 확인된 셈이다.

## 4. 마무리
직접 측정해보니 같은 일을 하는 코드라도 DOM을 읽고 쓰는 순서만으로 325.6ms와 0.9ms가 갈렸다. 원리를 알고 나면 해결책은 "읽기 먼저, 쓰기 나중"과 "움직임은 transform으로" 두 가지로 정리된다.

아쉬운 점은 측정이 단순한 예제라는 점이다. 실제 화면은 요소 구조와 CSS가 훨씬 복잡하니, 숫자 자체보다는 차이의 방향을 기억하고 실제 페이지는 DevTools로 따로 확인하는 게 맞다.

스크롤이나 리사이즈 핸들러, 목록을 다루는 코드에서 크기를 읽고 있다면, 그 앞에 스타일을 바꾸는 코드가 없는지 한 번 살펴보는 것을 추천한다. 렌더링이 이벤트 루프의 어느 시점에 일어나는지는 [이벤트 루프와 태스크 큐](/blog/event-loop-tasks-microtasks)에서 이어서 정리했다.

> 참고 링크
- [Rendering performance | web.dev](https://web.dev/articles/rendering-performance)
- [Avoid large, complex layouts and layout thrashing | web.dev](https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing)
- [Window: requestAnimationFrame() | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)
