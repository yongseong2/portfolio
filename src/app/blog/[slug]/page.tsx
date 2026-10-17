import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PostBody } from '../../../components/blog/PostBody';
import { PostMeta } from '../../../components/blog/PostItems';
import { TableOfContents } from '../../../components/blog/TableOfContents';
import { JsonLd } from '../../../components/JsonLd';
import { HiArrowLeft, HiArrowRight } from '../../../components/ui/icons';
import { blogPostPath, type BlogPost } from '../../../data/blog';
import { profile } from '../../../data/profile';
import { getAllPosts, getPostFile } from '../../../lib/blog.server';
import { extractHeadings } from '../../../lib/markdown';
import { BLOG_TITLE, SITE_URL } from '../../../lib/site';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export const generateStaticParams = () => getAllPosts().map((post) => ({ slug: post.slug }));

// Non-ASCII slugs can arrive percent-encoded depending on how the route was requested.
const decodeSlug = (slug: string) => {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
};

const loadPost = async (params: PostPageProps['params']) => getPostFile(decodeSlug((await params).slug));

export const generateMetadata = async ({ params }: PostPageProps): Promise<Metadata> => {
  const file = await loadPost(params);
  if (!file) return {};
  const { post } = file;
  const path = blogPostPath(post.slug);

  return {
    title: post.title,
    description: post.description || undefined,
    keywords: post.tags,
    alternates: {
      canonical: path,
      types: { 'application/rss+xml': [{ url: '/blog/rss.xml', title: BLOG_TITLE }] },
    },
    openGraph: {
      type: 'article',
      url: path,
      title: post.title,
      description: post.description || undefined,
      publishedTime: post.date,
      authors: [profile.name],
      tags: post.tags,
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description || undefined },
  };
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
    href={blogPostPath(post.slug)}
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

export default async function BlogPostPage({ params }: PostPageProps) {
  const file = await loadPost(params);
  if (!file) notFound();
  const { post, body } = file;

  const posts = getAllPosts();
  const index = posts.findIndex((item) => item.slug === post.slug);
  const older = posts[index + 1];
  const newer = posts[index - 1];
  const showCover = post.thumbnail && !body.includes(post.thumbnail);
  const url = `${SITE_URL}${blogPostPath(post.slug)}`;

  const postJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url,
    mainEntityOfPage: url,
    image: `${url}/opengraph-image`,
    keywords: post.tags.join(', '),
    inLanguage: 'ko-KR',
    author: { '@type': 'Person', name: profile.name, url: SITE_URL },
    publisher: { '@type': 'Person', name: profile.name, url: SITE_URL },
  };

  return (
    <main className='pb-24 pt-28 md:pb-32 md:pt-32'>
      <JsonLd data={postJsonLd} />
      <div className='mx-auto grid max-w-content gap-16 px-5 md:px-8 lg:grid-cols-[minmax(0,1fr)_220px]'>
        <div className='min-w-0'>
          <Link
            href='/blog'
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
              <span className='text-[13px] text-grey-400 md:text-[14px]'>· {readingMinutes(body)}분 분량</span>
            </div>
          </header>

          {showCover && (
            <img
              src={post.thumbnail!}
              alt=''
              className='mt-10 max-h-[460px] w-full rounded-[28px] bg-grey-50 object-contain'
            />
          )}

          <article className='mt-10 border-t border-grey-100 pt-10'>
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
              href='/blog'
              className='inline-flex h-12 items-center rounded-2xl bg-grey-100 px-6 text-[16px] font-semibold text-grey-800 transition hover:bg-grey-200 active:scale-[0.97]'
            >
              목록으로
            </Link>
          </div>
        </div>

        <aside className='hidden lg:block'>
          <TableOfContents headings={extractHeadings(body)} />
        </aside>
      </div>
    </main>
  );
}
