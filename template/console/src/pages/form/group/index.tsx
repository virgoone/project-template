import React, { useState, useRef } from 'react'
import {
  Typography,
  Card,
  Form,
  Select,
  Input,
  Grid,
  Space,
  Button,
  Message,
} from '@arco-design/web-react'
import { FormInstance } from '@arco-design/web-react/es/Form'
import axios from 'axios'
import useLocale from '@/hooks/useLocale'
import locales from './locale'
import styles from './style/index.scss?modules'
import './mock'

function GroupForm() {
  const locale = useLocale(locales)
  const formRef = useRef<FormInstance>(null)
  const [loading, setLoading] = useState(false)

  function submit(data: Record<string, any>) {
    setLoading(true)
    axios
      .post('/api/groupForm', {
        data,
      })
      .then(() => {
        Message.success(locale['groupForm.submitSuccess'])
      })
      .finally(() => {
        setLoading(false)
      })
  }

  function handleSubmit() {
    formRef.current?.validate().then((values) => {
      submit(values)
    })
  }

  function handleReset() {
    formRef.current?.resetFields()
  }

  return (
    <div className={styles.container}>
      <Form layout="vertical" ref={formRef} className={styles['form-group']}>
        <Card>
          <Typography.Title heading={6}>
            {locale['groupForm.title.video']}
          </Typography.Title>
          <Grid.Row gutter={80}>
            <Grid.Col span={8}>
              <Form.Item
                label={locale['groupForm.form.label.video.mode']}
                field="video.mode"
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
            </Grid.Col>
            <Grid.Col span={8}>
              <Form.Item
                label={
                  locale['groupForm.form.label.video.acquisition.resolution']
                }
                field="video.acquisition.resolution"
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
            </Grid.Col>
            <Grid.Col span={8}>
              <Form.Item
                label={
                  locale['groupForm.form.label.video.acquisition.frameRate']
                }
                field="video.acquisition.frameRate"
              >
                <Input
                  placeholder={
                    locale['groupForm.placeholder.video.acquisition.frameRate']
                  }
                  addAfter="fps"
                />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row gutter={80}>
            <Grid.Col span={8}>
              <Form.Item
                label={locale['groupForm.form.label.video.encoding.resolution']}
                field="video.encoding.resolution"
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
            </Grid.Col>
            <Grid.Col span={8}>
              <Form.Item
                label={locale['groupForm.form.label.video.encoding.rate.min']}
                field="video.encoding.rate.min"
              >
                <Input
                  placeholder={
                    locale['groupForm.placeholder.video.encoding.rate.min']
                  }
                  addAfter="bps"
                />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={8}>
              <Form.Item
                label={locale['groupForm.form.label.video.encoding.rate.max']}
                field="video.encoding.rate.max"
              >
                <Input
                  placeholder={
                    locale['groupForm.placeholder.video.encoding.rate.max']
                  }
                  addAfter="bps"
                />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row gutter={80}>
            <Grid.Col span={8}>
              <Form.Item
                label={
                  locale['groupForm.form.label.video.encoding.rate.default']
                }
                field="video.encoding.rate.default"
              >
                <Input
                  placeholder={
                    locale['groupForm.placeholder.video.encoding.rate.default']
                  }
                  addAfter="bps"
                />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={8}>
              <Form.Item
                label={locale['groupForm.form.label.video.encoding.frameRate']}
                field="video.encoding.frameRate"
              >
                <Input
                  placeholder={
                    locale['groupForm.placeholder.video.encoding.frameRate']
                  }
                  addAfter="fps"
                />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={8}>
              <Form.Item
                label={locale['groupForm.form.label.video.encoding.profile']}
                field="video.encoding.profile"
              >
                <Input
                  placeholder={
                    locale['groupForm.placeholder.video.encoding.profile']
                  }
                  addAfter="bps"
                />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
        </Card>
        <Card>
          <Typography.Title heading={6}>
            {locale['groupForm.title.audio']}
          </Typography.Title>
          <Grid.Row gutter={80}>
            <Grid.Col span={8}>
              <Form.Item
                label={locale['groupForm.form.label.audio.mode']}
                initialValue={'custom'}
                field="audio.mode"
              >
                <Select
                  placeholder={locale['groupForm.placeholder.audio.mode']}
                >
                  <Select.Option value="custom">自定义</Select.Option>
                  <Select.Option value="mode1">模式1</Select.Option>
                  <Select.Option value="mode2">模式2</Select.Option>
                </Select>
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={8}>
              <Form.Item
                label={
                  locale['groupForm.form.label.audio.acquisition.channels']
                }
                field="audio.acquisition.channels"
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
            </Grid.Col>
            <Grid.Col span={8}>
              <Form.Item
                label={locale['groupForm.form.label.audio.encoding.rate']}
                field="audio.encoding.rate"
              >
                <Input
                  placeholder={
                    locale['groupForm.placeholder.audio.encoding.rate']
                  }
                  addAfter="bps"
                />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row gutter={80}>
            <Grid.Col span={8}>
              <Form.Item
                label={locale['groupForm.form.label.audio.encoding.profile']}
                field="audio.encoding.profile"
              >
                <Input
                  placeholder={
                    locale['groupForm.placeholder.audio.encoding.profile']
                  }
                  addAfter="fps"
                />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
        </Card>
        <Card style={{ marginBottom: '40px' }}>
          <Typography.Title heading={6}>
            {locale['groupForm.title.explanation']}
          </Typography.Title>
          <Form.Item
            label={locale['groupForm.form.label.explanation']}
            field="audio.explanation"
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
