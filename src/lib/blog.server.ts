import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { BlogPost } from '../data/blog';

// Read at build time only: every blog route is statically generated from these files.
const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

interface PostFile {
  post: BlogPost;
  body: string;
}

const toIso = (value: unknown) => (value instanceof Date ? value.toISOString() : String(value));

const readPostFile = (file: string): PostFile => {
  const { data, content } = matter(fs.readFileSync(path.join(BLOG_DIR, file), 'utf8'));
  return {
    post: {
      // File names may be NFD on macOS; URLs and lookups use NFC.
      slug: path.basename(file, '.md').normalize('NFC'),
      title: String(data.title),
      description: data.description ? String(data.description) : '',
      date: toIso(data.date),
      series: data.series ? String(data.series) : null,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      thumbnail: data.thumbnail ? String(data.thumbnail) : null,
    },
    body: content,
  };
};

const readAll = () =>
  fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.md'))
    .map(readPostFile)
    .sort((a, b) => b.post.date.localeCompare(a.post.date));

export const getAllPosts = (): BlogPost[] => readAll().map(({ post }) => post);

export const getPostFile = (slug: string): PostFile | undefined =>
  readAll().find(({ post }) => post.slug === slug.normalize('NFC'));
