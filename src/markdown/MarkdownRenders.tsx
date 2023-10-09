/** @jsxImportSource @emotion/react */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import colors from '../libs/design/colors';
import rehypeRaw from 'rehype-raw';

interface Props {
  content: string;
}

export function MarkdownRenderer({ content }: Props) {
  return (
    <div
      css={{
        color: colors.black,
        lineHeight: 1.6,
        fontFamily: '"SUITE" ,Helvetica Neue, sans-serif',
        fontSize: '16px',
        fontWeight: 400,
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        '& h1, & h2, & h3, & h4, & h5, & h6': {
          borderBottom: '1px solid rgba(55, 53, 47, 0.09)',
          paddingBottom: '8px',
          marginBottom: '16px',
        },
        '& ul, & ol': {
          paddingLeft: '20px',
        },
        '& blockquote': {
          paddingLeft: '14px',
          borderLeft: '3px solid rgba(55, 53, 47, 0.09)',
          color: 'rgba(55, 53, 47, 0.6)',
          marginLeft: 0,
        },
        '& code': {
          backgroundColor: 'rgba(55, 53, 47, 0.09)',
          padding: '2px 4px',
          borderRadius: '3px',
        },
      }}
    >
      <ReactMarkdown
        rehypePlugins={[rehypeRaw] as any}
        components={{
          img: ({ node, ...props }) => (
            <img
              {...props}
              alt={props.alt}
              style={{
                maxWidth: '100%',
                maxHeight: '500px',
                display: 'block',
                margin: '10px auto',
              }}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
