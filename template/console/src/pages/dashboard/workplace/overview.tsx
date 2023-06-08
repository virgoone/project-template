import React, { useState, useEffect, ReactNode } from 'react'
import {
  Grid,
  Typography,
  Divider,
  Skeleton,
  Link,
} from '@arco-design/web-react'
import axios from 'axios'
import { observer } from 'mobx-react'
import { IconCaretUp } from '@arco-design/web-react/icon'
import OverviewAreaLine from '@/components/chart/overview-area-line'
import useStores from '@/hooks/useStores'

import useLocale from './locale/useLocale'
import styles from './style/overview.less?modules'
import { ReactComponent as IconCalendar } from './assets/calendar.svg'
import { ReactComponent as IconComments } from './assets/comments.svg'
import { ReactComponent as IconContent } from './assets/content.svg'
import { ReactComponent as IconIncrease } from './assets/increase.svg'

const { Row, Col } = Grid

type StatisticItemType = {
  icon?: ReactNode
  title?: ReactNode
  count?: ReactNode
  loading?: boolean
  unit?: ReactNode
}

function StatisticItem(props: StatisticItemType) {
  const { icon, title, count, loading, unit } = props
  return (
    <div className={styles.item}>
      <div className={styles.icon}>{icon}</div>
      <div>
        <Skeleton loading={loading} text={{ rows: 2, width: 60 }} animation>
          <div className={styles.title}>{title}</div>
          <div className={styles.count}>
            {count}
            <span className={styles.unit}>{unit}</span>
          </div>
        </Skeleton>
      </div>
    </div>
  )
}

type DataType = {
  allContents?: string
  liveContents?: string
  increaseComments?: string
  growthRate?: string
  chartData?: { count?: number; date?: string }[]
  down?: boolean
}

function Overview() {
  const [data, setData] = useState<DataType>({})
  const [loading, setLoading] = useState(true)
  const locale = useLocale()

  const userStore = useStores('user')
  const { info: userInfo = {} } = userStore
  const fetchData = () => {
    setLoading(true)
    axios
      .get('/api/workplace/overview-content')
      .then((res) => {
        setData(res.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className={styles.container}>
      <Typography.Title heading={5} style={{ marginTop: 0 }}>
        {locale['workplace.welcomeBack']}
        {userInfo.name}
      </Typography.Title>
      <Divider />
      <Row>
        <Col flex={1}>
          <StatisticItem
            icon={<IconCalendar />}
            title={locale['workplace.totalOnlyData']}
            count={data.allContents}
            loading={loading}
            unit={locale['workplace.pecs']}
          />
        </Col>
        <Divider type="vertical" className={styles.divider} />
        <Col flex={1}>
          <StatisticItem
            icon={<IconContent />}
            title={locale['workplace.contentInMarket']}
            count={data.liveContents}
            loading={loading}
            unit={locale['workplace.pecs']}
          />
        </Col>
        <Divider type="vertical" className={styles.divider} />
        <Col flex={1}>
          <StatisticItem
            icon={<IconComments />}
            title={locale['workplace.comments']}
            count={data.increaseComments}
            loading={loading}
            unit={locale['workplace.pecs']}
          />
        </Col>
        <Divider type="vertical" className={styles.divider} />
        <Col flex={1}>
          <StatisticItem
            icon={<IconIncrease />}
            title={locale['workplace.growth']}
            count={
              <span>
                {data.growthRate}{' '}
                <IconCaretUp
                  style={{ fontSize: 18, color: 'rgb(var(--green-6))' }}
                />
              </span>
            }
            loading={loading}
          />
        </Col>
      </Row>
      <Divider />
      <div>
        <div className={styles.ctw}>
          <Typography.Paragraph
            className={styles['chart-title']}
            style={{ marginBottom: 0 }}
          >
            {locale['workplace.contentData']}
            <span className={styles['chart-sub-title']}>
              ({locale['workplace.1year']})
            </span>
          </Typography.Paragraph>
          <Link>{locale['workplace.seeMore']}</Link>
        </div>
        <OverviewAreaLine data={data.chartData as any} loading={loading} />
      </div>
    </div>
  )
}

export default observer(Overview)
