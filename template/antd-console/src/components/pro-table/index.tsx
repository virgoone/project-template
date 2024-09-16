import DashboardHeader from '@/components/dashboard/header'

import EmptyBox from '@/components/empty-box'
import { formatDate } from '@/utils/format'

import { useQuery } from '@tanstack/react-query'
import { Table } from 'antd'
import React, { useMemo, useState } from 'react'
import type { ColumnProps, TableProps } from 'antd/es/table'
import SearchForm from './form'
import { getPageInfo } from './getPageInfo'

import type { FormOptions } from './form'

const DEFAULT_QUERY_DATA = {
  startTime: '',
  endTime: '',
  pageNum: 1,
  pageSize: 10,
}
interface ITableProps
  extends Omit<
    TableProps,
    'dataSource' | 'loading' | 'rowKey' | 'pagination'
  > {}

export interface IPaginationProps {
  showTotal?: boolean
  totalField?: string
  pageField?: string
  pageSizeField?: string
}

interface ProTableProps {
  title: string | React.ReactNode
  subtitle?: string | React.ReactNode
  empty?: React.ReactNode
  queryKey: string
  columns: ColumnProps<any>[]
  defaultQueryData?: Record<string, any>
  children?: React.ReactNode
  operation?: React.ReactNode
  showPagination?: boolean
  showCreatedTime?: boolean
  showSearchForm?: boolean
  pagination?: IPaginationProps
  formOptions?: FormOptions[]
  showHeader?: boolean
  createdTimeText?: string
  tableProps?: ITableProps
  queryFn: (params?: any) => Promise<any>
}

export default function ProTable(props: ProTableProps) {
  const {
    title,
    subtitle,
    columns,
    queryKey,
    queryFn,
    empty,
    defaultQueryData = {},
    children,
    operation,
    showCreatedTime,
    formOptions = [],
    showPagination = true,
    showSearchForm = true,
    showHeader = true,
    tableProps,
    createdTimeText,
    pagination = {
      showTotal: true,
      totalField: 'total',
      pageField: 'pageNum',
      pageSizeField: 'pageSize',
    },
  } = props
  const [queryData, setQueryData] = useState({
    ...DEFAULT_QUERY_DATA,
    ...defaultQueryData,
  })
  const {
    data: res,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [queryKey, queryData],
    queryFn: async () => {
      return queryFn({
        ...queryData,
      })
    },
  })
  const EmptyPlaceholder = useMemo(() => {
    if (empty) {
      return <div>{empty}</div>
    }
    return <span>暂无数据</span>
  }, [empty])

  function handleSearch(params: Record<string, any>) {
    const { createdTime = [], ..._params } = params
    const newQueryData = {
      ...queryData,
      ..._params,
    }
    if (createdTime[0]) {
      newQueryData.startTime = formatDate(createdTime[0])
    } else {
      newQueryData.startTime = ''
    }
    if (createdTime[1]) {
      newQueryData.endTime = formatDate(createdTime[1])
    } else {
      newQueryData.endTime = ''
    }
    setQueryData(newQueryData)
    refetch()
  }
  const loading = isLoading || isFetching

  return (
    <DashboardHeader
      title={title}
      separator={!showSearchForm}
      subtitle={subtitle}
      showHeader={showHeader}
    >
      {showSearchForm && (
        <SearchForm
          initialValues={defaultQueryData}
          formOptions={formOptions}
          showCreatedTime={showCreatedTime}
          loading={loading}
          onSearch={handleSearch}
          createdTimeText={createdTimeText}
        />
      )}
      {children}
      {!!operation && (
        <div className="flex justify-between mb-5">{operation}</div>
      )}
      <div className="mt-4 rounded">
        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={res?.rows ?? []}
          pagination={
            showPagination
              ? {
                  ...getPageInfo(res, {
                    page: queryData.pageNum,
                    pageSize: queryData.pageSize,
                    ...pagination,
                  }),
                  onChange: (pageIndexber, pageSize) => {
                    setQueryData({
                      ...queryData,
                      pageNum: pageIndexber,
                      pageSize,
                    })
                  },
                }
              : false
          }
          scroll={{
            x: 1142,
          }}
          locale={{
            emptyText: <EmptyBox>{EmptyPlaceholder}</EmptyBox>,
          }}
          {...tableProps}
        />
      </div>
    </DashboardHeader>
  )
}
