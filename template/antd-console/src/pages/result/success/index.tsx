import React from 'react'
import { Typography, Result, Button, Steps } from 'antd'
import useLocale from '@/hooks/useLocale'
import locales from './locale'
import styles from './style/index.less?modules'

const Step = Steps.Step

function Success() {
  const locale = useLocale(locales)

  return (
    <div>
      <div className={styles.wrapper}>
        <Result
          className={styles.result}
          status="success"
          title={locale['success.result.title']}
          subTitle={locale['success.result.subTitle']}
          extra={[
            <Button key="again" ghost style={{ marginRight: 16 }}>
              {locale['success.result.printResult']}
            </Button>,
            <Button key="back" type="primary">
              {locale['success.result.projectList']}
            </Button>,
          ]}
        />
        <div className={styles['steps-wrapper']}>
          <Typography.Paragraph strong>
            {locale['success.result.progress']}
          </Typography.Paragraph>
          <Steps progressDot current={2}>
            <Step
              title={locale['success.submitApplication']}
              description="2020/10/10 14:00:39"
            />
            <Step
              title={locale['success.leaderReview']}
              description={locale['success.processing']}
            />
            <Step
              title={locale['success.purchaseCertificate']}
              description={locale['success.waiting']}
            />
            <Step
              title={locale['success.safetyTest']}
              description={locale['success.waiting']}
            />
            <Step
              title={locale['success.launched']}
              description={locale['success.waiting']}
            />
          </Steps>
        </div>
      </div>
    </div>
  )
}

export default Success
