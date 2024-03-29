import React from 'react'
import {
  Alert,
  Card,
  Link,
  Typography,
  Tag,
  Skeleton,
} from '@arco-design/web-react'
import { IconDoubleRight } from '@arco-design/web-react/icon'
import { observer } from 'mobx-react'
import useStores from '@/hooks/useStores'
import useLocale from './locale/useLocale'
import CodeBlock from './code-block'
import styles from './style/index.less?modules'

function Welcome() {
  const locale = useLocale()
  const userStore = useStores('user')
  const { info: userInfo = {}, loading } = userStore

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography.Title heading={5} style={{ marginTop: 0 }}>
          {locale['welcome.title.welcome']}
        </Typography.Title>
        <Typography.Text type="secondary">
          {loading ? (
            <Skeleton
              text={{
                rows: 1,
                style: { width: '100px', height: '20px', marginBottom: '-4px' },
                width: ['100%'],
              }}
              animation
            />
          ) : (
            <>
              {userInfo.name}, {userInfo.email}
            </>
          )}
        </Typography.Text>
      </div>
      <div>
        <Alert type="success" content={locale['welcome.invite']} />
        <Card style={{ marginTop: 20 }} title={locale['welcome.usage']}>
          <Typography.Title heading={6} style={{ marginTop: 0 }}>
            1. {locale['welcome.step.title.pickup']}
          </Typography.Title>
          <Typography.Text>
            {locale['welcome.step.content.pickup']}
            <Tag style={{ marginLeft: 8 }}>
              @arco-design/pro-pages-workplace
            </Tag>
          </Typography.Text>

          <Typography.Title heading={6}>
            2. {locale['welcome.step.title.install']}
          </Typography.Title>
          <Typography.Text>
            {locale['welcome.step.content.install']}
          </Typography.Text>
          <CodeBlock code="arco block use @arco-design/pro-pages-workplace" />

          <Typography.Title heading={6} style={{ marginTop: 0 }}>
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
              {locale['welcome.link.material-pro']} <IconDoubleRight />
            </Link>
          </div>
          <div style={{ marginTop: 8 }}>
            <Link target="_blank" href="https://arco.design/material">
              {locale['welcome.link.material-all']} <IconDoubleRight />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default observer(Welcome)
