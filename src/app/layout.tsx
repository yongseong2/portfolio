import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';
import { Providers } from '../components/Providers';
import { profile } from '../data/profile';
import { SITE_TITLE, SITE_URL } from '../lib/site';
import './globals.css';

const pretendard = localFont({
  src: [
    { path: '../../public/assets/fonts/Pretendard-Regular.woff', weight: '400' },
    { path: '../../public/assets/fonts/Pretendard-Medium.woff', weight: '500' },
    { path: '../../public/assets/fonts/Pretendard-SemiBold.woff', weight: '600' },
    { path: '../../public/assets/fonts/Pretendard-Bold.woff', weight: '700' },
    { path: '../../public/assets/fonts/Pretendard-ExtraBold.woff', weight: '800' },
  ],
  variable: '--font-pretendard',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${profile.name}` },
  description: profile.description,
  applicationName: SITE_TITLE,
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  keywords: ['프론트엔드 개발자', profile.name, 'React', 'React Native', 'Next.js', 'TypeScript', '포트폴리오'],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: SITE_TITLE,
    title: SITE_TITLE,
    description: profile.description,
    url: '/',
  },
  twitter: { card: 'summary_large_image', title: SITE_TITLE, description: profile.description },
  robots: { index: true, follow: true },
  icons: { icon: '/assets/images/favicon.svg' },
  // Search Console ownership; removing it un-verifies the property.
  verification: { google: 'C4HLx2h73cGoF7BI7t_DFZvDmXYo2E8-wWT3qblf63c' },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='ko' className={pretendard.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
