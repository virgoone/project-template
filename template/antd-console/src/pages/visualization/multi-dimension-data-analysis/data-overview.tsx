// 数据总览
import React, { useEffect, useState, useMemo } from 'react'
import {
  Card,
  Typography,
  Row,Col,
  Statistic,
  Skeleton,
} from 'antd'
import axios from 'axios'
import {
  UserOutlined,
  EditOutlined,
  HeartOutlined,
} from '@ant-design/icons'
import { IconThumbUpFill } from '@/components/icon'
import useLocale from '@/hooks/useLocale'
import locale from './locale'
import styles from './style/data-overview.less?modules'
import MultiAreaLine from '@/components/chart/multi-area-line'
import clsx from 'clsx'

const { Title } = Typography
export default () => {
  const t = useLocale(locale)
  const [overview, setOverview] = useState([])
  const [lineData, setLineData] = useState([])
  const [loading, setLoading] = useState(false)

  const getData = async () => {
    setLoading(true)
    const { data } = await axios
      .get('/api/multi-dimension/overview')
      .finally(() => setLoading(false))

    const { overviewData, chartData } = data
    setLineData(chartData)
    setOverview(overviewData)
  }

  useEffect(() => {
    getData()
  }, [])

  const formatedData = useMemo(() => {
    return [
      {
        title: t['multiDAnalysis.dataOverview.contentProduction'],
        icon: <EditOutlined />,
        value: overview[0],
        background: 'rgb(var(--orange-2))',
        color: 'rgb(var(--orange-6))',
      },
      {
        title: t['multiDAnalysis.dataOverview.contentClicks'],
        icon: <IconThumbUpFill className='w-5 h-5' />,
        value: overview[1],
        className: 'flex items-center justify-center',
        background: 'rgb(var(--cyan-2))',
        color: 'rgb(var(--cyan-6))',
      },
      {
        title: t['multiDAnalysis.dataOverview.contextExposure'],
        value: overview[2],
        icon: <HeartOutlined />,
        background: 'rgb(var(--lark-blue-1))',
        color: 'rgb(var(--lark-blue-6))',
      },
      {
        title: t['multiDAnalysis.dataOverview.activeUsers'],
        value: overview[3],
        icon: <UserOutlined />,
        background: 'rgb(var(--purple-1))',
        color: 'rgb(var(--purple-6))',
      },
    ]
  }, [t, overview])

  return (
    <Row justify="space-between">
      {formatedData.map((item, index) => (
        <Col span={24 / formatedData.length} key={`${index}`}>
          <Card className={styles.card} title={null} bordered={false}>
            <Title level={5}>{item.title}</Title>
            <div className={styles.content}>
              <div
                style={{ backgroundColor: item.background, color: item.color }}
                className={clsx(styles['content-icon'], item.className)}
              >
                {item.icon}
              </div>
              {loading ? (
                <Skeleton
                  active
                  paragraph={{ rows: 1, className: styles['skeleton'] }}
                  style={{ width: '120px' }}
                />
              ) : (
                <Statistic value={item.value} groupSeparator="," />
              )}
            </div>
          </Card>
        </Col>
      ))}
      <Col span={24}>
        <MultiAreaLine data={lineData} loading={loading} />
      </Col>
    </Row>
  )
}
