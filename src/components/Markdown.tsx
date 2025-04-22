import ReactMarkdown from 'react-markdown';
import './markdown.css';
import clsx from 'clsx';

interface MarkdownProps {
  children: string;
  className?: string;
}

export const Markdown = ({ children, className }: MarkdownProps) => {
  return (
    <div className={clsx('markdown-content', className)}>
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  );
};
