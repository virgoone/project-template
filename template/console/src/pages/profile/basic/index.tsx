import React, { useEffect, useState } from 'react'
import {
  Card,
  Steps,
  Typography,
  Grid,
  Space,
  Button,
  Table,
  Badge,
} from '@arco-design/web-react'
import axios from 'axios'
import useLocale from '@/hooks/useLocale'
import locales from './locale'
import ProfileItem from './item'
import styles from './style/index.scss?modules'
import './mock'

function BasicProfile() {
  const locale = useLocale(locales)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({ status: 1 })
  const [preLoading, setPreLoading] = useState(false)
  const [preData, setPreData] = useState({})
  const [tableLoading, setTableLoading] = useState(false)
  const [tableData, setTableData] = useState([])

  function fetchData() {
    setLoading(true)
    axios
      .get('/api/basicProfile')
      .then((res) => {
        setData(res.data || {})
      })
      .finally(() => {
        setLoading(false)
      })
  }

  function fetchPreData() {
    setPreLoading(true)
    axios
      .get('/api/basicProfile')
      .then((res) => {
        setPreData(res.data || {})
      })
      .finally(() => {
        setPreLoading(false)
      })
  }

  function fetchTableData() {
    setTableLoading(true)
    axios
      .get('/api/adjustment')
      .then((res) => {
        setTableData(res.data)
      })
      .finally(() => {
        setTableLoading(false)
      })
  }
  useEffect(() => {
    fetchData()
    fetchPreData()
    fetchTableData()
  }, [])

  return (
    <div className={styles.container}>
      <Card>
        <Grid.Row
          justify="space-between"
          align="center"
          style={{ marginBottom: 24 }}
        >
          <Grid.Col span={16}>
            <Typography.Title heading={6} style={{ margin: 0 }}>
              {locale['basicProfile.title.form']}
            </Typography.Title>
          </Grid.Col>
          <Grid.Col span={8} style={{ textAlign: 'right' }}>
            <Space>
              <Button>{locale['basicProfile.cancel']}</Button>
              <Button type="primary">{locale['basicProfile.goBack']}</Button>
            </Space>
          </Grid.Col>
        </Grid.Row>

        <Steps current={data.status} lineless className={styles.steps}>
          <Steps.Step title={locale['basicProfile.steps.commit']} />
          <Steps.Step title={locale['basicProfile.steps.approval']} />
          <Steps.Step title={locale['basicProfile.steps.finish']} />
        </Steps>
      </Card>

      <ProfileItem
        title={locale['basicProfile.title.currentParams']}
        data={data}
        type="current"
        loading={loading}
      />
      <ProfileItem
        title={locale['basicProfile.title.originParams']}
        data={preData}
        type="origin"
        loading={preLoading}
      />
      <Card>
        <Typography.Title
          heading={6}
          style={{ marginTop: 0, marginBottom: '16px' }}
        >
          {locale['basicProfile.adjustment.record']}
        </Typography.Title>
        <Table
          loading={tableLoading}
          data={tableData}
          columns={[
            {
              dataIndex: 'contentId',
              title: locale['basicProfile.adjustment.contentId'],
            },
            {
              dataIndex: 'content',
              title: locale['basicProfile.adjustment.content'],
            },
            {
              dataIndex: 'status',
              title: locale['basicProfile.adjustment.status'],
              render: (status) => {
                if (status) {
                  return (
                    <Badge
                      status="success"
                      text={locale['basicProfile.adjustment.success']}
                    />
                  )
                }

                return (
                  <Badge
                    status="processing"
                    text={locale['basicProfile.adjustment.waiting']}
                  />
                )
              },
            },
            {
              dataIndex: 'updatedTime',
              title: locale['basicProfile.adjustment.updatedTime'],
            },
            {
              title: locale['basicProfile.adjustment.operation'],
              headerCellStyle: { paddingLeft: '15px' },
              render() {
                return (
                  <Button type="text">
                    {locale['basicProfile.adjustment.operation.view']}
                  </Button>
                )
              },
            },
          ]}
        />
      </Card>
    </div>
  )
}

export default BasicProfile
