import { Card, Typography, Form, Input, Button } from 'antd'
import React from 'react'
import useLocale from './locale/useLocale'

export default function StudioInformation() {
  const locale = useLocale()
  return (
    <Card bordered={false}>
      <Typography.Title style={{ marginTop: 0, marginBottom: 16 }} level={5}>
        {locale['monitor.title.studioInfo']}
      </Typography.Title>
      <Form layout="vertical">
        <Form.Item
          label={locale['monitor.studioInfo.label.studioTitle']}
          required
        >
          <Input
            placeholder={`王立群${locale['monitor.studioInfo.placeholder.studioTitle']}`}
          />
        </Form.Item>
        <Form.Item
          label={locale['monitor.studioInfo.label.onlineNotification']}
          required
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label={locale['monitor.studioInfo.label.studioCategory']}
          required
        >
          <Input.Search />
        </Form.Item>
        <Form.Item
          label={locale['monitor.studioInfo.label.studioCategory']}
          required
        >
          <Input.Search />
        </Form.Item>
      </Form>
      <Button type="primary">更新</Button>
    </Card>
  )
}
