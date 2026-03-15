export type Pagination = {
  currentPage: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages?: number;
  totalItems: number;
}