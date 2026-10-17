export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  series: string | null;
  tags: string[];
  thumbnail: string | null;
}

export const blogPostPath = (slug: string) => `/blog/${encodeURIComponent(slug)}`;

export const formatPostDate = (iso: string) => {
  const date = new Date(iso);
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;
};
