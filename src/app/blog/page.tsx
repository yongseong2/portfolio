import type { Metadata } from 'next';
import { BlogList } from '../../components/blog/BlogList';
import { JsonLd } from '../../components/JsonLd';
import { blogPostPath } from '../../data/blog';
import { profile } from '../../data/profile';
import { getAllPosts } from '../../lib/blog.server';
import { BLOG_DESCRIPTION, BLOG_TITLE, SITE_URL } from '../../lib/site';

export const metadata: Metadata = {
  title: { absolute: BLOG_TITLE },
  description: BLOG_DESCRIPTION,
  alternates: {
    canonical: '/blog',
    types: { 'application/rss+xml': [{ url: '/blog/rss.xml', title: BLOG_TITLE }] },
  },
  openGraph: { type: 'website', url: '/blog', title: BLOG_TITLE, description: BLOG_DESCRIPTION },
  twitter: { card: 'summary_large_image', title: BLOG_TITLE, description: BLOG_DESCRIPTION },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    url: `${SITE_URL}/blog`,
    inLanguage: 'ko-KR',
    author: { '@type': 'Person', name: profile.name, url: SITE_URL },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${SITE_URL}${blogPostPath(post.slug)}`,
      datePublished: post.date,
    })),
  };

  return (
    <>
      <JsonLd data={blogJsonLd} />
      <BlogList posts={posts} />
    </>
  );
}
