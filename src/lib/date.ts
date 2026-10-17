const toMonthIndex = (ym: string) => {
  const [year, month] = ym.split('-').map(Number);
  return year * 12 + (month - 1);
};

const monthIndexOf = (date: Date) => date.getFullYear() * 12 + date.getMonth();

export const monthsInclusive = (start: string, end: string | undefined, now: Date) =>
  (end ? toMonthIndex(end) : monthIndexOf(now)) - toMonthIndex(start) + 1;

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
