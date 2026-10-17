import fs from 'node:fs';
import path from 'node:path';
import type { Root, RootContent } from 'hast';
import { toString } from 'hast-util-to-string';
import { imageSize } from 'image-size';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

interface MdNode {
  type: string;
  value?: string;
  children?: MdNode[];
  [key: string]: unknown;
}

const attribute = (tag: string, name: string) =>
  new RegExp(`\\s${name}=["']([^"']*)["']`, 'i').exec(tag)?.[1];

// Raw HTML is not rendered (keeps posts safe without an HTML parser), except sized <img> tags,
// which become regular markdown images.
const remarkHtmlImages = () => (tree: MdNode) => {
  const visit = (node: MdNode) => {
    node.children = node.children?.map((child) => {
      if (child.type !== 'html' || !/^<img\s/i.test(child.value?.trim() ?? '')) {
        visit(child);
        return child;
      }
      const tag = child.value!;
      const image: MdNode = {
        type: 'image',
        url: attribute(tag, 'src') ?? '',
        alt: attribute(tag, 'alt') ?? '',
        data: { hProperties: { width: attribute(tag, 'width'), height: attribute(tag, 'height') } },
      };
      return node.type === 'root' ? { type: 'paragraph', children: [image] } : image;
    });
  };
  visit(tree);
};

const PUBLIC_DIR = path.join(process.cwd(), 'public');

const readImageSize = (src: string) => {
  try {
    return imageSize(fs.readFileSync(path.join(PUBLIC_DIR, decodeURI(src))));
  } catch {
    return undefined;
  }
};

// Local images get their intrinsic size at build time, so lazy images loading in while the reader
// scrolls (or jumps through the table of contents) no longer shift the content below them.
const rehypeImageSize = () => (tree: Root) => {
  const visit = (node: Root | RootContent) => {
    if (node.type === 'element' && node.tagName === 'img') {
      const src = String(node.properties.src ?? '');
      const size = src.startsWith('/') && !src.startsWith('//') ? readImageSize(src) : undefined;
      if (size?.width && size.height) {
        const width = parseInt(String(node.properties.width ?? ''), 10) || size.width;
        node.properties.width = width;
        node.properties.height = Math.round((width * size.height) / size.width);
      }
    }
    if ('children' in node) node.children.forEach(visit);
  };
  visit(tree);
};

// Shared by the renderer and the heading extractor, so the table of contents links to exactly
// the ids rehype-slug gives the rendered headings.
export const remarkPlugins = [remarkGfm, remarkHtmlImages];
export const rehypePlugins = [rehypeSlug, rehypeImageSize];

export interface Heading {
  id: string;
  text: string;
  level: number;
}

// Mirrors react-markdown's pipeline (it also keeps raw HTML through remark-rehype).
const headingProcessor = unified()
  .use(remarkParse)
  .use(remarkPlugins)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypePlugins);

export const extractHeadings = (markdown: string): Heading[] => {
  const headings: Heading[] = [];
  const visit = (node: Root | RootContent) => {
    if (node.type === 'element' && (node.tagName === 'h2' || node.tagName === 'h3')) {
      headings.push({ id: String(node.properties.id), text: toString(node), level: Number(node.tagName[1]) });
      return;
    }
    if ('children' in node) node.children.forEach(visit);
  };
  visit(headingProcessor.runSync(headingProcessor.parse(markdown)) as Root);
  return headings;
};
