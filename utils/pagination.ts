export const getPageItems = (
  center: number,
  length: number,
  count: number,
): number[] =>
  Array.from({ length }, (_, i) => i + 1)
    .sort((a, b) => Math.abs(a - center) - Math.abs(b - center))
    .slice(0, count)
    .sort((a, b) => a - b)
