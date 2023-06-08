import React, { useEffect, useMemo, useState } from 'react'
import { Row, Col, Card, Table } from 'antd'
import useLocale from '@/hooks/useLocale'
import axios from 'axios'
import locale from './locale'
import PublicOpinion from './public-opinion'
import styles from './style/index.less?modules'
import MultiInterval from '@/components/chart/multi-stack-interval'
import PeriodLine from '@/components/chart/period-legend-line'
import './mock'

function DataAnalysis() {
  const t = useLocale(locale)
  const [loading, setLoading] = useState(false)
  const [tableLoading, setTableLoading] = useState(false)

  const [chartData, setChartData] = useState([])
  const [tableData, setTableData] = useState([])

  const getChartData = async () => {
    setLoading(true)
    const { data } = await axios
      .get('/api/data-analysis/content-publishing')
      .finally(() => setLoading(false))
    setChartData(data)
  }

  const getTableData = async () => {
    setTableLoading(true)
    const { data } = await axios
      .get('/api/data-analysis/author-list')
      .finally(() => setTableLoading(false))
    setTableData(data.list)
  }

  useEffect(() => {
    getChartData()
    getTableData()
  }, [])

  const columns = useMemo(() => {
    return [
      {
        title: t['dataAnalysis.authorTable.rank'],
        dataIndex: 'id',
      },
      {
        title: t['dataAnalysis.authorTable.author'],
        dataIndex: 'author',
      },
      {
        title: t['dataAnalysis.authorTable.content'],
        dataIndex: 'contentCount',
        sorter: (a: any, b: any) => a.contentCount - b.contentCount,
        render(x: any) {
          return Number(x).toLocaleString()
        },
      },
      {
        title: t['dataAnalysis.authorTable.click'],
        dataIndex: 'clickCount',
        sorter: (a: any, b: any) => a.clickCount - b.clickCount,
        render(x: any) {
          return Number(x).toLocaleString()
        },
      },
    ]
  }, [t])

  return (
    <div>
      <Card
        title={t['dataAnalysis.title.publicOpinion']}
        className={styles.wrapper}
      >
        <PublicOpinion />
      </Card>
      <Row gutter={16}>
        <Col span={14}>
          <Card
            title={t['dataAnalysis.title.publishingRate']}
            className={styles.wrapper}
          >
            <MultiInterval data={chartData} loading={loading} />
          </Card>
        </Col>
        <Col span={10}>
          <Card
            title={t['dataAnalysis.title.authorsList']}
            className={styles.wrapper}
          >
            <div style={{ height: '370px' }}>
              <Table
                rowKey="id"
                loading={tableLoading}
                pagination={false}
                dataSource={tableData}
                columns={columns}
                size='small'
                scroll={{ y: 315 }}
              />
            </div>
          </Card>
        </Col>
        <Col span={24}>
          <Card
            title={t['dataAnalysis.title.publishingTiming']}
            className={styles.wrapper}
          >
            <PeriodLine data={chartData} loading={loading} />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
export default DataAnalysis
