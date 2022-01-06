import React from 'react'
import { Typography, Grid, Statistic, Space } from '@arco-design/web-react'
import { IconHome } from '@arco-design/web-react/icon'
import { observer } from 'mobx-react'
import useLocale from '@/hooks/useLocale'
import useStores from '@/hooks/useStores'

import styles from './style/index.scss?modules'

const { Title, Text } = Typography
const { Row, Col } = Grid

function Banner() {
  const userInfo = useStores('user')
  const locale = useLocale()

  return (
    <Row className={styles.banner}>
      <Col span={8}>
        <Title heading={5} style={{ marginTop: 0 }}>
          {locale['workplace.welcome']}
        </Title>
        {userInfo && (
          <Text type="secondary">
            {userInfo.name}，{userInfo.email}
          </Text>
        )}
      </Col>
      <Col span={16} style={{ textAlign: 'right' }}>
        <Space size={30}>
          <Statistic
            title={locale['workplace.balance']}
            value={392.52}
            precision={2}
            prefix={<IconHome />}
            countUp
          />
          <Statistic
            title={locale['workplace.order.pending']}
            value={0}
            precision={2}
            prefix={<IconHome />}
          />
          <Statistic
            title={locale['workplace.order.pendingRenewal']}
            value={1}
            prefix={<IconHome />}
          />
        </Space>
      </Col>
    </Row>
  )
}

export default observer(Banner)
