export type Column<R> = {
  key: keyof R | string;
  label: string;
  sortable?: boolean;
  accessor?: (row: R) => unknown;
  format?: (value: unknown, row: R) => unknown;
}

/** Sorting */
export type SortDir = 'asc' | 'desc'