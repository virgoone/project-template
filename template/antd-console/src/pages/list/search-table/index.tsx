import React, { useState, useEffect, useMemo } from 'react'
import { Table, Card, PaginationProps, Button, Space } from 'antd'
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons'
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
const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`
function SearchTable() {
  const locale = useLocale(locales)

  const tableCallback = async (record: any, type: any) => {
    console.log(record, type)
  }

  const columns = useMemo(() => getColumns(locale, tableCallback), [locale])

  const [data, setData] = useState([])
  const [pagination, setPatination] = useState<PaginationProps>({
    showSizeChanger: true,
    showTotal,
    pageSize: 10,
    current: 1,
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
        headStyle={{ border: 'none', height: 'auto', paddingTop: '20px' }}
      >
        <SearchForm onSearch={handleSearch} />
        <div className={styles['button-group']}>
          <Space>
            <Button type="primary" icon={<PlusOutlined />}>
              {locale['searchTable.operations.add']}
            </Button>
            <Button>{locale['searchTable.operations.upload']}</Button>
          </Space>
          <Space>
            <Button icon={<DownloadOutlined />}>
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
          dataSource={data}
        />
      </Card>
    </div>
  )
}

export default SearchTable
