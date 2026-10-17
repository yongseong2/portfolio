import { useLayoutEffect, useRef } from 'react';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2';
import { Link, useLoaderData, useLocation, type LoaderFunctionArgs } from 'react-router-dom';
import { PostBody } from '../components/blog/PostBody';
import { PostMeta } from '../components/blog/PostItems';
import { TableOfContents } from '../components/blog/TableOfContents';
import { blogPostPath, blogPosts, findBlogPost, loadBlogPostBody, type BlogPost } from '../data/blog';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

// Loading the body before render lets ScrollRestoration land hashes and back/forward positions.
export const blogPostLoader = async ({ params }: LoaderFunctionArgs) => {
  const post = findBlogPost(params.slug ?? '');
  return { post: post ?? null, body: post ? await loadBlogPostBody(post.slug) : null };
};

// A post opened directly at `#heading` renders its body after ScrollRestoration already ran
// (on the loading fallback), so the first post render lands on the heading itself.
let isFirstPostRender = true;

const useLandOnInitialHash = () => {
  const { hash } = useLocation();
  useLayoutEffect(() => {
    if (!isFirstPostRender) return;
    isFirstPostRender = false;
    if (hash) document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
  }, [hash]);
};

const CHARS_PER_MINUTE = 600;

// Code blocks and image/link URLs are skimmed, so only prose counts toward reading time.
const readingMinutes = (markdown: string) => {
  const prose = markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/[#>*`_|-]/g, '')
    .replace(/\s+/g, '');
  return Math.max(1, Math.round(prose.length / CHARS_PER_MINUTE));
};

const AdjacentPost = ({ post, direction }: { post: BlogPost; direction: 'prev' | 'next' }) => (
  <Link
    to={blogPostPath(post.slug)}
    className={`group flex flex-col rounded-3xl bg-grey-50 p-6 transition hover:bg-grey-100 active:scale-[0.99] ${
      direction === 'next' ? 'sm:items-end sm:text-right' : ''
    }`}
  >
    <span className='inline-flex items-center gap-1 text-[13px] font-semibold text-grey-500'>
      {direction === 'prev' && <HiArrowLeft className='h-3.5 w-3.5' aria-hidden />}
      {direction === 'prev' ? '이전 글' : '다음 글'}
      {direction === 'next' && <HiArrowRight className='h-3.5 w-3.5' aria-hidden />}
    </span>
    <span className='mt-2 line-clamp-2 text-[16px] font-bold leading-snug text-grey-900 transition-colors group-hover:text-blue-600'>
      {post.title}
    </span>
  </Link>
);

export const BlogPostPage = () => {
  const { post, body } = useLoaderData() as Awaited<ReturnType<typeof blogPostLoader>>;
  const articleRef = useRef<HTMLElement>(null);
  useLandOnInitialHash();
  useDocumentTitle(post ? `${post.title} | seongyong2.blog` : '글을 찾을 수 없어요 | seongyong2.blog');

  if (!post || body === null) {
    return (
      <main className='mx-auto flex min-h-[70vh] max-w-content flex-col items-center justify-center px-5 text-center'>
        <p className='text-[15px] font-semibold text-blue-500'>404</p>
        <h1 className='mt-2 text-[28px] font-bold text-grey-900'>글을 찾을 수 없어요</h1>
        <Link
          to='/blog'
          className='mt-8 inline-flex h-12 items-center rounded-2xl bg-grey-100 px-6 text-[16px] font-semibold text-grey-800 transition hover:bg-grey-200'
        >
          블로그 목록으로
        </Link>
      </main>
    );
  }

  const index = blogPosts.findIndex((item) => item.slug === post.slug);
  const older = blogPosts[index + 1];
  const newer = blogPosts[index - 1];
  const minutes = readingMinutes(body);
  const showCover = post.thumbnail && !body.includes(post.thumbnail);

  return (
    <main className='pb-24 pt-28 md:pb-32 md:pt-32'>
      <div className='mx-auto grid max-w-content gap-16 px-5 md:px-8 lg:grid-cols-[minmax(0,1fr)_220px]'>
        <div className='min-w-0'>
          <Link
            to='/blog'
            className='inline-flex items-center gap-1 text-[15px] font-semibold text-grey-500 transition hover:text-grey-900'
          >
            <HiArrowLeft className='h-4 w-4' aria-hidden />
            전체 글
          </Link>

          <header className='mt-8'>
            {post.series && <p className='text-[14px] font-semibold text-blue-500'>{post.series}</p>}
            <h1 className='mt-2 text-[30px] font-bold leading-[1.3] tracking-tight text-grey-900 md:text-[40px]'>
              {post.title}
            </h1>
            {post.description && (
              <p className='mt-4 text-[17px] leading-relaxed text-grey-600 md:text-[19px]'>{post.description}</p>
            )}
            <div className='mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-2'>
              <PostMeta post={post} />
              <span className='text-[13px] text-grey-400 md:text-[14px]'>· {minutes}분 분량</span>
            </div>
          </header>

          {showCover && (
            <img
              src={post.thumbnail!}
              alt=''
              className='mt-10 max-h-[460px] w-full rounded-[28px] bg-grey-50 object-contain'
            />
          )}

          <article ref={articleRef} className='mt-10 border-t border-grey-100 pt-10'>
            <PostBody markdown={body} />
          </article>

          {(older || newer) && (
            <nav aria-label='다른 글' className='mt-16 grid gap-3 border-t border-grey-100 pt-10 sm:grid-cols-2'>
              {older ? <AdjacentPost post={older} direction='prev' /> : <span className='hidden sm:block' />}
              {newer && <AdjacentPost post={newer} direction='next' />}
            </nav>
          )}

          <div className='mt-10 flex justify-center'>
            <Link
              to='/blog'
              className='inline-flex h-12 items-center rounded-2xl bg-grey-100 px-6 text-[16px] font-semibold text-grey-800 transition hover:bg-grey-200 active:scale-[0.97]'
            >
              목록으로
            </Link>
          </div>
        </div>

        <aside className='hidden lg:block'>
          <TableOfContents articleRef={articleRef} contentKey={post.slug} />
        </aside>
      </div>
    </main>
  );
};
