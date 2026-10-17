import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { FeaturedPost, PostRow } from '../components/blog/PostItems';
import { EASE_OUT, Reveal } from '../components/ui/Reveal';
import { blogPosts as posts } from '../data/blog';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const ALL = 'all';

export const BlogPage = () => {
  const [series, setSeries] = useState(ALL);
  useDocumentTitle('seongyong2.blog');

  const filters = useMemo(() => {
    const counts = new Map<string, number>();
    posts.forEach((post) => {
      if (post.series) counts.set(post.series, (counts.get(post.series) ?? 0) + 1);
    });
    return [
      { key: ALL, label: '전체', count: posts.length },
      ...[...counts]
        .sort((a, b) => b[1] - a[1])
        .map(([name, count]) => ({ key: name, label: name, count })),
    ];
  }, []);

  const visible = series === ALL ? posts : posts.filter((post) => post.series === series);
  const [featured, ...rest] = visible;

  return (
    <main className='pb-24 pt-24 md:pb-32 md:pt-28'>
      <div className='mx-auto max-w-content px-5 md:px-8'>
        <h1 className='sr-only'>seongyong2.blog 글 목록</h1>

        <Reveal>
          <div
            role='tablist'
            aria-label='시리즈'
            className='no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0'
          >
            {filters.map((filter) => {
              const active = series === filter.key;
              return (
                <button
                  key={filter.key}
                  type='button'
                  role='tab'
                  aria-selected={active}
                  onClick={() => setSeries(filter.key)}
                  className={clsx(
                    'shrink-0 rounded-full px-4 py-2 text-[15px] font-semibold transition-colors duration-200',
                    active ? 'bg-grey-900 text-white' : 'bg-grey-100 text-grey-700 hover:bg-grey-200'
                  )}
                >
                  {filter.label}
                  <span className={clsx('ml-1.5 tabular-nums', active ? 'text-white/60' : 'text-grey-400')}>
                    {filter.count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.div
          key={series}
          className='mt-6 md:mt-8'
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
        >
          {featured ? (
            <>
              <FeaturedPost post={featured} />
              {rest.length > 0 && (
                <ul className='mt-4 md:mt-6' aria-label='글 목록'>
                  {rest.map((post) => (
                    <PostRow key={post.slug} post={post} />
                  ))}
                </ul>
              )}
            </>
          ) : (
            <p className='rounded-3xl bg-grey-50 px-6 py-16 text-center text-[16px] text-grey-500'>
              아직 이 시리즈에 올라온 글이 없어요.
            </p>
          )}
        </motion.div>
      </div>
    </main>
  );
};
