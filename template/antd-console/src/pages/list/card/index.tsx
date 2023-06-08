import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Tabs, Card, Input, Typography, Row, Col } from 'antd'
import useLocale from '@/hooks/useLocale'
import locales from './locale'
import CardBlock from './card-block'
import AddCard from './card-add'
import { QualityInspection, BasicCard } from './interface'
import styles from './style/index.less?modules'

import './mock'

const { Title } = Typography

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
        headStyle={{ border: 'none', height: 'auto', paddingTop: '20px' }}
      >
        <Tabs
          activeKey={activeKey}
          type="line"
          onChange={(key: string) => setActiveKey(key as keyof typeof data)}
          tabBarExtraContent={
            <Input.Search
              style={{ width: '240px' }}
              placeholder={locale[`cardList.tab.${activeKey}.placeholder`]}
            />
          }
          items={[
            {
              key: 'all',
              label: locale['cardList.tab.title.all'],
            },
            {
              key: 'quality',
              label: locale['cardList.tab.title.quality'],
            },
            {
              key: 'service',
              label: locale['cardList.tab.title.service'],
            },
            {
              key: 'rules',
              label: locale['cardList.tab.title.rules'],
            },
          ]}
        ></Tabs>

        {activeKey === 'all' ? (
          Object.entries(data).map(([key, list]) => (
            <div key={key}>
              <Title level={5}>{locale[`cardList.tab.title.${key}`]}</Title>
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
