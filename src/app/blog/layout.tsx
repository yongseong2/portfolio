import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { BlogFooter } from '../../components/blog/BlogFooter';
import { BlogHeader } from '../../components/blog/BlogHeader';
import { BLOG_DESCRIPTION, BLOG_TITLE } from '../../lib/site';

export const metadata: Metadata = {
  title: { default: BLOG_TITLE, template: `%s | ${BLOG_TITLE}` },
  description: BLOG_DESCRIPTION,
  openGraph: { siteName: BLOG_TITLE },
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <BlogHeader />
      {children}
      <BlogFooter />
    </>
  );
}
