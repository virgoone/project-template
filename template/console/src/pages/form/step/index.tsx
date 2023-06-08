import React, { useState } from 'react'
import {
  Steps,
  Form,
  Input,
  Select,
  DatePicker,
  InputTag,
  Button,
  Typography,
  Space,
  Card,
  Switch,
  Result,
} from '@arco-design/web-react'
import useLocale from '@/hooks/useLocale'
import locales from './locale'
import styles from './style/index.less?modules'

const { Title, Paragraph } = Typography
function StepForm() {
  const locale = useLocale(locales)
  const [current, setCurrent] = useState(1)

  const [form] = Form.useForm()

  const viewForm = () => {
    const values = form.getFields()
    form.setFields(values)
    setCurrent(1)
  }

  const reCreateForm = () => {
    form.resetFields()
    setCurrent(1)
  }

  const toNext = async () => {
    try {
      await form.validate()
      setCurrent(current + 1)
    } catch (_) {}
  }
  return (
    <div className={styles.container}>
      <Card>
        <Title heading={5}>{locale['stepForm.desc.basicInfo']}</Title>
        <div className={styles.wrapper}>
          <Steps current={current} lineless>
            <Steps.Step
              title={locale['stepForm.title.basicInfo']}
              description={locale['stepForm.desc.basicInfo']}
            />
            <Steps.Step
              title={locale['stepForm.title.channel']}
              description={locale['stepForm.desc.channel']}
            />
            <Steps.Step
              title={locale['stepForm.title.created']}
              description={locale['stepForm.desc.created']}
            />
          </Steps>
          <Form form={form} className={styles.form}>
            {current === 1 && (
              <Form.Item noStyle>
                <Form.Item
                  label={locale['stepForm.basicInfo.name']}
                  required
                  field="basic.name"
                  rules={[
                    {
                      required: true,
                      message: locale['stepForm.basicInfo.name.required'],
                    },
                    {
                      validator: (value: string, callback) => {
                        if (!/^[\u4e00-\u9fa5a-zA-Z0-9]{1,20}$/g.test(value)) {
                          callback(
                            locale['stepForm.basicInfo.name.placeholder']
                          )
                        }
                      },
                    },
                  ]}
                >
                  <Input
                    placeholder={locale['stepForm.basicInfo.name.placeholder']}
                  />
                </Form.Item>
                <Form.Item
                  label={locale['stepForm.basicInfo.channelType']}
                  required
                  initialValue="app"
                  field="basic.channelType"
                  rules={[
                    {
                      required: true,
                      message:
                        locale['stepForm.basicInfo.channelType.required'],
                    },
                  ]}
                >
                  <Select>
                    <Select.Option value="app">APP通用渠道</Select.Option>
                    <Select.Option value="site">网页通用渠道</Select.Option>
                    <Select.Option value="game">游戏通用渠道</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label={locale['stepForm.basicInfo.time']}
                  required
                  field="basic.time"
                  rules={[
                    {
                      required: true,
                      message: locale['stepForm.basicInfo.time.required'],
                    },
                  ]}
                >
                  <DatePicker.RangePicker style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                  label={locale['stepForm.basicInfo.link']}
                  required
                  extra={locale['stepForm.basicInfo.link.tips']}
                  field="basic.link"
                  initialValue={'https://arco.design'}
                  rules={[{ required: true }]}
                >
                  <Input
                    placeholder={locale['stepForm.basicInfo.link.placeholder']}
                  />
                </Form.Item>
              </Form.Item>
            )}
            {current === 2 && (
              <Form.Item noStyle>
                <Form.Item
                  label={locale['stepForm.channel.source']}
                  required
                  field="channel.source"
                  rules={[
                    {
                      required: true,
                      message: locale['stepForm.channel.source.required'],
                    },
                  ]}
                >
                  <Input
                    placeholder={locale['stepForm.channel.source.placeholder']}
                  />
                </Form.Item>
                <Form.Item
                  label={locale['stepForm.channel.media']}
                  required
                  field="channel.media"
                  rules={[
                    {
                      required: true,
                      message: locale['stepForm.channel.media.required'],
                    },
                  ]}
                >
                  <Input
                    placeholder={locale['stepForm.channel.media.placeholder']}
                  />
                </Form.Item>
                <Form.Item
                  label={locale['stepForm.channel.keywords']}
                  required
                  field="channel.keywords"
                  initialValue={['今日头条', '火山']}
                  rules={[{ required: true }]}
                >
                  <InputTag />
                </Form.Item>
                <Form.Item
                  label={locale['stepForm.channel.remind']}
                  required
                  initialValue={true}
                  field="channel.remind"
                  triggerPropName="checked"
                  rules={[{ required: true }]}
                >
                  <Switch />
                </Form.Item>

                <Form.Item
                  label={locale['stepForm.channel.content']}
                  required
                  field="channel.content"
                  rules={[
                    {
                      required: true,
                      message: locale['stepForm.channel.content.required'],
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder={locale['stepForm.channel.content.placeholder']}
                  />
                </Form.Item>
              </Form.Item>
            )}
            {current !== 3 ? (
              <Form.Item label=" ">
                <Space>
                  {current === 2 && (
                    <Button
                      size="large"
                      onClick={() => setCurrent(current - 1)}
                    >
                      {locale['stepForm.prev']}
                    </Button>
                  )}
                  {current !== 3 && (
                    <Button type="primary" size="large" onClick={toNext}>
                      {locale['stepForm.next']}
                    </Button>
                  )}
                </Space>
              </Form.Item>
            ) : (
              <Form.Item noStyle>
                <Result
                  status="success"
                  title={locale['stepForm.created.success.title']}
                  subTitle={locale['stepForm.created.success.desc']}
                  extra={[
                    <Button
                      key="reset"
                      style={{ marginRight: 16 }}
                      onClick={viewForm}
                    >
                      {locale['stepForm.created.success.view']}
                    </Button>,
                    <Button key="again" type="primary" onClick={reCreateForm}>
                      {locale['stepForm.created.success.again']}
                    </Button>,
                  ]}
                />
              </Form.Item>
            )}
          </Form>
        </div>
        {current === 3 && (
          <div className={styles['form-extra']}>
            <Title heading={6}>{locale['stepForm.created.extra.title']}</Title>
            <Paragraph type="secondary">
              {locale['stepForm.created.extra.desc']}
              <Button type="text">
                {locale['stepForm.created.extra.detail']}
              </Button>
            </Paragraph>
          </div>
        )}
      </Card>
    </div>
  )
}

export default StepForm
