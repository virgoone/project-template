import React, { useState } from 'react'
import {
  Typography,
  Card,
  Form,
  Select,
  Input,
  Row,
  Col,
  Space,
  Button,
  message,
} from 'antd'
import axios from 'axios'
import useLocale from '@/hooks/useLocale'
import locales from './locale'
import styles from './style/index.less?modules'
import './mock'

function GroupForm() {
  const locale = useLocale(locales)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  function submit(data: Record<string, any>) {
    setLoading(true)
    axios
      .post('/api/groupForm', {
        data,
      })
      .then(() => {
        message.success(locale['groupForm.submitSuccess'])
      })
      .finally(() => {
        setLoading(false)
      })
  }

  function handleSubmit() {
    form?.validateFields().then((values) => {
      submit(values)
    })
  }

  function handleReset() {
    form?.resetFields()
  }

  return (
    <div className={styles.container}>
      <Form layout="vertical" form={form} className={styles['form-group']}>
        <Card>
          <Typography.Title level={5}>
            {locale['groupForm.title.video']}
          </Typography.Title>
          <Row gutter={80}>
            <Col span={8}>
              <Form.Item
                label={locale['groupForm.form.label.video.mode']}
                name="video.mode"
                initialValue={'custom'}
              >
                <Select
                  placeholder={locale['groupForm.placeholder.video.mode']}
                >
                  <Select.Option value="custom">自定义</Select.Option>
                  <Select.Option value="mode1">模式1</Select.Option>
                  <Select.Option value="mode2">模式2</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={
                  locale['groupForm.form.label.video.acquisition.resolution']
                }
                name="video.acquisition.resolution"
              >
                <Select
                  placeholder={
                    locale['groupForm.placeholder.video.acquisition.resolution']
                  }
                >
                  <Select.Option value="resolution1">分辨率1</Select.Option>
                  <Select.Option value="resolution2">分辨率2</Select.Option>
                  <Select.Option value="resolution3">分辨率3</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={
                  locale['groupForm.form.label.video.acquisition.frameRate']
                }
                name="video.acquisition.frameRate"
              >
                <Input
                  placeholder={
                    locale['groupForm.placeholder.video.acquisition.frameRate']
                  }
                  addonAfter="fps"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={80}>
            <Col span={8}>
              <Form.Item
                label={locale['groupForm.form.label.video.encoding.resolution']}
                name="video.encoding.resolution"
              >
                <Select
                  placeholder={
                    locale['groupForm.placeholder.video.encoding.resolution']
                  }
                >
                  <Select.Option value="resolution1">分辨率1</Select.Option>
                  <Select.Option value="resolution2">分辨率2</Select.Option>
                  <Select.Option value="resolution3">分辨率3</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={locale['groupForm.form.label.video.encoding.rate.min']}
                name="video.encoding.rate.min"
              >
                <Input
                  placeholder={
                    locale['groupForm.placeholder.video.encoding.rate.min']
                  }
                  addonAfter="bps"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={locale['groupForm.form.label.video.encoding.rate.max']}
                name="video.encoding.rate.max"
              >
                <Input
                  placeholder={
                    locale['groupForm.placeholder.video.encoding.rate.max']
                  }
                  addonAfter="bps"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={80}>
            <Col span={8}>
              <Form.Item
                label={
                  locale['groupForm.form.label.video.encoding.rate.default']
                }
                name="video.encoding.rate.default"
              >
                <Input
                  placeholder={
                    locale['groupForm.placeholder.video.encoding.rate.default']
                  }
                  addonAfter="bps"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={locale['groupForm.form.label.video.encoding.frameRate']}
                name="video.encoding.frameRate"
              >
                <Input
                  placeholder={
                    locale['groupForm.placeholder.video.encoding.frameRate']
                  }
                  addonAfter="fps"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={locale['groupForm.form.label.video.encoding.profile']}
                name="video.encoding.profile"
              >
                <Input
                  placeholder={
                    locale['groupForm.placeholder.video.encoding.profile']
                  }
                  addonAfter="bps"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card>
          <Typography.Title level={5}>
            {locale['groupForm.title.audio']}
          </Typography.Title>
          <Row gutter={80}>
            <Col span={8}>
              <Form.Item
                label={locale['groupForm.form.label.audio.mode']}
                initialValue={'custom'}
                name="audio.mode"
              >
                <Select
                  placeholder={locale['groupForm.placeholder.audio.mode']}
                >
                  <Select.Option value="custom">自定义</Select.Option>
                  <Select.Option value="mode1">模式1</Select.Option>
                  <Select.Option value="mode2">模式2</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={
                  locale['groupForm.form.label.audio.acquisition.channels']
                }
                name="audio.acquisition.channels"
              >
                <Select
                  placeholder={
                    locale['groupForm.placeholder.audio.acquisition.channels']
                  }
                >
                  <Select.Option value="1">1</Select.Option>
                  <Select.Option value="2">2</Select.Option>
                  <Select.Option value="3">3</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={locale['groupForm.form.label.audio.encoding.rate']}
                name="audio.encoding.rate"
              >
                <Input
                  placeholder={
                    locale['groupForm.placeholder.audio.encoding.rate']
                  }
                  addonAfter="bps"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={80}>
            <Col span={8}>
              <Form.Item
                label={locale['groupForm.form.label.audio.encoding.profile']}
                name="audio.encoding.profile"
              >
                <Input
                  placeholder={
                    locale['groupForm.placeholder.audio.encoding.profile']
                  }
                  addonAfter="fps"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card style={{ marginBottom: '40px' }}>
          <Typography.Title level={5}>
            {locale['groupForm.title.explanation']}
          </Typography.Title>
          <Form.Item
            label={locale['groupForm.form.label.explanation']}
            name="audio.explanation"
          >
            <Input.TextArea
              placeholder={locale['groupForm.placeholder.explanation']}
            />
          </Form.Item>
        </Card>
      </Form>
      <div className={styles.actions}>
        <Space>
          <Button onClick={handleReset} size="large">
            {locale['groupForm.reset']}
          </Button>
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={loading}
            size="large"
          >
            {locale['groupForm.submit']}
          </Button>
        </Space>
      </div>
    </div>
  )
}

export default GroupForm
