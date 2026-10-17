---
title: React에 런타임 환경 변수 사용하기
description: '쿠버네티스, 도커 환경에서 프론트 런타임 환경 변수 사용해본 경험'
date: '2025-01-22T06:08:20.335Z'
series: frontend
tags:
  - 도커
  - 쿠버네티스
  - 환경 변수
thumbnail: >-
  /assets/blog/e32d0518-4d80-43e0-83dd-b8f16cab6eae.svg
---
## 1. 환경 변수 분류
런타임 환경 변수를 다루기 전, 프론트 프레임 워크와 Kubernetes와 같은 시스템 환경에서 환경 변수를 어떻게 관리되는지 비교해보려고 한다.

### 1-1. 애플리케이션 전용 환경 변수
React에서는 `.env` 파일을 사용하여 애플리케이션 전용 환경 변수를 관리한다. 빌드 시점에 주입되며, 주로 API 엔드포인트, 키, 또는 기타 설정 값을 저장하는 데 사용된다. 

예를 들어, `.env` 파일에 다음과 같이 정의할 수 있다.

```
REACT_APP_API_URL=https://api.example.com
REACT_APP_EXAMPLE_ENV=example
```
위 환경 변수들은 보안상 중요한 키들을 숨기는데 유용하고, `process.env.REACT_APP_API_URL` 와 같은 방식으로 소스코드 상에서 접근이 가능하다. 하지만 **빌드 시점에서만 생성 되기에** 유연성 측면에서는 제한적일 수 있다.


### 1-2. 시스템 환경 변수
운영 체제 수준에서 관리되며, Kubernetes와 같은 오케스트레이션 도구를 통해 설정할 수 있다. 예를 들어, `ConfigMap`이나 `deployment.yaml` 파일을 사용하여 환경 변수를 정의할 수 있다.


**ConfigMap(해당 configmap 과 관련된 deployment.yaml은 생략):**
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  REACT_APP_API_URL: https://api.example.com
  REACT_APP_EXAMPLE_ENV: example
```

**Deplyoment.yaml:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: react-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: react-app
  template:
    metadata:
      labels:
        app: react-app
    spec:
      containers:
        - name: react-container
          image: your-react-app-image
          env:
            - name: REACT_APP_API_URL
              value: "https://api.example.com"
            - name: REACT_APP_EXAMPLE_ENV
              value: "example"

```

이렇게 정의한 환경 변수는 프론트엔드에서 직접 사용할 수 없다. 클라이언트 애플리케이션의 보안상의 이유와 브라우저에서만 동작하기 때문이다.

하지만 런타임 환경 변수를 사용하기 위해선 위 변수를 활용해야 한다. 해당 방법에 대해서 글을 작성해보려 한다.

## 2. 왜 필요할까?
> 1. 다양한 환경에서 종속성을 유지하자
2. 한번의 빌드만 하자

두가지 요구 사항을 충족하고 싶었다. 종속성을 유지하며 런타임 환경변수를 사용하기 위해 도커를, 한번의 빌드만 하기 위해 런타임 환경 변수를 사용했다.

### 2-1. 다양한 환경에서 같은 소스코드 유지
![예시 이미지](/assets/blog/e1a80f36-a79d-4922-8f25-ac5e089b97c1.webp)

도커를 활용해서 프론트 이미지를 빌드하고 쿠버네티스 팟으로 환경을 구성하면서 사용하게 됐다. 이미지를 특수한 환경에서만 사용하게끔 하는게 아니라 아래와 같은
> 1. 운영(SaaS)
2. 개발
3. 온프레미스(On-Premises)

모든 환경에서 환경변수만 달리 한다면, 같은 이미지를 재사용할 수 있게끔 구축하고 싶었다.


### 2-2. 빌드 시간 효율성 개선
런타임에서 환경 변수를 변경한다는 것은 재빌드가 필요 없다는 것을 의미한다. 소스 코드가 방대할 수록 빌드 시간이 더 많은 시간이 소요될 수 있다.

애플리케이션 전용 환경 변수가 아닌 시스템 환경 변수를 사용함에 따라 해당 팟의 정의된 환경 변수만 보고 이미지를 재사용할 수 있다.


## 3. 사용 방법
### 3-1. public/env-config.js 테스트

```javascript
// /public/env-config.js
window._env_ = {
  REACT_APP_API_URL: 'https://api.example.com',
  REACT_APP_EXAMPLE_ENV: 'example',
};
```
`public`폴더는 빌드가 된 이후, 빌드가 되기 전에도 같은 파일을 유지한다. `env-confg.js`라는 이름의 파일을 개발 환경에서 사용할 수 있게끔 테스트 해보려 한다.


```html
// index.html

<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <script src="/env-config.js"></script>
    <title>vite-react-app</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>
```

`index.html`에서 public에 있는 `env-config.js`에서 접근 할 수 있는 스크립트를 넣어준다. 

Vite를 사용했으며 CRA 환경에서는 `<script src="%PUBLIC_URL%/env-config.js"></script>` 와 같이 사용하면 된다.


```typescript
// Test.tsx
console.log(window._env_)
```

![test환경](/assets/blog/5665a6dc-0d02-47a5-930d-c643fec2c5ef.webp)

위와 같이 잘 출력되는 것을 확인할 수 있다.


### 3-2. env-creator.sh로 env-config.js 생성


```shell
#!/bin/sh

# 기존 env-config.js 제거 및 새로 생성
rm -rf /usr/share/nginx/html/env-config.js
touch /usr/share/nginx/html/env-config.js

# env-config.js에 환경변수 삽입
echo "window._env_ = {" > /usr/share/nginx/html/env-config.js

# 필요한 환경변수들 추가
echo "  REACT_APP_API_URL: \"${REACT_APP_API_URL}\"," >> /usr/share/nginx/html/env-config.js
echo "  REACT_APP_EXAMPLE_ENV: \"${REACT_APP_EXAMPLE_ENV}\"," >> /usr/share/nginx/html/env-config.js

echo "}" >> /usr/share/nginx/html/env-config.js
```

[위 yaml파일](/blog/React에-런타임-환경-변수-사용하기#1-2-%EC%8B%9C%EC%8A%A4%ED%85%9C-%ED%99%98%EA%B2%BD-%EB%B3%80%EC%88%98)에서 정의했던 환경 변수를 가져와 빌드가 완료 된 `/usr/share/nginx/html/` 경로에 `env-config.js`를 생성하는 shell 스크립트이다.

### 3-2. Dockerfile

```shell
# env-creator.sh 복사
COPY --from=build /apps/env-creator.sh /env-creator.sh

# CRLF을 LF로 변환 (CR 문자를 제거)
RUN sed -i 's/\r$//' /env-creator.sh

# 실행 권한 부여
RUN chmod +x /env-creator.sh

# nginx 서버를 실행하고 백그라운드로 동작하도록 한다
CMD ["sh", "-c", "/env-creator.sh && nginx -g 'daemon off;'"]
```

`Dockerfile`에서 `env-creator.sh`를 권한을 부여하고 컨테이너가 내려가고 올라갈 때 새롭게 해당 파일을 재실행하게끔 해준다.

### 3-3. 타입 에러
```typescript
// src/env-config.d.ts

export {};

declare global {
  interface Window {
    _env_: {
      REACT_APP_API_URL: string;
      REACT_APP_EXAMPLE_ENV: string;
    };
  }
}
```
타입스크립트를 사용한다면 `src`폴더 내에서 `*.d.ts` 파일을 생성해서 위와 같이 타입을 지정해주면 된다.

## 4. 트러블 슈팅
작업을 하면서 문제가 되었던 점, 문제가 될 점을 공유해보고자 한다.

### 4-1. CRLF, LF 오류
```shell
RUN sed -i 's/\r$//' /env-creator.sh
```
git 기본 설정으로 `autocrlf`라는 설정이 있어서 git에는 LF로 올라가지만 pull을 받을 때 CRLF로 shell 파일이 변환되는 문제가 있었다. 리눅스 환경에서 CRLF가 실행이 안되기 때문에 `Dockerfile`내에서 변환 시켜주었다.

### 4-2. 취약점


![취약 화면](/assets/blog/d848b190-6adf-405c-a6f1-4a79d24486da.webp)

`http://localhost:3000/env-config.js` 로컬에서 이 주소로 들어가게 되면 지정했던 모든 환경 변수가 노출되게 된다. 해당 이슈는 처음부터 예상되었는데 런타임에서 환경 변수를 사용하게 된다면 피할 수 없는 부분이라고 생각되어 진다.

nginx를 통해서 배포 후 해당 url 접근을 막는다거나 민감한 정보는 서버 사이드에서 관리될 수 있게끔 변경해야 하지 않나 싶다.

## 5. 마무리
쿠버네티스, 도커, 프론트엔드 환경에서 런타임 환경 변수를 사용해봤다. 

각 환경에 맞게 환경 변수만 수정하고 팟을 다시 내렸다 올리면 `env-config.js`와 같은 파일을 사용해 `.env`를 대체할 수 있다. 하지만 API 키와 같은 노출되면 안 되는 값은 절대 사용해서는 안 되며, 클라이언트보다는 서버에서 보관하는 것이 적절하다고 생각되어 진다.

추후에 `Next.js`의 SSR, SSG 환경에서도 비슷한 방법을 사용해 구축해보고 싶다.


> 참고 링크
- [프론트엔드에서 런타임 환경 변수 주입하기](https://techblog.uplus.co.kr/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%EC%97%90%EC%84%9C-%EB%9F%B0%ED%83%80%EC%9E%84-%ED%99%98%EA%B2%BD-%EB%B3%80%EC%88%98-%EC%A3%BC%EC%9E%85%ED%95%98%EA%B8%B0-d8848e6756de)
- [쿠버네티스 환경에서 리액트 앱 환경변수 주입하기](https://medium.com/@bestseob93/%EC%BF%A0%EB%B2%84%EB%84%A4%ED%8B%B0%EC%8A%A4-%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%95%B1-%ED%99%98%EA%B2%BD%EB%B3%80%EC%88%98-%EC%A3%BC%EC%9E%85%ED%95%98%EA%B8%B0-848db55eba42)
