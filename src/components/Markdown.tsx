import ReactMarkdown from 'react-markdown';
import './markdown.css';
import clsx from 'clsx';

interface MarkdownProps {
  children: string;
  className?: string;
  white?: boolean;
}

export const Markdown = ({ children, className, white }: MarkdownProps) => {
  return (
    <div
      className={clsx(
        'markdown-content',
        white && 'markdown-content-white',
        className
      )}
    >
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  );
};
