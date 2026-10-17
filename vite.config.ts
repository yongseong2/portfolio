import matter from 'gray-matter';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const BLOG_DIR = '/src/content/blog/';

// Blog posts are markdown files with YAML frontmatter.
// `post.md?meta` -> frontmatter only (eagerly bundled for the list), `post.md` -> body (lazy chunk per post).
const blogContent = (): Plugin => ({
  name: 'blog-content',
  enforce: 'pre',
  load(id) {
    const [file, query] = id.split('?');
    if (!file.includes(BLOG_DIR) || !file.endsWith('.md')) return null;

    const { data, content } = matter.read(file);
    if (query === 'meta') {
      const slug = file.slice(file.lastIndexOf('/') + 1, -'.md'.length);
      return `export default ${JSON.stringify({ ...data, slug })};`;
    }
    return `export default ${JSON.stringify(content)};`;
  },
});

export default defineConfig({
  plugins: [blogContent(), react()],
});
