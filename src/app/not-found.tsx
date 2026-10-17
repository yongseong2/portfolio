import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '페이지를 찾을 수 없어요',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className='mx-auto flex min-h-screen max-w-content flex-col items-center justify-center px-5 text-center'>
      <p className='text-[15px] font-semibold text-blue-500'>404</p>
      <h1 className='mt-2 text-[28px] font-bold text-grey-900'>페이지를 찾을 수 없어요</h1>
      <div className='mt-8 flex gap-2'>
        <Link
          href='/'
          className='inline-flex h-12 items-center rounded-2xl bg-blue-500 px-6 text-[16px] font-semibold text-white transition hover:bg-blue-600'
        >
          포트폴리오로
        </Link>
        <Link
          href='/blog'
          className='inline-flex h-12 items-center rounded-2xl bg-grey-100 px-6 text-[16px] font-semibold text-grey-800 transition hover:bg-grey-200'
        >
          블로그로
        </Link>
      </div>
    </main>
  );
}
