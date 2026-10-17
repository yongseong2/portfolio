import { HiArrowRight } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { blogPostPath, formatPostDate, type BlogPost } from '../../data/blog';
import { PostThumbnail } from './PostThumbnail';

export const PostMeta = ({ post }: { post: BlogPost }) => (
  <div className='flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[13px] text-grey-500 md:text-[14px]'>
    <time dateTime={post.date} className='tabular-nums'>
      {formatPostDate(post.date)}
    </time>
    {post.tags.map((tag) => (
      <span key={tag} className='rounded-full bg-grey-100 px-2 py-0.5 text-grey-600'>
        #{tag}
      </span>
    ))}
  </div>
);

export const FeaturedPost = ({ post }: { post: BlogPost }) => (
  <Link
    to={blogPostPath(post.slug)}
    className='group grid items-center gap-6 rounded-[28px] bg-grey-50 p-3 transition duration-300 hover:shadow-lift active:scale-[0.99] md:grid-cols-[1.1fr_1fr] md:gap-10 md:p-4'
  >
    <PostThumbnail post={post} eager className='aspect-[16/10] rounded-[20px]' />
    <div className='px-3 pb-5 md:px-0 md:pb-0 md:pr-8'>
      <p className='text-[14px] font-semibold text-blue-500'>
        최신 글{post.series && <span className='text-grey-400'> · {post.series}</span>}
      </p>
      <h2 className='mt-2 text-[24px] font-bold leading-snug tracking-tight text-grey-900 transition-colors group-hover:text-blue-600 md:text-[30px]'>
        {post.title}
      </h2>
      {post.description && (
        <p className='mt-3 line-clamp-3 text-[16px] leading-relaxed text-grey-600 md:text-[17px]'>
          {post.description}
        </p>
      )}
      <div className='mt-5'>
        <PostMeta post={post} />
      </div>
      <span className='mt-6 inline-flex items-center gap-1 text-[15px] font-semibold text-blue-500'>
        글 읽기
        <HiArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
      </span>
    </div>
  </Link>
);

export const PostRow = ({ post }: { post: BlogPost }) => (
  <li className='border-b border-grey-100 last:border-b-0'>
    <Link to={blogPostPath(post.slug)} className='group flex items-center gap-5 py-7 md:gap-10 md:py-9'>
      <div className='min-w-0 flex-1'>
        {post.series && <p className='text-[13px] font-semibold text-blue-500 md:text-[14px]'>{post.series}</p>}
        <h3 className='mt-1.5 line-clamp-2 text-[18px] font-bold leading-snug tracking-tight text-grey-900 transition-colors group-hover:text-blue-600 md:text-[22px]'>
          {post.title}
        </h3>
        {post.description && (
          <p className='mt-2 line-clamp-2 text-[15px] leading-relaxed text-grey-600 md:text-[16px]'>
            {post.description}
          </p>
        )}
        <div className='mt-3'>
          <PostMeta post={post} />
        </div>
      </div>
      <PostThumbnail
        post={post}
        className='aspect-[4/3] w-24 shrink-0 rounded-2xl sm:w-36 md:aspect-[16/10] md:w-56'
      />
    </Link>
  </li>
);
