import React from 'react'
import { Result, Button } from '@arco-design/web-react'
import useLocale from '@/hooks/useLocale'
import locales from './locale'
import styles from './style/index.less?modules'

function Exception403() {
  const locale = useLocale(locales)

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Result
          className={styles.result}
          status="403"
          subTitle={locale['exception.result.403.description']}
          extra={
            <Button key="back" type="primary">
              {locale['exception.result.403.back']}
            </Button>
          }
        />
      </div>
    </div>
  )
}

export default Exception403
