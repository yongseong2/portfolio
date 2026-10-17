import type { MetadataRoute } from 'next';
import { blogPostPath } from '../data/blog';
import { getAllPosts } from '../lib/blog.server';
import { SITE_URL } from '../lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    {
      url: `${SITE_URL}/blog`,
      lastModified: posts[0]?.date ?? new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}${blogPostPath(post.slug)}`,
      lastModified: post.date,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ];
}
