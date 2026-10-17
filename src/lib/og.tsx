import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };

// The default OG font has no Korean glyphs, so the site's own Pretendard files are embedded.
const loadFont = (file: string) => readFile(path.join(process.cwd(), 'public/assets/fonts', file));

interface OgCardProps {
  eyebrow: string;
  title: string;
  description?: string;
  footer: string;
}

export const renderOgCard = async ({ eyebrow, title, description, footer }: OgCardProps) => {
  const [bold, medium] = await Promise.all([loadFont('Pretendard-Bold.woff'), loadFont('Pretendard-Medium.woff')]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#ffffff',
          fontFamily: 'Pretendard',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 30, fontWeight: 700, color: '#3182f6' }}>{eyebrow}</div>
          <div
            style={{
              display: 'flex',
              marginTop: 28,
              fontSize: title.length > 28 ? 60 : 72,
              fontWeight: 700,
              lineHeight: 1.25,
              letterSpacing: '-0.03em',
              wordBreak: 'keep-all',
              color: '#191f28',
            }}
          >
            {title}
          </div>
          {description && (
            <div style={{ display: 'flex', marginTop: 28, fontSize: 30, fontWeight: 500, lineHeight: 1.5, color: '#6b7684', wordBreak: 'keep-all' }}>
              {description.length > 70 ? `${description.slice(0, 70)}…` : description}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', fontSize: 28, fontWeight: 700, color: '#191f28' }}>{footer}</div>
          <div style={{ display: 'flex', width: 120, height: 10, borderRadius: 999, background: '#3182f6' }} />
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Pretendard', data: bold, weight: 700, style: 'normal' },
        { name: 'Pretendard', data: medium, weight: 500, style: 'normal' },
      ],
    }
  );
};
