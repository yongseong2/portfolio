// Imports every velog post of USERNAME into src/content/blog as markdown with frontmatter.
// Usage: npm run blog:import-velog   (overwrites files with the same slug)
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const USERNAME = 'yongseong2';
const OUT_DIR = path.resolve('src/content/blog');
const API = 'https://v2.velog.io/graphql';

const gql = async (query, variables) => {
  const response = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  const json = await response.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
};

// Dots and filesystem-reserved characters break dev-server routing and Windows file names.
const toSlug = (velogSlug) =>
  velogSlug
    .replace(/[.\\/:*?"<>|#%]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const listPosts = async () => {
  const posts = [];
  let cursor = null;
  for (;;) {
    const { posts: batch } = await gql(
      `query ($username: String, $cursor: ID) {
        posts(username: $username, cursor: $cursor, limit: 50) { id url_slug }
      }`,
      { username: USERNAME, cursor }
    );
    posts.push(...batch);
    if (batch.length < 50) return posts;
    cursor = batch.at(-1).id;
  }
};

const summaries = await listPosts();
const slugMap = new Map(summaries.map(({ url_slug }) => [url_slug, toSlug(url_slug)]));

// Links between posts should stay on this site after the move.
const rewriteInternalLinks = (body) =>
  body.replace(/https:\/\/velog\.io\/@yongseong2\/([^\s)"'#?]+)/g, (match, encodedSlug) => {
    const slug = slugMap.get(decodeURIComponent(encodedSlug));
    return slug ? `/blog/${slug}` : match;
  });

await mkdir(OUT_DIR, { recursive: true });

for (const { url_slug } of summaries) {
  const { post } = await gql(
    `query ($username: String, $url_slug: String) {
      post(username: $username, url_slug: $url_slug) {
        title short_description thumbnail released_at tags body series { name }
      }
    }`,
    { username: USERNAME, url_slug }
  );

  const slug = slugMap.get(url_slug);
  const frontmatter = {
    title: post.title,
    description: (post.short_description ?? '').replace(/\s+/g, ' ').trim(),
    date: post.released_at,
    series: post.series?.name ?? null,
    tags: post.tags,
    thumbnail: post.thumbnail,
  };
  const body = rewriteInternalLinks(post.body.replace(/\r\n/g, '\n')).trim() + '\n';
  await writeFile(path.join(OUT_DIR, `${slug}.md`), matter.stringify(body, frontmatter));
  console.log(`✓ ${slug}`);
}

console.log(`\n${summaries.length} posts written to ${path.relative(process.cwd(), OUT_DIR)}`);
