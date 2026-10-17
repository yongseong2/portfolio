// Shown while a post opened directly by URL loads its page chunk and body.
export const PostSkeleton = () => (
  <main className='mx-auto max-w-content px-5 pt-28 md:px-8 md:pt-32' aria-busy='true'>
    <div className='max-w-[720px] animate-pulse space-y-5'>
      <div className='h-4 w-20 rounded-full bg-grey-100' />
      <div className='h-10 w-4/5 rounded-xl bg-grey-100' />
      <div className='h-5 w-3/5 rounded-full bg-grey-100' />
      <div className='mt-10 h-64 rounded-3xl bg-grey-50' />
    </div>
  </main>
);
