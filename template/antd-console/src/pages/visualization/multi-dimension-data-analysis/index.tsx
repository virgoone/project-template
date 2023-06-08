import React, { useState, useEffect } from 'react'
import { Typography, Card, Row, Col } from 'antd'
import axios from 'axios'
import useLocale from '@/hooks/useLocale'
import HorizontalInterval from '@/components/chart/horizontal-interval'
import AreaPolar from '@/components/chart/area-polar'
import FactMultiPie from '@/components/chart/fact-multi-pie'
import locale from './locale'
import DataOverview from './data-overview'
import CardList from './card-list'
import styles from './style/index.less?modules'

import './mock'

const { Title } = Typography

function DataAnalysis() {
  const t = useLocale(locale)
  const [loading, setLoading] = useState(false)
  const [interval, setInterval] = useState([])
  const [polarLoading, setPolarLoading] = useState(false)
  const [polar, setPolar] = useState({ list: [], fields: [] })
  const [multiPieLoading, setMultiPieLoading] = useState(false)
  const [multiPie, setMultiPie] = useState([])

  const getInterval = async () => {
    setLoading(true)
    const { data } = await axios
      .get('/api/multi-dimension/activity')
      .finally(() => {
        setLoading(false)
      })
    setInterval(data)
  }

  const getPolar = async () => {
    setPolarLoading(true)
    const { data } = await axios
      .get('/api/multi-dimension/polar')
      .finally(() => setPolarLoading(false))

    setPolar(data)
  }

  const getMultiPie = async () => {
    setMultiPieLoading(true)
    const { data } = await axios
      .get('/api/multi-dimension/content-source')
      .finally(() => {
        setMultiPieLoading(false)
      })

    setMultiPie(data)
  }

  useEffect(() => {
    getInterval()
    getPolar()
    getMultiPie()
  }, [])

  return (
    <div className={styles.container}>
      <Row gutter={20}>
        <Col span={16}>
          <Card>
            <Title level={5} style={{ marginTop: '0px' }}>
              {t['multiDAnalysis.card.title.dataOverview']}
            </Title>
            <DataOverview />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Title level={5} style={{ marginTop: '0px' }}>
              {t['multiDAnalysis.card.title.todayActivity']}
            </Title>
            <HorizontalInterval
              data={interval}
              loading={loading}
              height={160}
            />
          </Card>
          <Card>
            <Title level={5} style={{ marginTop: '0px' }}>
              {t['multiDAnalysis.card.title.contentTheme']}
            </Title>
            <AreaPolar
              data={polar.list}
              fields={polar.fields}
              height={197}
              loading={polarLoading}
            />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <CardList />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card style={{ marginBottom: 0 }}>
            <Title level={5} style={{ marginTop: '0px' }}>
              {t['multiDAnalysis.card.title.contentSource']}
            </Title>
            <FactMultiPie
              loading={multiPieLoading}
              data={multiPie}
              height={240}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
export default DataAnalysis
