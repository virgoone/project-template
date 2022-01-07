import React from 'react'
import { Result, Button } from '@arco-design/web-react'
import useLocale from '@/hooks/useLocale'
import styles from './style/index.scss?modules'

function Exception404() {
  const locale = useLocale()

  return (
    <div className={styles.container}>
      <Result
        className={styles.result}
        status="404"
        subTitle={locale['exception.result.404.description']}
        extra={[
          <Button key="again" style={{ marginRight: 16 }}>
            {locale['exception.result.404.retry']}
          </Button>,
          <Button key="back" type="primary">
            {locale['exception.result.404.back']}
          </Button>,
        ]}
      />
    </div>
  )
}

export default Exception404
