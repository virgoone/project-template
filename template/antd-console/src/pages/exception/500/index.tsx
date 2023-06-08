import React from 'react'
import { Result, Button } from 'antd'
import useLocale from '@/hooks/useLocale'
import locales from './locale'
import styles from './style/index.less?modules'

function Exception500() {
  const locale = useLocale(locales)

  return (
    <div className={styles.wrapper}>
      <Result
        className={styles.result}
        status="500"
        subTitle={locale['exception.result.500.description']}
        extra={
          <Button key="back" type="primary">
            {locale['exception.result.500.back']}
          </Button>
        }
      />
    </div>
  )
}

export default Exception500
