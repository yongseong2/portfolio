import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { PostSkeleton } from './components/blog/PostSkeleton';
import { BlogLayout } from './pages/BlogLayout';
import { BlogPage } from './pages/BlogPage';
import { HomePage } from './pages/HomePage';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: '/', element: <HomePage /> },
      {
        path: '/blog',
        element: <BlogLayout />,
        children: [
          { index: true, element: <BlogPage /> },
          {
            path: ':slug',
            // The markdown renderer and syntax highlighter only load when a post is opened.
            lazy: async () => {
              const { BlogPostPage, blogPostLoader } = await import('./pages/BlogPostPage');
              return { Component: BlogPostPage, loader: blogPostLoader };
            },
            hydrateFallbackElement: <PostSkeleton />,
          },
        ],
      },
      { path: '*', element: <Navigate to='/' replace /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
