import React, { useContext } from 'react'
import dayjs from 'dayjs'
import { Form, Input, Select, DatePicker, Button, Row, Col } from 'antd'
import { GlobalContext } from '@/globals/context'
import locales from './locale'
import useLocale from '@/hooks/useLocale'
import { SearchOutlined } from '@ant-design/icons'
import { IconRefresh } from '@/components/icon'
import { ContentType, FilterType, Status } from './constants'
import styles from './style/index.less?modules'

const { useForm } = Form

function SearchForm(props: {
  onSearch: (values: Record<string, any>) => void
}) {
  const { lang } = useContext(GlobalContext)

  const locale = useLocale(locales)
  const [form] = useForm()

  const handleSubmit = () => {
    const values = form.getFieldsValue()
    props.onSearch(values)
  }

  const handleReset = () => {
    form.resetFields()
    props.onSearch({})
  }

  const colSpan = lang === 'zh-CN' ? 8 : 12

  return (
    <div className={styles['search-form-wrapper']}>
      <Form
        form={form}
        className={styles['search-form']}
        labelAlign="left"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
      >
        <Row gutter={24}>
          <Col span={colSpan}>
            <Form.Item label={locale['searchTable.columns.id']} name="id">
              <Input
                placeholder={locale['searchForm.id.placeholder']}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item label={locale['searchTable.columns.name']} name="name">
              <Input
                allowClear
                placeholder={locale['searchForm.name.placeholder']}
              />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              label={locale['searchTable.columns.contentType']}
              name="contentType"
            >
              <Select
                placeholder={locale['searchForm.all.placeholder']}
                options={ContentType.map((item, index) => ({
                  label: item,
                  value: index,
                }))}
                mode="multiple"
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              label={locale['searchTable.columns.filterType']}
              name="filterType"
            >
              <Select
                placeholder={locale['searchForm.all.placeholder']}
                options={FilterType.map((item, index) => ({
                  label: item,
                  value: index,
                }))}
                mode="multiple"
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              label={locale['searchTable.columns.createdTime']}
              name="createdTime"
            >
              <DatePicker.RangePicker
                allowClear
                style={{ width: '100%' }}
                disabledDate={(date) => dayjs(date).isAfter(dayjs())}
              />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              label={locale['searchTable.columns.status']}
              name="status"
            >
              <Select
                placeholder={locale['searchForm.all.placeholder']}
                options={Status.map((item, index) => ({
                  label: item,
                  value: index,
                }))}
                mode="multiple"
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className={styles['right-button']}>
        <Button type="primary" icon={<SearchOutlined />} onClick={handleSubmit}>
          {locale['searchTable.form.search']}
        </Button>
        <Button icon={<IconRefresh />} onClick={handleReset}>
          {locale['searchTable.form.reset']}
        </Button>
      </div>
    </div>
  )
}

export default SearchForm
