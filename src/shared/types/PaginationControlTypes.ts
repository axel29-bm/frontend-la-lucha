export interface PaginationControlsProps {
  page: number
  pageCount: number
  setPage: (n: number) => void
  isMobile: boolean
}