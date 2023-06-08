import React from 'react'
import { Card, Typography, Tag, Space, Descriptions } from 'antd'
import useLocale from './locale/useLocale'

export default function StudioStatus() {
  const locale = useLocale()
  const dataStatus = [
    {
      label: (
        <span>
          <Typography.Text style={{ paddingRight: 8 }}>
            {locale['monitor.studioStatus.mainstream']}
          </Typography.Text>
          {locale['monitor.studioStatus.bitRate']}
        </span>
      ),
      value: '6 Mbps',
    },
    {
      label: locale['monitor.studioStatus.frameRate'],
      value: '60',
    },
    {
      label: (
        <span>
          <Typography.Text style={{ paddingRight: 8 }}>
            {locale['monitor.studioStatus.hotStandby']}
          </Typography.Text>
          {locale['monitor.studioStatus.bitRate']}
        </span>
      ),
      value: '6 Mbps',
    },
    {
      label: locale['monitor.studioStatus.frameRate'],
      value: '60',
    },
    {
      label: (
        <span>
          <Typography.Text style={{ paddingRight: 8 }}>
            {locale['monitor.studioStatus.coldStandby']}
          </Typography.Text>
          {locale['monitor.studioStatus.bitRate']}
        </span>
      ),
      value: '6 Mbps',
    },
    {
      label: locale['monitor.studioStatus.frameRate'],
      value: '60',
    },
  ]
  const dataPicture = [
    {
      label: locale['monitor.studioStatus.line'],
      value: '热备',
    },
    {
      label: 'CDN',
      value: 'KS',
    },
    {
      label: locale['monitor.studioStatus.play'],
      value: 'FLV',
    },
    {
      label: locale['monitor.studioStatus.pictureQuality'],
      value: '原画',
    },
  ]

  return (
    <Card bordered={false}>
      <Space align="start">
        <Typography.Title style={{ marginTop: 0, marginBottom: 16 }} level={5}>
          {locale['monitor.studioStatus.title.studioStatus']}
        </Typography.Title>
        <Tag color="green">{locale['monitor.studioStatus.smooth']}</Tag>
      </Space>
      <Descriptions layout="horizontal" column={2}>
        {dataStatus.map((item) => (
          <Descriptions.Item key={item.label} label={item.label}>
            {item.value}
          </Descriptions.Item>
        ))}
      </Descriptions>
      <Typography.Title style={{ marginBottom: 16 }} level={5}>
        {locale['monitor.studioStatus.title.pictureInfo']}
      </Typography.Title>
      <Descriptions layout="horizontal" column={2}>
        {dataPicture.map((item) => (
          <Descriptions.Item key={item.label} label={item.label}>
            {item.value}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </Card>
  )
}
