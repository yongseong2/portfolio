---
title: HTTP 캐싱 제대로 이해하기
description: Cache-Control, ETag, 304가 각각 무슨 일을 하는지 정리하고, Vercel에 배포한 사이트의 응답 헤더와 브라우저 동작을 직접 확인하며 HTML과 정적 파일의 캐시 전략을 비교했다.
date: '2026-10-17T07:12:57.696Z'
series: frontend
tags:
  - HTTP
  - 캐싱
  - 브라우저
thumbnail: /assets/blog/http-caching-cache-control-etag/thumbnail.webp
---
> 배포된 사이트의 응답 헤더와 브라우저 동작을 직접 확인해보며 HTTP 캐싱의 기본을 정리했다.

## 1. 들어가며
### 1-1. max-age=0인데 캐시가 됐다?
Vercel에 배포한 Next.js 사이트의 응답 헤더를 보다가 이상한 점을 발견했다.

```bash
$ curl -sI https://seongyong2.vercel.app/
Cache-Control: public, max-age=0, must-revalidate
Etag: "f6a16ce6d1dd5e4c1b994bb3d15fad6a"
Age: 3992
X-Vercel-Cache: HIT
```

`max-age=0`이면 캐시하지 말라는 뜻 같은데, 정작 응답은 캐시에서 나왔고(`HIT`) 만들어진 지 3,992초가 지난 상태였다. 이 헤더를 제대로 읽으려면 캐시가 어디에 있는지, 신선도와 검증이 어떻게 다른지부터 알아야 했다.

### 1-2. 캐시는 두 군데에 있다
HTTP 캐시는 크게 두 종류다.
- **private 캐시**: 한 사용자만 쓰는 캐시다. 대표적으로 브라우저 캐시가 있다.
- **shared 캐시**: 서버와 사용자 사이에서 여러 사용자가 함께 쓰는 캐시다. CDN이나 프록시가 여기에 해당한다.

`Cache-Control`은 이 두 캐시에 함께 적용되고, `s-maxage`나 `private`처럼 한쪽에만 적용되는 지시어도 있다. 위의 수수께끼도 결국 두 캐시가 따로 움직이기 때문이었다.

## 2. 신선도: 언제까지 그냥 써도 되나
### 2-1. fresh와 stale
캐시에 저장된 응답은 **fresh**(그대로 재사용 가능)와 **stale**(확인이 필요한) 두 상태를 가진다. `max-age=N`은 응답이 만들어진 뒤 N초 동안 fresh라는 뜻이다. fresh인 동안 브라우저는 서버에 묻지도 않고 저장된 응답을 쓴다.

자주 쓰는 지시어는 이렇다.

| 지시어 | 의미 |
|---|---|
| `max-age=N` | N초 동안 fresh |
| `s-maxage=N` | shared 캐시(CDN)에서만 쓰는 fresh 기간 |
| `no-cache` | 저장은 하되, 쓸 때마다 서버에 확인 |
| `no-store` | 어디에도 저장하지 않음 |
| `must-revalidate` | stale이 되면 반드시 확인 후 사용 |
| `private` | 브라우저 같은 private 캐시에만 저장 |
| `immutable` | fresh인 동안 내용이 바뀌지 않음 |

### 2-2. no-cache는 캐시하지 말라는 뜻이 아니다
이름 때문에 가장 많이 오해하는 지시어다. `no-cache`는 저장을 막지 않는다. 저장은 하되 다시 쓰기 전에 서버에 확인하라는 뜻이다. 아예 저장하지 않으려면 `no-store`를 써야 한다. 다만 `no-store`는 뒤로가기 캐시 같은 이점까지 잃어서, 민감한 정보가 아니라면 남발하지 않는 편이 좋다고 MDN도 권한다.

## 3. 검증: ETag와 304
stale이 된 응답은 버리는 게 아니라 **검증**한다. 응답에 `ETag`가 있으면 브라우저는 다음 요청에 `If-None-Match`로 그 값을 실어 보내고, 내용이 그대로면 서버는 본문 없이 `304 Not Modified`만 돌려준다.

![stale이 된 응답을 If-None-Match로 확인하고, 304를 받으면 저장된 응답을 다시 fresh로 쓰는 흐름](/assets/blog/http-caching-cache-control-etag/01-revalidation.webp)

실제로 같은 HTML을 두 가지 방식으로 요청해봤다.

```bash
# 검증 헤더 없이
$ curl -s -o /dev/null -w "%{http_code}, %{size_download}B\n" https://seongyong2.vercel.app/
200, 166797B

# 받아둔 ETag로 조건부 요청
$ curl -s -o /dev/null -w "%{http_code}, %{size_download}B\n" \
  -H 'If-None-Match: "f6a16ce6d1dd5e4c1b994bb3d15fad6a"' https://seongyong2.vercel.app/
304, 0B
```

같은 페이지인데 한쪽은 166,797바이트를 받았고, 다른 쪽은 0바이트였다. `max-age=0`이라 매번 확인은 하지만, 바뀐 게 없으면 확인 비용만 든다.

## 4. 실제 사이트는 어떻게 하고 있나
### 4-1. 파일 종류마다 다른 헤더
같은 사이트에서 파일 종류별로 헤더를 비교해봤다.

| 파일 | Cache-Control |
|---|---|
| HTML, `public/` 폴더 파일, OG 이미지 | `public, max-age=0, must-revalidate` |
| `/_next/static/immutable/` 아래 JS, CSS, 폰트 | `public, max-age=31536000, immutable` |

빌드 결과물인 JS와 CSS는 파일명에 내용 해시가 들어간다. 내용이 바뀌면 파일명이 바뀌니 같은 주소의 내용은 절대 바뀌지 않고, 그래서 1년(31,536,000초) 동안 캐시해도 안전하다. 반대로 HTML은 주소가 그대로인 채 내용이 바뀌니 매번 확인하게 둔다. 새 배포가 바로 반영되는 이유이기도 하다.

![HTML은 max-age=0으로 매번 확인하고, 해시 파일명 정적 파일은 1년 immutable로 요청 자체를 하지 않는 차이](/assets/blog/http-caching-cache-control-etag/02-html-vs-hashed.webp)

### 4-2. 브라우저에서 직접 확인하기
헤드리스 Chrome으로 글 페이지 하나를 처음 방문하고, 다시 방문하고, 새로고침하면서 네트워크로 받은 양을 재봤다.

| 상황 | 네트워크로 받은 양 | 해시 파일 23개 |
|---|---|---|
| 첫 방문 | 5,869.7KB | 전부 네트워크 |
| 다시 방문 | 0.5KB | 디스크 캐시 (요청 없음) |
| 새로고침 | 0.6KB | 디스크 캐시 (요청 없음) |

다시 방문했을 때 HTML과 이미지는 `304`로 확인만 했고, 해시 파일은 요청 자체를 보내지 않았다. 눈에 띄는 건 새로고침이다. 원래 새로고침은 저장된 응답을 서버에 다시 확인하는데, `immutable`이 붙은 파일은 새로고침에도 요청을 보내지 않았다.

참고로 첫 방문 5.7MB 중 약 5.4MB는 Pretendard 폰트 파일 5개였다. 캐시 덕분에 두 번째부터는 0바이트지만, 첫 방문 비용은 따로 줄여야 할 숙제로 남았다.

### 4-3. CDN은 따로 캐시한다
처음 수수께끼의 답은 Vercel 문서에 있었다. 정적 파일은 첫 요청 이후 배포가 유지되는 동안 Vercel CDN에 자동으로 캐시된다. 브라우저에는 `max-age=0`으로 매번 확인하라고 하면서도, 그 확인 요청은 원본 서버까지 가지 않고 CDN이 바로 답한다. `X-Vercel-Cache: HIT`와 `Age`가 그 흔적이었다.

직접 CDN 캐시 시간을 정하고 싶을 때는 `s-maxage`를 쓴다. Vercel은 `Cache-Control`만 쓰면 `s-maxage`를 소비하고 브라우저로 보낼 때는 지운다. 그래서 `max-age=0, s-maxage=86400`처럼 주면 CDN은 하루 동안 캐시하고, 브라우저는 매번 최신 버전을 확인하게 된다.

## 5. 어떤 헤더를 줄까
정리하면 기준은 "같은 주소의 내용이 바뀔 수 있는가"다.

![캐시 헤더 선택 기준: 해시 파일은 immutable, HTML은 no-cache와 ETag, 사용자별 응답은 private, 민감 정보는 no-store, CDN은 s-maxage](/assets/blog/http-caching-cache-control-etag/03-checklist.webp)

- 파일명에 해시가 들어간 정적 파일은 `max-age=31536000, immutable`
- HTML처럼 주소가 고정된 문서는 `no-cache` 또는 `max-age=0`에 ETag를 함께 준다
- 로그인한 사용자마다 다른 응답은 `private`으로 CDN 캐시를 막는다
- 민감한 정보는 `no-store`
- CDN과 브라우저의 캐시 시간을 다르게 하고 싶으면 `s-maxage`를 따로 준다

## 6. 마무리
헤더 몇 줄의 의미를 실제 응답으로 확인해보니 차이가 숫자로 드러났다. 해시 파일명과 `immutable` 덕분에 두 번째 방문부터 네트워크로 받는 양이 5,869.7KB에서 0.5KB로 줄었고, 빌드 도구가 파일명에 해시를 붙이는 이유가 바로 이것이다.

아쉬운 점은 `public/` 폴더에 둔 파일은 해시가 없어서 매번 확인 요청이 나간다는 점이다. 자주 쓰는 큰 파일이라면 빌드 도구가 처리하도록 import해서 해시를 붙이는 편이 낫다.

캐시 헤더가 헷갈린다면 개발자 도구나 `curl -I`로 지금 쓰는 사이트의 응답 헤더부터 직접 열어보는 것을 추천한다. 이전 글 [Vite SPA를 Next.js로 옮기며 SEO 챙기기](/blog/vite-spa-to-nextjs-seo)에서 정적 생성으로 바꾼 페이지들이 이렇게 캐시되고 있다.

> 참고 링크
- [HTTP caching | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching)
- [Cache-Control | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control)
- [Cache-Control headers | Vercel](https://vercel.com/docs/caching/cache-control-headers)
- [Vercel CDN Cache | Vercel](https://vercel.com/docs/caching/cdn-cache)
