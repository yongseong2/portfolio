---
title: 이벤트 루프와 태스크 큐
description: 비동기 코드의 실행 순서를 이벤트 루프 관점에서 정리하고, 브라우저에서 직접 실행해 Promise와 setTimeout의 순서, setTimeout(0)이 늦어지는 이유를 확인했다.
date: '2026-10-17T07:15:46.228Z'
series: frontend
tags:
  - JavaScript
  - 이벤트 루프
  - 브라우저
thumbnail: /assets/blog/event-loop-tasks-microtasks/thumbnail.webp
---
> 비동기 코드가 실행되는 순서를 이벤트 루프 관점에서 정리하고, 브라우저에서 직접 실행해 순서와 지연 시간을 확인했다.

## 1. 들어가며
### 1-1. 자바스크립트는 한 번에 하나만 한다
브라우저의 메인 스레드는 한 번에 하나의 일만 한다. 클릭 이벤트 처리도, `setTimeout` 콜백도, Promise 후속 처리도, 화면 그리기도 모두 같은 스레드에서 순서를 기다린다. 이 순서를 정하는 규칙이 이벤트 루프다.

### 1-2. 이벤트 루프 한 바퀴
MDN은 이벤트 루프 한 바퀴를 이렇게 설명한다. **태스크를 최대 하나 실행하고, 대기 중인 마이크로태스크를 전부 실행한 뒤, 필요하면 렌더링을 하고 다시 돈다.**

- **태스크**: 스크립트 실행, 이벤트 처리, `setTimeout`·`setInterval` 콜백
- **마이크로태스크**: Promise의 `then`, `await` 이후 코드, `queueMicrotask`

![이벤트 루프 한 바퀴: 태스크 하나 실행, 마이크로태스크 전부 실행, 필요하면 렌더링, 다음 태스크](/assets/blog/event-loop-tasks-microtasks/01-loop.webp)

중요한 건 마이크로태스크 큐는 **빌 때까지** 비운다는 점이다. 마이크로태스크가 실행 중에 새 마이크로태스크를 넣으면, 그것까지 이번 바퀴 안에서 실행된다.

## 2. 실행 순서 확인하기
### 2-1. 예제
아래 코드를 Chrome 155에서 실행하고 찍힌 순서를 기록했다.

```js
log('1 sync start');

setTimeout(() => log('setTimeout 0'), 0);

Promise.resolve().then(() => {
  log('promise.then');
  queueMicrotask(() => log('microtask queued inside then'));
});
queueMicrotask(() => log('queueMicrotask'));

(async () => {
  log('async fn body (sync part)');
  await null;
  log('after await');
})();

log('2 sync end');
```

```text
1 sync start
async fn body (sync part)
2 sync end
promise.then
queueMicrotask
after await
microtask queued inside then
setTimeout 0
```

### 2-2. 왜 이 순서일까
1. 지금 실행 중인 스크립트 자체가 하나의 태스크다. 그래서 동기 코드가 먼저 끝까지 실행된다. async 함수도 첫 `await`를 만나기 전까지는 동기적으로 실행되기 때문에 `async fn body`가 `2 sync end`보다 먼저 찍혔다.
2. 동기 코드가 끝나면 마이크로태스크를 넣은 순서대로 실행한다. `then` 콜백, `queueMicrotask`, `await` 이후 코드 순으로 큐에 들어갔기 때문에 그 순서대로 찍혔다.
3. `then` 안에서 새로 넣은 마이크로태스크는 큐 맨 뒤에 붙지만, 큐가 빌 때까지 비우는 규칙 때문에 같은 바퀴 안에서 실행됐다.
4. `setTimeout` 콜백은 다음 태스크라서, 마이크로태스크가 전부 끝난 뒤에야 실행됐다.

### 2-3. requestAnimationFrame은 어디에 있을까
`requestAnimationFrame` 콜백은 태스크 큐가 아니라 렌더링 단계에서, 다음 화면을 그리기 직전에 실행된다. 그래서 `setTimeout(0)`과의 순서는 다음 프레임이 언제 오느냐에 따라 달라질 수 있다.

```js
let first;
setTimeout(() => (first ??= 'setTimeout'), 0);
requestAnimationFrame(() => (first ??= 'requestAnimationFrame'));
```

이 코드를 20번 돌렸을 때는 20번 모두 `setTimeout`이 먼저였다. 연속된 rAF 콜백 사이의 간격은 16.7ms로, 60Hz 화면 주기와 같았다. 다만 결과가 매번 같았다고 해서 순서가 보장되는 건 아니니, 두 콜백의 순서에 기대는 코드는 피하는 게 맞다.

## 3. setTimeout(0)은 0ms가 아니다
### 3-1. 중첩되면 4ms
`setTimeout(fn, 0)` 안에서 다시 `setTimeout(fn, 0)`을 거는 식으로 10번 이어서 호출하고, 호출 사이 간격을 쟀다.

```text
0, 0.1, 0, 0, 0, 0, 4.6, 4.6, 4.9, 4.6 (ms)
```

여섯 번째까지는 거의 0ms였고, 일곱 번째부터 4ms 넘게 벌어졌다. 중첩 깊이가 5를 넘는 타이머에는 최소 4ms를 적용한다는 HTML 표준 규칙이 그대로 드러난 결과다.

### 3-2. 메인 스레드가 바쁘면 기다린다
`setTimeout(0)`을 걸어둔 뒤 200ms 동안 도는 동기 루프를 실행했더니, 콜백은 정확히 200.0ms 뒤에 실행됐다. 지연 시간은 "최소" 대기 시간일 뿐이고, 지금 실행 중인 코드가 끝나야 다음 태스크를 꺼낼 수 있다.

### 3-3. 마이크로태스크도 막을 수 있다
이번에는 동기 루프 대신 마이크로태스크가 자기 자신을 계속 다시 넣도록 해서 100ms 동안 이어지게 했다. 그동안 마이크로태스크는 98,227번 실행됐고, `setTimeout(0)`은 100.1ms 뒤에야 실행됐다. 큐를 빌 때까지 비우는 규칙 때문에, 마이크로태스크가 끝없이 이어지면 다음 태스크는 물론 렌더링도 그 뒤로 밀린다.

![setTimeout(0)이 늦어지는 세 가지 이유: 중첩 4ms 제한, 긴 동기 작업, 마이크로태스크 연쇄](/assets/blog/event-loop-tasks-microtasks/02-delays.webp)

## 4. 실무에서 기억할 것
![실무에서 기억할 것: 동기 코드가 먼저, 마이크로태스크는 큐가 빌 때까지, setTimeout과 rAF 순서에 기대지 않기, 긴 작업은 쪼개기](/assets/blog/event-loop-tasks-microtasks/03-checklist.webp)

- **긴 작업은 쪼갠다.** 무거운 계산을 한 번에 돌리면 그동안 클릭도 화면 갱신도 멈춘다. 일정 단위로 나눠 `setTimeout`으로 다음 태스크에 넘기면 사이사이에 입력 처리와 렌더링이 끼어들 수 있다.
- **Promise 재귀를 조심한다.** 3-3처럼 마이크로태스크가 계속 이어지면 화면이 멈춘 것처럼 보인다.
- **타이머로 정확한 시간을 재지 않는다.** 백그라운드 탭에서는 브라우저가 타이머를 크게 늦추기도 한다. 경과 시간이 중요하면 `performance.now()` 같은 타임스탬프로 계산한다.
- **화면을 바꾸는 작업은 `requestAnimationFrame`에서** 한다. 다음 프레임 직전에 실행되니 쓰기를 모으기에 좋다.

## 5. 마무리
실행 순서 문제는 외워서 맞히려고 하면 금방 헷갈리지만, "태스크 하나, 마이크로태스크 전부, 필요하면 렌더링"이라는 한 바퀴만 기억하면 대부분 설명된다. 직접 돌려보니 `setTimeout(0)`이 0ms가 아닌 이유도 4ms 제한, 바쁜 메인 스레드, 마이크로태스크 연쇄로 숫자와 함께 확인할 수 있었다.

아쉬운 점은 rAF처럼 렌더링 시점에 묶인 동작은 실행 환경의 화면 주기에 따라 결과가 달라질 수 있어서, 한 번의 측정으로 일반화하기 어렵다는 점이다.

비동기 코드의 순서가 헷갈릴 때는 위 예제처럼 직접 로그를 찍어 확인해보는 것을 추천한다. 렌더링 단계에서 무슨 일이 일어나는지는 [브라우저 렌더링과 리플로우](/blog/browser-rendering-and-reflow)에 정리했다.

> 참고 링크
- [In depth: Microtasks and the JavaScript runtime environment | MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth)
- [Window: setTimeout() | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout)
- [Window: requestAnimationFrame() | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)
