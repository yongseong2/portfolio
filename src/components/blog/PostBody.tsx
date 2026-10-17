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
import Link from 'next/link';
import { rehypePlugins, remarkPlugins } from '../../lib/markdown';

// Registering grammars one by one keeps the bundle small (aliases like ts/js/html/sh/yml come with them).
Object.entries({ bash, css, diff, javascript, json, markdown, plaintext, shell, typescript, xml, yaml }).forEach(
  ([name, language]) => hljs.registerLanguage(name, language)
);

const components: Components = {
  a: ({ node: _node, href = '', children, ...props }) => {
    if (href.startsWith('/') && !href.startsWith('//')) {
      return (
        <Link href={href} {...props}>
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
    <ReactMarkdown remarkPlugins={remarkPlugins} rehypePlugins={rehypePlugins} components={components}>
      {markdown}
    </ReactMarkdown>
  </div>
);
