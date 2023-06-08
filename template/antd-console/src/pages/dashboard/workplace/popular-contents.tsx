import React, { useState, useEffect, useCallback } from 'react'
import { Card, Radio, Table, Typography } from 'antd'
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import axios from 'axios'
import Link from '@/components/link'
import useLocale from './locale/useLocale'
import styles from './style/popular-contents.less?modules'

function PopularContent() {
  const locale = useLocale()
  const [type, setType] = useState(0)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const fetchData = useCallback(() => {
    setLoading(true)
    axios
      .get(
        `/api/workplace/popular-contents?page=${page}&pageSize=5&category=${type}`
      )
      .then((res) => {
        setData(res.data.list)
        setTotal(res.data.total)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [page, type])

  useEffect(() => {
    fetchData()
  }, [page, fetchData])

  const columns = [
    {
      title: locale['workplace.column.rank'],
      dataIndex: 'rank',
      width: 65,
    },
    {
      title: locale['workplace.column.title'],
      dataIndex: 'title',
      render: (
        x:
          | boolean
          | React.ReactChild
          | React.ReactFragment
          | React.ReactPortal
          | null
          | undefined
      ) => (
        <Typography.Paragraph style={{ margin: 0 }} ellipsis>
          {x}
        </Typography.Paragraph>
      ),
    },
    {
      title: locale['workplace.column.pv'],
      dataIndex: 'pv',
      width: 100,
      render: (text: number) => {
        return `${text / 1000}k`
      },
    },
    {
      title: locale['workplace.column.increase'],
      dataIndex: 'increase',
      sorter: (a: { increase: number }, b: { increase: number }) =>
        a.increase - b.increase,
      width: 110,
      render: (text: number) => {
        return (
          <span>
            {`${(text * 100).toFixed(2)}%`}
            <span className={styles['symbol']}>
              {text < 0 ? (
                <CaretUpOutlined style={{ color: 'rgb(var(--green-6))' }} />
              ) : (
                <CaretDownOutlined style={{ color: 'rgb(var(--red-6))' }} />
              )}
            </span>
          </span>
        )
      },
    },
  ]

  return (
    <Card
      title={locale['workplace.popularContents']}
      extra={<Link>{locale['workplace.seeMore']}</Link>}
      headStyle={{ borderBottom: 0 }}
    >
      <Radio.Group
        optionType="button"
        value={type}
        onChange={(e) => setType(e.target.value)}
        options={[
          { label: locale['workplace.text'], value: 0 },
          { label: locale['workplace.image'], value: 1 },
          { label: locale['workplace.video'], value: 2 },
        ]}
        style={{ marginBottom: 16 }}
      />
      <Table
        rowKey="rank"
        columns={columns}
        dataSource={data}
        loading={loading}
        tableLayout="fixed"
        onChange={(pagination) => {
          setPage(pagination.current || 1)
        }}
        pagination={{ total, current: page, pageSize: 5, simple: true }}
      />
    </Card>
  )
}

export default PopularContent
