import { Outlet } from 'react-router-dom';
import { BlogFooter } from '../components/blog/BlogFooter';
import { BlogHeader } from '../components/blog/BlogHeader';

export const BlogLayout = () => (
  <>
    <BlogHeader />
    <Outlet />
    <BlogFooter />
  </>
);
