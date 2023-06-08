import React from 'react'
import { Button, Card, Typography, Space } from 'antd'
import {
  StopOutlined,
  ArrowRightOutlined,
  SwapOutlined,
  TagsOutlined,
} from '@ant-design/icons'

import useLocale from './locale/useLocale'

export default function QuickOperation() {
  const locale = useLocale()
  return (
    <Card bordered={false}>
      <Typography.Title style={{ marginTop: 0, marginBottom: 16 }} level={5}>
        {locale['monitor.title.quickOperation']}
      </Typography.Title>
      <Space direction="vertical" style={{ width: '100%' }} size={10}>
        <Button block icon={<TagsOutlined />}>
          {locale['monitor.quickOperation.changeClarity']}
        </Button>
        <Button block icon={<SwapOutlined />}>
          {locale['monitor.quickOperation.switchStream']}
        </Button>
        <Button block icon={<StopOutlined />}>
          {locale['monitor.quickOperation.removeClarity']}
        </Button>
        <Button block icon={<ArrowRightOutlined />}>
          {locale['monitor.quickOperation.pushFlowGasket']}
        </Button>
      </Space>
    </Card>
  )
}
