export function chunkByPattern<T>(items: T[]) {
  const rows: T[][] = [];
  let i = 0;

  while (i < items.length) {
    // 3 portraits row
    rows.push(items.slice(i, i + 3));
    i += 3;

    // 2 landscapes row
    rows.push(items.slice(i, i + 2));
    i += 2;
  }

  return rows;
}
