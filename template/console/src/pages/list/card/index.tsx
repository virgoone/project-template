import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Tabs, Card, Input, Typography, Grid } from '@arco-design/web-react'
import useLocale from '@/hooks/useLocale'
import locales from './locale'
import CardBlock from './card-block'
import AddCard from './card-add'
import { QualityInspection, BasicCard } from './interface'
import styles from './style/index.scss?modules'

import './mock'

const { Title } = Typography
const { Row, Col } = Grid

const defaultList = new Array(10).fill({})
export default function ListCard() {
  const locale = useLocale(locales)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<{
    all?: any
    quality: Record<string, any>[]
    service: Record<string, any>[]
    rules: Record<string, any>[]
  }>({
    quality: defaultList,
    service: defaultList,
    rules: defaultList,
  })

  const [activeKey, setActiveKey] = useState<keyof typeof data>('all')

  const getData = () => {
    axios
      .get('/api/cardList')
      .then((res) => {
        setData(res.data)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getData()
  }, [])
  7
  const getCardList = (
    list: Array<BasicCard & QualityInspection>,
    type: keyof typeof data
  ) => {
    return (
      <Row gutter={24} className={styles['card-content']}>
        {type === 'quality' && (
          <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
            <AddCard description={locale['cardList.add.quality']} />
          </Col>
        )}
        {list.map((item, index) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} key={index}>
            <CardBlock card={item} type={type} loading={loading} />
          </Col>
        ))}
      </Row>
    )
  }

  return (
    <div className={styles.container}>
      <Card
        title={locale['menu.list.card']}
        headerStyle={{ border: 'none', height: 'auto', paddingTop: '20px' }}
      >
        <Tabs
          activeTab={activeKey}
          type="rounded"
          onChange={(key: string) => setActiveKey(key as keyof typeof data)}
          extra={
            <Input.Search
              style={{ width: '240px' }}
              placeholder={locale[`cardList.tab.${activeKey}.placeholder`]}
            />
          }
        >
          <Tabs.TabPane key="all" title={locale['cardList.tab.title.all']} />
          <Tabs.TabPane
            key="quality"
            title={locale['cardList.tab.title.quality']}
          />
          <Tabs.TabPane
            key="service"
            title={locale['cardList.tab.title.service']}
          />
          <Tabs.TabPane
            key="rules"
            title={locale['cardList.tab.title.rules']}
          />
        </Tabs>

        {activeKey === 'all' ? (
          Object.entries(data).map(([key, list]) => (
            <div key={key}>
              <Title heading={6}>{locale[`cardList.tab.title.${key}`]}</Title>
              {getCardList(list, key as keyof typeof data)}
            </div>
          ))
        ) : (
          <div className={styles['single-content']}>
            {getCardList(data[activeKey], activeKey as keyof typeof data)}
          </div>
        )}
      </Card>
    </div>
  )
}
