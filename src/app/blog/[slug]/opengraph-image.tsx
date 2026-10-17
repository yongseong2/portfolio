import { getAllPosts, getPostFile } from '../../../lib/blog.server';
import { OG_SIZE, renderOgCard } from '../../../lib/og';
import { BLOG_TITLE } from '../../../lib/site';

export const alt = BLOG_TITLE;
export const size = OG_SIZE;
export const contentType = 'image/png';
export const dynamicParams = false;

export const generateStaticParams = () => getAllPosts().map((post) => ({ slug: post.slug }));

const decodeSlug = (slug: string) => {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
};

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPostFile(decodeSlug((await params).slug))?.post;

  return renderOgCard({
    eyebrow: post?.series ? `${BLOG_TITLE} · ${post.series}` : BLOG_TITLE,
    title: post?.title ?? BLOG_TITLE,
    description: post?.description,
    footer: '김성용 · Frontend Engineer',
  });
}
