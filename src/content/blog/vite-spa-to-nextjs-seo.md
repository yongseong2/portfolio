---
title: Vite SPA를 Next.js로 옮기며 SEO 챙기기
description: Vite SPA를 Next.js 16 App Router로 옮기면서 페이지마다 HTML을 미리 만들고 메타데이터, OG 이미지, sitemap, 구조화 데이터를 챙긴 과정과 막혔던 부분을 정리했다.
date: '2026-10-17T06:49:04.971Z'
series: frontend
tags:
  - Next.js
  - SEO
  - Vite
thumbnail: /assets/blog/vite-spa-to-nextjs-seo/thumbnail.webp
---
> React Router로 만든 Vite SPA를 Next.js 16 App Router로 옮기면서, 검색엔진이 읽을 수 있는 페이지를 만들기 위해 했던 작업을 정리했다.

## 1. 들어가며
### 1-1. 전환 배경
홈 화면 하나와 마크다운 블로그로 이뤄진 사이트를 Vite와 React Router로 운영하고 있었다. 블로그 글이 검색에 잘 잡히는지 신경 쓰이기 시작했는데, 빌드 결과물의 `index.html`을 열어보니 문제가 바로 보였다.

```html
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
```

body에는 텍스트가 한 글자도 없었다. 본문은 JS가 실행된 뒤에야 그려지고, 글 제목은 `useEffect`에서 `document.title`을 바꿔서 보여주고 있었다. 메타 태그도 `index.html`에 한 벌만 있으니 어느 글 주소로 들어와도 같은 title, description, OG 이미지가 나갔다. Vercel 설정은 모든 경로를 `index.html`로 보내는 rewrite였기 때문에, 없는 주소도 200으로 응답한 뒤 클라이언트에서 홈으로 이동했다.

### 1-2. 왜 Next.js인가
글은 마크다운 파일로 저장하고 있어서 빌드 시점에 모든 페이지를 알 수 있었다. 서버를 따로 두지 않고 빌드할 때 HTML을 미리 만드는 정적 생성(SSG)이면 충분했고, App Router의 `generateStaticParams`와 Metadata API가 이 목적에 잘 맞았다.

![Vite SPA는 모든 주소에 같은 빈 HTML을 보내고, Next.js 정적 생성은 주소마다 본문과 메타 태그가 들어간 HTML을 보낸다](/assets/blog/vite-spa-to-nextjs-seo/01-compare.webp)

## 2. 구조 옮기기
### 2-1. 라우터를 app 디렉터리로
React Router의 라우트 설정을 파일 구조로 옮겼다. `/`는 `app/page.tsx`, `/blog`는 `app/blog/page.tsx`, 글 상세는 `app/blog/[slug]/page.tsx`가 됐고, 블로그 전용 헤더와 푸터는 `app/blog/layout.tsx`로 뺐다.

주의할 점은 기존 `src/pages` 폴더였다. Next.js는 `pages` 디렉터리를 Pages Router로 인식하기 때문에, 페이지 컴포넌트를 모아두던 이 폴더는 `components` 쪽으로 옮겼다. `vercel.json`의 SPA rewrite도 Next.js 라우팅과 충돌하니 지웠다.

### 2-2. 글마다 HTML 미리 만들기
```tsx
// app/blog/[slug]/page.tsx
export const dynamicParams = false;

export const generateStaticParams = () =>
  getAllPosts().map((post) => ({ slug: post.slug }));
```

`generateStaticParams`가 돌려준 slug마다 빌드 때 페이지가 만들어진다. `dynamicParams = false`를 주면 목록에 없는 slug는 404가 되기 때문에, 이제 없는 주소는 실제 404 상태 코드로 응답한다.

![next build가 마크다운을 읽고, generateStaticParams로 경로를 만들고, 글마다 HTML과 OG 이미지를 만든 뒤 sitemap과 RSS까지 생성하는 순서](/assets/blog/vite-spa-to-nextjs-seo/02-build-flow.webp)

전환 후 글 하나의 첫 응답을 확인해보니 공백을 뺀 텍스트가 8,121자 들어 있었다. 전에는 0자였던 부분이다.

## 3. SEO 작업
### 3-1. 메타데이터
루트 레이아웃에 공통 값을 두고, 글 페이지에서는 `generateMetadata`로 글마다 title, description, canonical, Open Graph를 채웠다.

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${profile.name}` },
  description: profile.description,
  openGraph: { type: 'website', locale: 'ko_KR', url: '/' },
  twitter: { card: 'summary_large_image' },
};
```

`metadataBase`를 두면 canonical이나 OG URL을 `/blog/...` 같은 상대 경로로 써도 절대 주소로 바뀌어 나간다.

여기서 한 번 헷갈린 부분이 있었다. 루트에서 `twitter.card`를 `summary_large_image`로 줬는데, 글 페이지에서는 `twitter:card`가 `summary`로 나왔다. Next.js는 세그먼트별 메타데이터를 얕게(shallow) 병합해서, 하위 페이지가 `twitter` 객체를 정의하면 상위의 `twitter` 객체는 통째로 교체된다. 글 페이지에서 `title`과 `description`만 넣었더니 `card`가 빠진 것이다. 하위 페이지에도 `card`를 다시 적어서 해결했다. `openGraph`도 똑같이 동작하니, 공통 값은 변수로 빼서 펼쳐 쓰는 편이 안전하다.

### 3-2. sitemap, robots, RSS
`app/sitemap.ts`와 `app/robots.ts`는 객체를 반환하기만 하면 Next.js가 `/sitemap.xml`과 `/robots.txt`를 만들어 준다. 글 목록을 읽는 함수를 그대로 쓸 수 있어서, 글을 추가하면 sitemap도 같이 갱신된다.

```ts
// app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  return [
    { url: SITE_URL, lastModified: new Date(), priority: 1 },
    ...posts.map((post) => ({
      url: `${SITE_URL}${blogPostPath(post.slug)}`,
      lastModified: post.date,
    })),
  ];
}
```

RSS는 정해진 파일 규칙이 없어서 `app/blog/rss.xml/route.ts`에 Route Handler를 두고, `dynamic = 'force-static'`으로 빌드 때 파일로 만들었다.

### 3-3. 글마다 OG 이미지
링크를 공유할 때 보이는 이미지는 `opengraph-image.tsx` 파일 규칙과 `next/og`의 `ImageResponse`로 만들었다. 글 폴더에 이 파일을 두고 `generateStaticParams`를 같이 export하면 글마다 이미지가 빌드 때 생성되고, `og:image` 태그도 알아서 붙는다.

막혔던 건 한글이었다. 기본 폰트에는 한글 글리프가 없어서 Pretendard 파일을 직접 읽어 `fonts` 옵션으로 넣어야 했다. `ImageResponse`는 `ttf`, `otf`, `woff`만 지원하니 `woff2`는 쓸 수 없다. 긴 제목이 "프론트/엔드"처럼 단어 중간에서 끊기는 문제는 `wordBreak: 'keep-all'`로 잡았다.

```tsx
const loadFont = (file: string) =>
  readFile(path.join(process.cwd(), 'public/assets/fonts', file));

const bold = await loadFont('Pretendard-Bold.woff');

return new ImageResponse(<Card title={title} />, {
  width: 1200,
  height: 630,
  fonts: [{ name: 'Pretendard', data: bold, weight: 700, style: 'normal' }],
});
```

### 3-4. 구조화 데이터와 검색엔진 등록
홈에는 `Person`, 블로그 목록에는 `Blog`, 글에는 `BlogPosting` 타입의 JSON-LD를 넣었다. `JSON.stringify` 결과를 그대로 넣으면 문자열 속 `</script>`가 태그를 닫아버릴 수 있어서, 공식 문서 권장대로 `<`를 `<`로 바꿔 넣었다.

```tsx
export const JsonLd = ({ data }: { data: Record<string, unknown> }) => (
  <script
    type='application/ld+json'
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
  />
);
```

Google Search Console과 네이버 서치어드바이저의 소유 확인은 Metadata API의 `verification` 필드로 메타 태그를 넣어서 처리했다.

![SEO 작업 체크리스트: 페이지별 title·description·canonical, Open Graph와 OG 이미지, sitemap·robots·RSS, JSON-LD, 검색엔진 등록](/assets/blog/vite-spa-to-nextjs-seo/03-checklist.webp)

## 4. 옮기면서 막힌 부분
### 4-1. 서버 컴포넌트와 'use client'
App Router에서는 컴포넌트가 기본적으로 서버 컴포넌트다. 기존 컴포넌트는 대부분 훅이나 애니메이션을 쓰고 있어서 하나씩 `'use client'`를 붙였고, 결과적으로 `src`의 TS 파일 53개 중 20개에 `'use client'`가 들어갔다.

의외였던 건 react-icons였다. 아이콘이 내부에서 React Context를 읽는데 `'use client'` 선언이 없어서, 서버 컴포넌트에서 바로 쓰면 에러가 났다. 필요한 아이콘만 다시 내보내는 클라이언트 파일을 하나 두고, 서버 컴포넌트는 이 파일을 거쳐 쓰게 했다.

```ts
'use client';

export { HiArrowLeft, HiArrowRight } from 'react-icons/hi2';
```

### 4-2. 빌드 날짜에 굳는 값
경력 기간처럼 오늘 날짜를 기준으로 계산하는 값이 문제였다. 정적 생성을 하면 이 값이 빌드한 날짜로 HTML에 박히고, 브라우저에서 다시 계산하면 서버 HTML과 달라져 하이드레이션 불일치가 생길 수 있다.

그래서 빌드 시각을 `NEXT_PUBLIC_BUILD_TIME` 환경 변수로 넣고 `useSyncExternalStore`의 서버 스냅샷으로 썼다. 하이드레이션 때는 서버와 같은 빌드 시각을 쓰고, 그 뒤에 실제 날짜로 다시 그린다.

```ts
const BUILD_TIME = new Date(process.env.NEXT_PUBLIC_BUILD_TIME ?? 0);
let clientNow: Date | undefined;

const subscribe = () => () => {};
const getSnapshot = () => (clientNow ??= new Date());
const getServerSnapshot = () => BUILD_TIME;

export const useNow = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
```

다른 곳에서 `useSyncExternalStore`를 세 번째 인자 없이 쓰고 있었는데, 이 부분은 정적 생성 중에 바로 에러가 났다. 서버에서 렌더링되는 컴포넌트에서 `getServerSnapshot`을 생략하면 에러가 난다고 공식 문서에도 나와 있다.

### 4-3. 배포에서 실패한 lockfile
로컬 빌드는 통과했는데 Vercel 배포가 의존성 설치 단계에서 실패했다.

```text
ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date with <ROOT>/package.json
```

로컬에서는 npm으로 패키지를 설치하고 `pnpm-lock.yaml`은 따로 맞추고 있었는데, 마지막에 추가한 패키지 하나가 pnpm lockfile에 빠져 있었다. CI 환경에서는 `frozen-lockfile`이 기본값이라 lockfile과 `package.json`이 조금만 달라도 설치가 멈춘다. `pnpm install --lockfile-only`로 lockfile을 다시 맞춰서 해결했다. 패키지 매니저가 섞여 있으면 이런 일이 생기기 쉽다.

## 5. 마무리
SPA일 때 첫 응답의 본문이 0자였던 페이지가, 이제는 글마다 본문과 메타 태그가 담긴 HTML로 나간다. sitemap, RSS, OG 이미지도 같은 글 목록으로 빌드 때 함께 만들어져서, 글을 추가해도 따로 손댈 곳이 없다는 점이 가장 편했다.

아쉬운 점은 클라이언트 컴포넌트가 생각보다 많이 남았다는 점이다. 애니메이션과 스크롤 인터랙션이 많은 화면이라 20개 파일이 `'use client'`로 남았고, 서버 컴포넌트의 장점을 충분히 누리지는 못했다.

콘텐츠를 빌드 시점에 알 수 있는 SPA라면 서버 없이 정적 생성만으로도 검색엔진이 읽을 수 있는 페이지를 만들 수 있으니, Next.js 전환을 한 번 고려해보는 것을 추천한다.

## 6. 최종 코드
- [글 페이지 (app/blog/\[slug\]/page.tsx)](https://github.com/yongseong2/portfolio/blob/main/src/app/blog/%5Bslug%5D/page.tsx)
- [OG 이미지 렌더링 (lib/og.tsx)](https://github.com/yongseong2/portfolio/blob/main/src/lib/og.tsx)
- [sitemap (app/sitemap.ts)](https://github.com/yongseong2/portfolio/blob/main/src/app/sitemap.ts)

> 참고 링크
- [generateStaticParams | Next.js](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
- [generateMetadata | Next.js](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [ImageResponse | Next.js](https://nextjs.org/docs/app/api-reference/functions/image-response)
- [How to implement JSON-LD | Next.js](https://nextjs.org/docs/app/guides/json-ld)
- [useSyncExternalStore | React](https://react.dev/reference/react/useSyncExternalStore)
