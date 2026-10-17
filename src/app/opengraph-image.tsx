import { profile } from '../data/profile';
import { OG_SIZE, renderOgCard } from '../lib/og';
import { SITE_TITLE } from '../lib/site';

export const alt = SITE_TITLE;
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return renderOgCard({
    eyebrow: profile.role,
    title: profile.headline.join(' '),
    description: 'React · React Native · Next.js로 앱과 웹을 만듭니다.',
    footer: `${profile.name} · seongyong2.vercel.app`,
  });
}
