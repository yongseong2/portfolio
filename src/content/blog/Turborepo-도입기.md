---
title: Turborepo 도입기
description: 터보레포가 어떻게 생겼는지 그리고 기본적인 사용법
date: '2024-12-06T08:25:40.535Z'
series: frontend
tags:
  - Turborepo
  - 모노레포
thumbnail: >-
  /assets/blog/b2354fc3-6a04-4356-a192-06e9db37c766.webp
---
> 모노레포 도입이 필요할 때, Turborepo를 활용해 환경을 구축했던 경험을 떠올리며 작성했다.

## 0.들어가며
Turborepo가 무엇인지 알기 위해선, 모노레포에 대한 개념을 이해하고 있으면 좋다고 생각한다.

### 0-1. 모노레포 이해하기
![모노레포 개념](/assets/blog/f49cea02-a05a-4f1d-97a3-ac646bd1b87d.webp)

React를 예로 들어보자. 

#### 모놀리식
우리가 만약 하나의 서비스를 만든다고 했을 때, 하나의 React 프로젝트만(모놀리식)을 사용할 수도 있다. 이렇게 만들어진 프로젝트는 코드를 공유하기 용이하고, 배포 과정이 단순하다. 하지만 몇가지 단점들이 있다.
> 1. 모든 코드가 단일 버전으로 직접 의존하기에 관심 분리가 용이하지 않음
2. 하나의 프로젝트의 사이즈가 점점 커짐

#### 멀티레포
이를 해결하기 위해 나타난 개념이 "멀티 레포"이다. 각각의 코드들은 서로 공유하지 않고 버전 관리를 따로 하기 때문에 다른 레포에도 영향을 미치지 않는다. 그럼 당연히 여기서 이러한 생각이 들것이다. 

>"컴포넌트는 재사용하려고 만든건데 또 다른 레포에도 비슷하게 만든다고?"

실제 나도 이러한 생각이 들면서 모노레포 도입을 생각 했다. 개발을 하면서 똑같은 일을 하고 싶지 않기에...

#### 모노레포
그렇기 때문에 위 문제들을 해결하기 위해 나타난 개념이 "모노레포"이다. 하나의 레포안에서 여러개의 프로젝트들을 모듈화함으로써 코드 공유가 쉬워지고 관심분리가 용이해진다.

아래는 모노레포의 장점이다.
> - 각 기능을 모듈로 잘 분리함으로써 캡슐화를 이룰 수 있다. (package.json이 여러개)
- 대규모 프로젝트에서 수많은 코드를 들춰봐야 할 수고를 줄일 수 있다.
- 소프트웨어 확장이 쉬워진다.

### 0-2. Turborepo 이해하기
![Turborepo](/assets/blog/cab0b5fa-2bb1-446f-b908-a6a136a47ae1.webp)

문서: https://turbo.build
github: https://github.com/vercel/turborepo

Turborepo는 모노레포 환경에서 다양한 프로젝트들을 개발자들이 더 쉽고 빠르게 개발할 수 있도록 빌드 도구를 제공해준다.

Turborepo의 몇가지 특장점들을 소개해주고자 한다.
![](/assets/blog/0a112bff-3659-48ea-a961-c157c576d7eb.webp)

> 1. 터보레포는 캐싱 메커니즘(병렬처리)을 통해 동일한 작업을 반복하지 않고, 빌드 효율성을 높인다. 
2. 종속성과 작업 흐름을 효율적으로 관리할 수 있다.
3. 필요에 따라 맞춤 설정할 수 있는 유연성을 제공한다.
4. 프로젝트 크기에 상관없이 확장 가능한 구조를 갖추고 있다.

## 1. 주요 구조
Turborepo를 처음 시작했을 때, 주요 구조가 어떠한지 살펴보자.

공식 문서에서 제공하는 github repo 예시를 통해 살펴볼 수 있다.

아래는 초기 시작 시 필요한 기본적인 설정이며, 추가로 제공하는 기능들은 공식문서 참고.

url: https://github.com/vercel/turborepo/tree/main/examples/with-vite
공식문서: https://turbo.build/repo/docs

### 1-1. turbo.json
```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["$TURBO_DEFAULT$", ".env*"],
      "outputs": ["dist/**"]
    },
    "lint": {},
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```
tasks는 각 작업을 정의 하며, 현재 `build`, `lint`, `dev`가 존재하고 있다.

#### build
- `dependsOn` : `build` 작업이 실행되기 전에 의존해야 할 작업을 정의한다.
- `inputs` : 작업이 캐싱될 때 영향을 미치는 파일이나 환경을 정의한다.
- `outputs`: 작업의 결과로 생성되는 파일이나 디렉토리를 지정한다.

#### dev
- `cache` : false로 설정되어 dev 작업은 캐싱을 막는다.
- `persistent`: true로 설정되어 작업 실행 상태를 유지한다.

이외에도 각각의 개발 환경에 맞게 커스텀 설정이 가능하다.

### 1-2 package.json 
![폴더 구조](/assets/blog/20e3f265-9cad-4b8e-91cf-9ca00092e751.webp)

한눈에 보더라도 수많은 package.json들이 존재한다. 이에 더 세분화해서 관심사 분리가 가능하다.

#### 스크립트 실행
```json
// ./package.json

{
  "private": true,
  "scripts": {
    "build": "turbo build",
    "dev": "turbo dev",
    "lint": "turbo lint",
    "format": "prettier --write \"**/*.{ts,tsx,md}\""
  },
  "devDependencies": {
    "eslint": "^8.57.0",
    "prettier": "^3.2.5",
    "turbo": "^2.0.3"
  },
  "packageManager": "pnpm@8.15.6",
  "name": "with-vite"
}
```

```json
// ./apps/docs/package.json

{
  "name": "docs",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --clearScreen false",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint \"src/**/*.ts\""
  },
  "dependencies": {
    "@repo/ui": "workspace:*"
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "eslint": "^8.57.0",
    "typescript": "5.5.4",
    "vite": "^5.1.4"
  }
}
```
루트 경로에서 정의한 스크립트와 apps 폴더 내부의 docs 스크립트를 살펴보자.

docs에서 정의한 스크립트와 동일하게 turbo 명령어로 하위 프로젝트를 관리할 수 있는 것을 확인할 수 있다.

### 1-3. 빌드
![터보레포캐싱1](/assets/blog/ef6ad139-7467-4c7a-9179-a1fc9f1c1f63.webp)

![터보레포캐싱2](/assets/blog/9f469c14-c4c3-44ef-8bd8-5314a3131f91.webp)


터보레포는 작업을 자동으로 병렬화하여 작업을 최적화 하고 있다. 또한 캐싱을 사용하여 빌드 속도를 높이고, **동일한 작업을 두 번 하지 않도록**한다.

직접 사용해보면 여러 프로젝트들을 한번에 빌드할 때, 작업 시간이 크게 단축된다는 느낌을 얻을 수 있다.

#### 그럼 무엇이 캐싱 될까?
위에 정의한 `turbo.json`의 `"outputs": ["dist/**"]` 를 보면 outputs의 정의된 dist 파일 출력을 캐시한다. 

참고로, outputs에 파일 출력을 선언하지 않으면 turborepo는 캐시하지 않는다.

## 2. 개발
직접 사용해보면서 어떻게 개발할 지 살펴보자.

### 2-1. config
우리가 제일 많이 사용하는 typescipt, eslint 를 config로 묶어서 `packages` 폴더 내부에 위치 시켰다.

#### 예시
typescript는 두가지 설정을 가지고 갔다.
```json
// ./packages/typescript-config/base.json

{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "composite": false,
    "declaration": true,
    "declarationMap": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "inlineSources": false,
    "isolatedModules": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "preserveWatchOutput": true,
    "skipLibCheck": true,
    "strict": true
  },
  "exclude": ["node_modules"]
}
```
위 용도는 ui packages에서 사용하는 typescript 설정이다.

```json
// ./packages/typescript-config/vite.json
{
  "extends": "./base.json",
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ESNext", "DOM"],
    "sourceMap": true,
    "resolveJsonModule": true,
    "noEmit": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  },
  "exclude": ["node_modules"]
}
```
react 프로젝트에서 사용된 base.json을 확장한 파일이다. 

두가지 파일로 config를 설정 해놓으면 다른 package 또는 apps 에서 해당 파일을 **동일한 상태로 유지**하며

```json
// ./apps/docs/base.json
// ./apps/web/base.json

{
  "extends": "@repo/typescript-config/vite.json",
  "include": ["src"]
}
```

앱 내부에서 이렇게 사용할 수 있다.

### 2-2. UI
```javascript
// ./apps/docs/main.ts

import { Header } from "@repo/ui/header";
import "./style.css";
import typescriptLogo from "/typescript.svg";
import { Counter } from "@repo/ui/counter";
import { setupCounter } from "@repo/ui/setup-counter";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    ${Header({ title: "Docs" })}
    <div class="card">
      ${Counter()}
    </div>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
```
해당 코드에서 Couter 컴포넌트를 살펴보자.


```javascript
// ./packages/ui/components

export function Counter() {
  return `<button id="counter" type="button"></button>`;
}
```
Counter는 packages에서 따로 정의 되어있다. 

이 컴포넌트는 docs, web에서 모두 사용 가능하며 **하나의 컴포넌트가 서로 다른 프로젝트에서 공유** 될 수 있다.

이외에도 packages 폴더에 eslint, util 함수 등 각각의 개발 환경에 맞게 서로 공유 가능한 package 들을 만들어 개발을 할 수 있다.


## 3. CI/CD
각자의 개발환경에 따라 CI/CD가 다르겠지만, 내가 겪었던 문제들을 풀어보고자 한다.

### 3-1. 환경변수 설정
build 시점에 환경변수가 포함되어야 했고, 로컬 개발시에도 환경변수를 사용해야 했기에 추가적인 설정이 필요했다.

정말 다양한 방법들을 시도했다.(다른 분들은 꼭 공식문서 부터 보길...)

> [Using Environment Variables](https://turbo.build/repo/docs/crafting-your-repository/using-environment-variables)

해당 공식문서를 참고하면, turborepo는 `.env`파일을 자체로 로드하지 않는다. 대신 사용하는 프레임워크가 `.env` 파일을 읽어야 실행 환경에 변수가 반영된다.

해결책으로 [dotenv](https://www.npmjs.com/package/dotenv)를 활용해서 설정했다. 설정은 간단한다.

```
npm install -D dotenv
```
이후 `packages.json`에서

```
"dev": "dotenv -e env/.env.localhost turbo dev",
```
설정을 완료해 사용하면 된다.

### 3-2. Github Actions
처음에는 세 가지 프로젝트를 동시에 배포하기 위해 하나의 `deploy.yml` 파일을 사용했었다. 

하지만 몇 가지 단점이 있었다.

> 1. 중간에 오류 나면 모든 배포가 멈추는 문제가 있음
2. 원하는 프로젝트만 선택적으로 배포되지 않음

그래서 `deploy1.yml`, `deploy2.yml`, `deploy3.yml`로 나누어 설정했다. 

main에 머지될 때 세 개의 GitHub Actions가 개별적으로 실행되게 되었고, 한 프로젝트에서 빌드 오류가 나도 다른 프로젝트 배포에도 영향을 주지 않게 되었다.

기존 프로젝트에서 turborepo로 옮기는 분들은 빌드 폴더가 위치가 변경되니 꼭 확인하길 바란다.

추가적으로 터보 캐시를 action과 함께 사용하기 위해선, 아래와 같이 `Cache turbo build setup` 을 key와 restore-keys를 지정해서 사용하면 된다. 

```
// .github/workflows/deploy1.yml
...

- name: Check out code
  uses: actions/checkout@v4
  with:
    fetch-depth: 2

- name: Cache turbo build setup
  uses: actions/cache@v4
  with:
    path: .turbo
    key: ${{ runner.os }}-turbo-${{ github.sha }}
    restore-keys: |
      ${{ runner.os }}-turbo-

- uses: pnpm/action-setup@v3
  with:
    version: 8
...
```

단계적으로 빌드시간을 요약하자면
1. 하나의 yml 파일만 사용했을 때 : 2m 40s ~ 3m 소요
2. 세개의 yml 파일로 분리했을 때 : 1m 30s ~ 1m40s 소요
3. 터보 캐시를 사용했을 때 : 1m 10s 이하 소요

단계적으로 빌드시간을 단축 할 수 있었다.


## 4. 마무리
Turborepo를 도입한 이후, 새로운 프로젝트를 시작하는 데 걸리는 시간이 정말 많이 단축됐다. 이전보다 빌드 속도도 훨씬 빨라졌고, 복잡한 설정 없이도 쉽게 사용할 수 있어서 만족도가 높았다. 물론 의존성을 낮추는 작업은 예상보다 시간이 오래 걸리긴 했지만, 돌이켜보면 언젠가 꼭 필요한 작업이었고, 점점 모든 컴포넌트를 더 세밀하게 정리해야겠다는 생각도 들었다.

아쉬운 점은 프로젝트 규모가 커지면서 IDE가 가끔 파일 위치를 제대로 인식하지 못하는 경우가 있었다는 점이다. 다만, 이 문제는 이미 해결된 방법이 있을 수도 있어서 더 알아볼 필요가 있다.

소규모 프로젝트가 아닌, 점점 확장되는 서비스를 수월하게 관리하고 싶다면 Turborepo를 꼭 추천한다



> 참고
- https://engineering.linecorp.com/ko/blog/monorepo-with-turborepo
- https://medium.com/hcleedev/dev-monorepo-%EA%B0%9C%EB%85%90-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0-33fd3ce2b767
- https://dev.to/swyx/why-turborepo-will-be-the-first-big-trend-of-2022-4gfj
