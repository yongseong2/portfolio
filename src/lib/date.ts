const toMonthIndex = (ym: string) => {
  const [year, month] = ym.split('-').map(Number);
  return year * 12 + (month - 1);
};

const currentMonthIndex = () => {
  const now = new Date();
  return now.getFullYear() * 12 + now.getMonth();
};

export const monthsInclusive = (start: string, end?: string) =>
  (end ? toMonthIndex(end) : currentMonthIndex()) - toMonthIndex(start) + 1;

export const formatDuration = (months: number) => {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return [years > 0 && `${years}년`, rest > 0 && `${rest}개월`]
    .filter(Boolean)
    .join(' ');
};

export const formatYm = (ym: string) => ym.replace('-', '.');

export const formatPeriod = (start: string, end?: string) =>
  `${formatYm(start)} – ${end ? formatYm(end) : '재직 중'}`;
