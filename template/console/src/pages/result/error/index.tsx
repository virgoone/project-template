import React from 'react'
import { Typography, Result, Button, Link } from '@arco-design/web-react'
import { IconLink } from '@arco-design/web-react/icon'
import useLocale from '@/hooks/useLocale'
import locales from './locale'
import styles from './style/index.scss?modules'

function Success() {
  const locale = useLocale(locales)

  return (
    <div>
      <div className={styles.wrapper}>
        <Result
          className={styles.result}
          status="error"
          title={locale['error.result.title']}
          subTitle={locale['error.result.subTitle']}
          extra={[
            <Button key="again" type="secondary" style={{ marginRight: 16 }}>
              {locale['error.result.goBack']}
            </Button>,
            <Button key="back" type="primary">
              {locale['error.result.retry']}
            </Button>,
          ]}
        />
        <div className={styles['details-wrapper']}>
          <Typography.Title heading={6} style={{ marginTop: 0 }}>
            {locale['error.detailTitle']}
          </Typography.Title>
          <Typography.Paragraph style={{ marginBottom: 0 }}>
            <ol>
              <li>
                {locale['error.detailLine.record']}
                <Link>
                  <IconLink />
                  {locale['error.detailLine.record.link']}
                </Link>
              </li>
              <li>
                {locale['error.detailLine.auth']}
                <Link>{locale['error.detailLine.auth.link']}</Link>
              </li>
            </ol>
          </Typography.Paragraph>
        </div>
      </div>
    </div>
  )
}

export default Success
