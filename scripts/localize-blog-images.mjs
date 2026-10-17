// Downloads velog CDN images referenced by src/content/blog/*.md into public/assets/blog
// and rewrites the posts to use the local copies, so the blog no longer depends on velog.
// Raster images are resized to the 2x content width and re-encoded as WebP (GIFs stay animated).
// Usage: npm run blog:localize-images   (safe to re-run; already-downloaded files are reused)
import { mkdir, readdir, readFile, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const CONTENT_DIR = path.resolve('src/content/blog');
const PUBLIC_DIR = path.resolve('public');
const IMAGE_DIR = path.join(PUBLIC_DIR, 'assets/blog');
const MAX_WIDTH = 1600;
const VELOG_IMAGE = /https:\/\/velog\.velcdn\.com\/images\/[^/\s]+\/post\/([0-9a-f-]{36})\/([^\s)"'<>]+)/g;

const exists = (file) =>
  access(file).then(
    () => true,
    () => false
  );

const download = async (url) => {
  const response = await fetch(url);
  const type = response.headers.get('content-type') ?? '';
  if (!response.ok || !type.startsWith('image/')) throw new Error(`${response.status} ${type} ${url}`);
  return Buffer.from(await response.arrayBuffer());
};

const toWebp = (buffer) =>
  sharp(buffer, { animated: true })
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toBuffer();

await mkdir(IMAGE_DIR, { recursive: true });

let downloaded = 0;
for (const name of (await readdir(CONTENT_DIR)).filter((file) => file.endsWith('.md'))) {
  const postFile = path.join(CONTENT_DIR, name);
  const source = await readFile(postFile, 'utf8');
  const localPaths = new Map();

  for (const [url, id, fileName] of source.matchAll(VELOG_IMAGE)) {
    if (localPaths.has(url)) continue;
    const isSvg = path.extname(decodeURIComponent(fileName)).toLowerCase() === '.svg';
    const file = path.join(IMAGE_DIR, `${id}${isSvg ? '.svg' : '.webp'}`);
    if (!(await exists(file))) {
      const original = await download(url);
      await writeFile(file, isSvg ? original : await toWebp(original));
      downloaded++;
    }
    localPaths.set(url, `/${path.relative(PUBLIC_DIR, file).split(path.sep).join('/')}`);
  }

  if (localPaths.size === 0) continue;
  const updated = source.replace(VELOG_IMAGE, (url) => localPaths.get(url));
  await writeFile(postFile, updated);
  console.log(`✓ ${name} (${localPaths.size} images)`);
}

console.log(`downloaded ${downloaded} new image(s) into ${path.relative(process.cwd(), IMAGE_DIR)}`);
