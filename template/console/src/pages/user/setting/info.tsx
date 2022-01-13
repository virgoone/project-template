import React, { useContext } from 'react'
import {
  Input,
  Select,
  Cascader,
  Button,
  Form,
  Space,
  Message,
  Skeleton,
} from '@arco-design/web-react'
import useLocale from '@/hooks/useLocale'
import { GlobalContext } from '@/globals/context'
import locales from './locale'

function InfoForm({ loading }: { loading?: boolean }) {
  const locale = useLocale(locales)
  const [form] = Form.useForm()
  const { lang } = useContext(GlobalContext)

  const handleSave = async () => {
    try {
      await form.validate()
      Message.success('userSetting.saveSuccess')
    } catch (_) {}
  }

  const handleReset = () => {
    form.resetFields()
  }

  const loadingNode = (rows = 1) => {
    return (
      <Skeleton
        text={{
          rows,
          width: new Array(rows).fill('100%'),
        }}
        animation
      />
    )
  }

  return (
    <Form
      style={{ width: '500px', margin: '0 auto' }}
      form={form}
      labelCol={{ span: lang === 'en-US' ? 7 : 6 }}
      wrapperCol={{ span: lang === 'en-US' ? 17 : 18 }}
    >
      <Form.Item
        label={locale['userSetting.info.email']}
        field="email"
        rules={[
          {
            type: 'email',
            required: true,
            message: locale['userSetting.info.email.placeholder'],
          },
        ]}
      >
        {loading ? (
          loadingNode()
        ) : (
          <Input placeholder={locale['userSetting.info.email.placeholder']} />
        )}
      </Form.Item>
      <Form.Item
        label={locale['userSetting.info.nickName']}
        field="nickName"
        rules={[
          {
            required: true,
            message: locale['userSetting.info.nickName.placeholder'],
          },
        ]}
      >
        {loading ? (
          loadingNode()
        ) : (
          <Input
            placeholder={locale['userSetting.info.nickName.placeholder']}
          />
        )}
      </Form.Item>
      <Form.Item
        label={locale['userSetting.info.area']}
        field="rangeArea"
        rules={[
          {
            required: true,
            message: locale['userSetting.info.area.placeholder'],
          },
        ]}
      >
        {loading ? (
          loadingNode()
        ) : (
          <Select
            options={['中国']}
            placeholder={locale['userSetting.info.area.placeholder']}
          />
        )}
      </Form.Item>
      <Form.Item
        label={locale['userSetting.info.location']}
        field="location"
        initialValue={['BeiJing', 'BeiJing', 'HaiDian']}
        rules={[
          {
            required: true,
          },
        ]}
      >
        {loading ? (
          loadingNode()
        ) : (
          <Cascader
            options={[
              {
                label: '北京市',
                value: 'BeiJing',
                children: [
                  {
                    label: '北京市',
                    value: 'BeiJing',
                    children: [
                      { label: '海淀区', value: 'HaiDian' },
                      { label: '朝阳区', value: 'ChaoYang' },
                    ],
                  },
                ],
              },
              {
                label: '上海市',
                value: 'ShangHai',
                children: [
                  {
                    label: '上海市',
                    value: 'ShangHai',
                    children: [
                      { label: '黄浦区', value: 'HuangPu' },
                      { label: '静安区', value: 'JingAn' },
                    ],
                  },
                ],
              },
            ]}
          />
        )}
      </Form.Item>
      <Form.Item label={locale['userSetting.info.address']} field="address">
        {loading ? (
          loadingNode()
        ) : (
          <Input placeholder={locale['userSetting.info.address.placeholder']} />
        )}
      </Form.Item>
      <Form.Item label={locale['userSetting.info.profile']} field="profile">
        {loading ? (
          loadingNode(3)
        ) : (
          <Input.TextArea
            placeholder={locale['userSetting.info.profile.placeholder']}
          />
        )}
      </Form.Item>

      <Form.Item label=" ">
        <Space>
          <Button type="primary" onClick={handleSave}>
            {locale['userSetting.save']}
          </Button>
          <Button onClick={handleReset}>{locale['userSetting.reset']}</Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default InfoForm
