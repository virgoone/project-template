import { Button, Card, Radio, Tabs } from 'antd'
import React from 'react'
import useLocale from './locale/useLocale'
import DataStatisticList from './data-statistic-list'
import styles from './style/index.less?modules'

export default function DataStatistic() {
  const locale = useLocale()
  return (
    <Card bordered={false}>
      <Tabs
        defaultActiveKey="liveMethod"
        items={[
          {
            key: 'liveMethod',
            label: locale['monitor.tab.title.liveMethod'],
          },
          {
            key: 'onlineUsers',
            label: locale['monitor.tab.title.onlineUsers'],
          },
        ]}
      ></Tabs>
      <div className={styles['data-statistic-content']}>
        <Radio.Group defaultValue="3">
          <Radio.Button value="1">
            {locale['monitor.liveMethod.normal']}
          </Radio.Button>
          <Radio.Button value="2">
            {locale['monitor.liveMethod.flowControl']}
          </Radio.Button>
          <Radio.Button value="3">
            {locale['monitor.liveMethod.video']}
          </Radio.Button>
          <Radio.Button value="4">
            {locale['monitor.liveMethod.web']}
          </Radio.Button>
        </Radio.Group>

        <div className={styles['data-statistic-list-wrapper']}>
          <div className={styles['data-statistic-list-header']}>
            <Button type="text">{locale['monitor.editCarousel']}</Button>
            <Button disabled>{locale['monitor.startCarousel']}</Button>
          </div>
          <div className={styles['data-statistic-list-content']}>
            <DataStatisticList />
          </div>
        </div>
      </div>
    </Card>
  )
}
