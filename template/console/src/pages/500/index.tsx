import React from 'react'
import { Result, Button } from '@arco-design/web-react'
import useLocale from '@/hooks/useLocale'
import styles from './style/index.scss?modules'

function Exception500() {
  const locale = useLocale()

  return (
    <div className={styles.container}>
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
