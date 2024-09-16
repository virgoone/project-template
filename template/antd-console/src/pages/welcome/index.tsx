import React from 'react'
import { Alert, Card, Typography, Tag, Skeleton } from 'antd'
import Link from '@/components/link'
import { DoubleRightOutlined } from '@ant-design/icons'
import { useModel } from '@/store'
import useLocale from './locale/useLocale'
import CodeBlock from './code-block'
import styles from './style/index.less?modules'

function Welcome() {
  const locale = useLocale()
  const store = useModel(state => state)
  const { info: userInfo = {}, loading } = store


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography.Title level={5} style={{ marginTop: 0 }}>
          {locale['welcome.title.welcome']}
        </Typography.Title>
        <Typography.Text type="secondary">
          {loading ? (
            <Skeleton
              paragraph={{
                rows: 1,
                style: { width: '100px', height: '20px', marginBottom: '-4px' },
                width: ['100%'],
              }}
              active
            />
          ) : (
            <>
              {userInfo.name}, {userInfo.email}
            </>
          )}
        </Typography.Text>
      </div>
      <div>
        <Alert type="success" message={locale['welcome.invite']} />
        <Card style={{ marginTop: 20 }} title={locale['welcome.usage']}>
          <Typography.Title level={5} style={{ marginTop: 0 }}>
            1. {locale['welcome.step.title.pickup']}
          </Typography.Title>
          <Typography.Text>
            {locale['welcome.step.content.pickup']}
            <Tag style={{ marginLeft: 8 }}>
              @arco-design/pro-pages-workplace
            </Tag>
          </Typography.Text>

          <Typography.Title level={5}>
            2. {locale['welcome.step.title.install']}
          </Typography.Title>
          <Typography.Text>
            {locale['welcome.step.content.install']}
          </Typography.Text>
          <CodeBlock code="arco block use @arco-design/pro-pages-workplace" />

          <Typography.Title level={5} style={{ marginTop: 0 }}>
            3. {locale['welcome.step.title.result']}
          </Typography.Title>
          <Typography.Text>
            {locale['welcome.step.content.result']}
          </Typography.Text>
        </Card>
        <Card style={{ marginTop: 20 }}>
          <Typography.Text>{locale['welcome.title.material']}</Typography.Text>
          <div style={{ marginTop: 8 }}>
            <Link
              target="_blank"
              href="https://arco.design/material?category=arco-design-pro"
            >
              {locale['welcome.link.material-pro']} <DoubleRightOutlined />
            </Link>
          </div>
          <div style={{ marginTop: 8 }}>
            <Link target="_blank" href="https://arco.design/material">
              {locale['welcome.link.material-all']} <DoubleRightOutlined />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Welcome
