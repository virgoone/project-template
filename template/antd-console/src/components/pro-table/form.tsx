import { ReloadOutlined, SearchOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  type InputProps,
  Row,
  Select,
  type SelectProps,
  Space,
} from 'antd'
import clsx from 'clsx'

import dayjs from 'dayjs'
import React from 'react'

import styles from './index.less?modules'

const { useForm } = Form

export type SearchFormItemType = 'Input' | 'Custom' | 'Select'

export interface SearchFormInputProps extends InputProps {
  colSpan?: number
  fieldName: string
  label: string
  type: 'Input'
}

export interface SearchSelectProps extends SelectProps {
  colSpan?: number
  fieldName: string
  label: string
  type: 'Select'
}

export interface CustomFormItemProps {
  colSpan?: number
  fieldName: string
  label: string
  type: 'Custom'
  component: JSX.Element
}

export type FormOptions =
  | SearchSelectProps
  | SearchFormInputProps
  | CustomFormItemProps

const colSpan = 8

function SearchForm(props: {
  loading?: boolean
  initialValues?: any
  showCreatedTime?: boolean
  createdTimeText?: string
  formOptions?: FormOptions[]
  onSearch: (values: Record<string, any>) => void
}) {
  const [form] = useForm()
  const {
    initialValues = {},
    formOptions = [],
    createdTimeText = '创建时间',
  } = props
  const handleSubmit = () => {
    const values = form.getFieldsValue()
    props.onSearch(values)
  }

  const handleReset = () => {
    form.resetFields()
    props.onSearch({ ...initialValues })
  }

  return (
    <div className={styles['search-form-wrapper']}>
      <Form
        form={form}
        initialValues={initialValues}
        className={styles['search-form']}
        labelAlign="left"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Row gutter={24}>
          {formOptions.map((item, index) => {
            if (item.type === 'Input') {
              return (
                <Col
                  key={`form-col-${item.fieldName}-${index}`}
                  span={item.colSpan || colSpan}
                >
                  <Form.Item label={item.label} name={item.fieldName}>
                    <Input
                      allowClear={item.allowClear}
                      placeholder={
                        !item.placeholder
                          ? `请输入${item.label}`
                          : item.placeholder
                      }
                    />
                  </Form.Item>
                </Col>
              )
            }
            if (item.type === 'Select') {
              return (
                <Col
                  key={`form-col-${item.fieldName}-${index}`}
                  span={item.colSpan || colSpan}
                >
                  <Form.Item label={item.label} name={item.fieldName}>
                    <Select
                      placeholder={
                        !item.placeholder
                          ? `请选择${item.label}`
                          : item.placeholder
                      }
                      options={item.options}
                    />
                  </Form.Item>
                </Col>
              )
            }
            if (item.type === 'Custom') {
              return (
                <Col
                  key={`form-col-${item.fieldName}-${index}`}
                  span={item.colSpan || colSpan}
                >
                  <Form.Item label={item.label} name={item.fieldName}>
                    {item.component}
                  </Form.Item>
                </Col>
              )
            }
            return null
          })}

          {props.showCreatedTime && (
            <Col span={colSpan}>
              <Form.Item label={createdTimeText} name="createdTime">
                <DatePicker.RangePicker
                  disabledDate={(current) => current.isAfter(dayjs())}
                  allowClear
                  showTime={{
                    defaultValue: [
                      dayjs('00:00:00', 'HH:mm:ss'),
                      dayjs('23:59:59', 'HH:mm:ss'),
                    ],
                  }}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form>
      <Space
        direction="vertical"
        className={clsx(
          'flex flex-col justify-between pl-5 mb-5',
          styles['right-button']
        )}
      >
        <Button
          loading={props.loading}
          type="primary"
          icon={<SearchOutlined />}
          onClick={handleSubmit}
        >
          查询
        </Button>
        <Button
          loading={props.loading}
          icon={<ReloadOutlined />}
          onClick={handleReset}
        >
          重置
        </Button>
      </Space>
    </div>
  )
}

export default SearchForm
