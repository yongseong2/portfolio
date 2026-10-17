import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import diff from 'highlight.js/lib/languages/diff';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import markdown from 'highlight.js/lib/languages/markdown';
import plaintext from 'highlight.js/lib/languages/plaintext';
import shell from 'highlight.js/lib/languages/shell';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';
import ReactMarkdown, { type Components } from 'react-markdown';
import { Link } from 'react-router-dom';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

// Registering grammars one by one keeps the bundle small (aliases like ts/js/html/sh/yml come with them).
Object.entries({ bash, css, diff, javascript, json, markdown, plaintext, shell, typescript, xml, yaml }).forEach(
  ([name, language]) => hljs.registerLanguage(name, language)
);

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

const components: Components = {
  a: ({ node: _node, href = '', children, ...props }) => {
    if (href.startsWith('/') && !href.startsWith('//')) {
      return (
        <Link to={href} {...props}>
          {children}
        </Link>
      );
    }
    if (href.startsWith('#')) {
      return (
        <a href={href} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a href={href} target='_blank' rel='noopener noreferrer' {...props}>
        {children}
      </a>
    );
  },
  code: ({ node: _node, className, children, ...props }) => {
    const language = /language-([\w-]+)/.exec(className ?? '')?.[1];
    if (!language || !hljs.getLanguage(language)) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    // highlight.js escapes the source, so its HTML output is safe to inject.
    const { value } = hljs.highlight(String(children).replace(/\n$/, ''), { language, ignoreIllegals: true });
    return <code className={`hljs language-${language}`} dangerouslySetInnerHTML={{ __html: value }} />;
  },
  img: ({ node: _node, alt = '', ...props }) => <img alt={alt} loading='lazy' decoding='async' {...props} />,
  table: ({ node: _node, ...props }) => (
    <div className='overflow-x-auto'>
      <table {...props} />
    </div>
  ),
};

export const PostBody = ({ markdown }: { markdown: string }) => (
  <div className='post-body prose prose-lg max-w-none'>
    <ReactMarkdown remarkPlugins={[remarkGfm, remarkHtmlImages]} rehypePlugins={[rehypeSlug]} components={components}>
      {markdown}
    </ReactMarkdown>
  </div>
);
