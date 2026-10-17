import { OG_SIZE, renderOgCard } from '../../lib/og';
import { BLOG_DESCRIPTION, BLOG_TITLE } from '../../lib/site';

export const alt = BLOG_TITLE;
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return renderOgCard({
    eyebrow: 'Blog',
    title: '개발하며 배운 것을 기록합니다',
    description: BLOG_DESCRIPTION,
    footer: BLOG_TITLE,
  });
}
