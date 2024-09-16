import type { PaginationProps } from 'antd'

export function getPageInfo(
  data: {
    pageSize: number
    page: number
    pageCount: number
    [key: string]: any
  },
  pageInfo: {
    page?: number
    pageSize?: number
    showTotal?: boolean
    totalField?: string
    pageField?: string
    pageSizeField?: string
  }
): PaginationProps {
  const {
    showTotal,
    totalField = 'total',
    pageField = 'page',
    pageSizeField = 'pageSize',
  } = pageInfo as Record<string, any>

  const pagination: PaginationProps = {
    pageSize:
      data?.[pageSizeField] ||
      pageInfo?.[pageSizeField as keyof typeof pageInfo] ||
      10,
    pageSizeOptions: [10, 20, 100, 200],
    current:
      data?.[pageField] || pageInfo?.[pageField as keyof typeof pageInfo] || 1,
  }
  if (showTotal) {
    pagination.total =
      data?.[totalField] || pageInfo?.[totalField as keyof typeof pageInfo]
    pagination.showTotal = (total) => `共 ${total} 项`
  }
  return pagination
}
