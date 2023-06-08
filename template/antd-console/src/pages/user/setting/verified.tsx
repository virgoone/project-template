import React, { useEffect, useState } from 'react'
import {
  Descriptions,
  Table,
  Typography,
  Skeleton,
  Tag,
  Space,
  Button,
  Badge,
} from 'antd'
import useLocale from '@/hooks/useLocale'
import axios from 'axios'
import locales from './locale'
import styles from './style/index.less?modules'

function Verified() {
  const locale = useLocale(locales)
  const [data, setData] = useState({
    accountType: '',
    isVerified: true,
    verifiedTime: '',
    legalPersonName: '',
    certificateType: '',
    certificationNumber: '',
    enterpriseName: '',
    enterpriseCertificateType: '',
    organizationCode: '',
  })

  const [loading, setLoading] = useState(true)
  const [tableData, setTableData] = useState([])
  const [tableLoading, setTableLoading] = useState(true)

  const getData = async () => {
    const { data } = await axios
      .get('/api/user/verified/enterprise')
      .finally(() => setLoading(false))
    setData(data)

    const { data: tableData } = await axios
      .get('/api/user/verified/authList')
      .finally(() => setTableLoading(false))
    setTableData(tableData)
  }

  useEffect(() => {
    getData()
  }, [])

  const loadingNode = <Skeleton paragraph={{ rows: 1 }} />

  return (
    <div className={styles.verified}>
      <Typography.Title level={5} style={{ marginTop: '0' }}>
        {locale['userSetting.verified.enterprise']}
      </Typography.Title>
      <Descriptions
        className={styles['verified-enterprise']}
        labelStyle={{ textAlign: 'right' }}
        layout="horizontal"
        colon
        column={3}
      >
        {Object.entries(data)
          .map(([key, value]) => ({
            label: locale[`userSetting.verified.label.${key}`],
            value: loading ? (
              loadingNode
            ) : typeof value === 'boolean' ? (
              value ? (
                <Tag color="green">{locale['userSetting.value.verified']}</Tag>
              ) : (
                <Tag color="red">{locale['userSetting.value.notVerified']}</Tag>
              )
            ) : (
              value
            ),
          }))
          .map((item) => (
            <Descriptions.Item key={item.label} label={item.label}>
              {item.value}
            </Descriptions.Item>
          ))}
      </Descriptions>

      <Typography.Title level={5}>
        {locale['userSetting.verified.records']}
      </Typography.Title>
      <Table
        columns={[
          {
            title: locale['userSetting.verified.authType'],
            dataIndex: 'authType',
          },
          {
            title: locale['userSetting.verified.authContent'],
            dataIndex: 'authContent',
          },
          {
            title: locale['userSetting.verified.authStatus'],
            dataIndex: 'authStatus',
            render(x) {
              return x ? (
                <Badge
                  status="success"
                  text={locale['userSetting.verified.status.success']}
                ></Badge>
              ) : (
                <span>
                  <Badge
                    status="processing"
                    text={locale['userSetting.verified.status.waiting']}
                  ></Badge>
                </span>
              )
            },
          },
          {
            title: locale['userSetting.verified.createdTime'],
            dataIndex: 'createdTime',
          },
          {
            title: locale['userSetting.verified.operation'],
            // headerCellStyle: { paddingLeft: '15px' },
            render: (_, x: any) => {
              if (x.authStatus) {
                return (
                  <Button type="text">
                    {locale['userSetting.verified.operation.view']}
                  </Button>
                )
              }
              return (
                <Space>
                  <Button type="text">
                    {locale['userSetting.verified.operation.view']}
                  </Button>
                  <Button type="text">
                    {locale['userSetting.verified.operation.revoke']}
                  </Button>
                </Space>
              )
            },
          },
        ]}
        dataSource={tableData}
        loading={tableLoading}
      />
    </div>
  )
}

export default Verified
