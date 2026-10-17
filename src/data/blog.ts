export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  series: string | null;
  tags: string[];
  thumbnail: string | null;
}

// Frontmatter is bundled eagerly for lists; each body stays in its own lazily loaded chunk.
const metaModules = import.meta.glob<BlogPost>('/src/content/blog/*.md', {
  query: '?meta',
  import: 'default',
  eager: true,
});
const bodyLoaders = import.meta.glob<string>('/src/content/blog/*.md', { import: 'default' });

export const blogPosts: BlogPost[] = Object.values(metaModules)
  .map((post) => ({ ...post, tags: post.tags ?? [], series: post.series ?? null }))
  .sort((a, b) => b.date.localeCompare(a.date));

export const findBlogPost = (slug: string) => blogPosts.find((post) => post.slug === slug);

export const loadBlogPostBody = (slug: string) => {
  const load = bodyLoaders[`/src/content/blog/${slug}.md`];
  return load ? load() : Promise.reject(new Error(`No post body for ${slug}`));
};

export const blogPostPath = (slug: string) => `/blog/${encodeURIComponent(slug)}`;

export const formatPostDate = (iso: string) => {
  const date = new Date(iso);
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;
};
