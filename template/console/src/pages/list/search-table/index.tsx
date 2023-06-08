import React, { useState, useEffect, useMemo } from 'react'
import {
  Table,
  Card,
  PaginationProps,
  Button,
  Space,
} from '@arco-design/web-react'
import { IconDownload, IconPlus } from '@arco-design/web-react/icon'
import axios from 'axios'
import useLocale from '@/hooks/useLocale'
import SearchForm from './form'
import locales from './locale'
import styles from './style/index.less?modules'
import './mock'
import { getColumns } from './constants'

export const ContentType = ['图文', '横版短视频', '竖版短视频']
export const FilterType = ['规则筛选', '人工']
export const Status = ['已上线', '未上线']

function SearchTable() {
  const locale = useLocale(locales)

  const tableCallback = async (record: any, type: any) => {
    console.log(record, type)
  }

  const columns = useMemo(() => getColumns(locale, tableCallback), [locale])

  const [data, setData] = useState([])
  const [pagination, setPatination] = useState<PaginationProps>({
    sizeCanChange: true,
    showTotal: true,
    pageSize: 10,
    current: 1,
    pageSizeChangeResetCurrent: true,
  })
  const [loading, setLoading] = useState(true)
  const [formParams, setFormParams] = useState({})

  useEffect(() => {
    fetchData()
  }, [pagination.current, pagination.pageSize, JSON.stringify(formParams)])

  function fetchData() {
    const { current, pageSize } = pagination
    setLoading(true)
    axios
      .get('/api/list', {
        params: {
          page: current,
          pageSize,
          ...formParams,
        },
      })
      .then((res) => {
        setData(res.data.list)
        setPatination({
          ...pagination,
          current,
          pageSize,
          total: res.data.total,
        })
        setLoading(false)
      })
  }

  function onChangeTable(pagination: PaginationProps) {
    setPatination(pagination)
  }

  function handleSearch(params: Record<string, any>) {
    setFormParams(params)
  }

  return (
    <div>
      <Card
        title={locale['menu.list.searchTable']}
        headerStyle={{ border: 'none', height: 'auto', paddingTop: '20px' }}
      >
        <SearchForm onSearch={handleSearch} />
        <div className={styles['button-group']}>
          <Space>
            <Button type="primary" icon={<IconPlus />}>
              {locale['searchTable.operations.add']}
            </Button>
            <Button>{locale['searchTable.operations.upload']}</Button>
          </Space>
          <Space>
            <Button icon={<IconDownload />}>
              {locale['searchTable.operation.download']}
            </Button>
          </Space>
        </div>
        <Table
          rowKey="id"
          loading={loading}
          onChange={onChangeTable}
          pagination={pagination}
          columns={columns}
          data={data}
        />
      </Card>
    </div>
  )
}

export default SearchTable
