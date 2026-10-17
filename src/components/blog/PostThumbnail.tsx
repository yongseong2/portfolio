import clsx from 'clsx';
import type { BlogPost } from '../../data/blog';

export const PostThumbnail = ({
  post,
  className,
  eager = false,
}: {
  post: BlogPost;
  className?: string;
  eager?: boolean;
}) => (
  <div className={clsx('overflow-hidden bg-grey-100', className)}>
    {post.thumbnail ? (
      <img
        src={post.thumbnail}
        alt=''
        loading={eager ? 'eager' : 'lazy'}
        decoding='async'
        className='h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]'
      />
    ) : (
      <div className='flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 to-grey-100'>
        <span className='text-[15px] font-semibold text-blue-400'>{post.series ?? 'velog'}</span>
      </div>
    )}
  </div>
);
