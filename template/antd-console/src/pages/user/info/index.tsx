import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { observer } from 'mobx-react'
import { Typography, Row, Col, Button, Result, Skeleton, Card } from 'antd'
import useStores from '@/hooks/useStores'
import useLocale from '@/hooks/useLocale'
import locales from './locale'
import UserInfoHeader from './header'
import MyProject from './my-projects'
import MyTeam from './my-team'
import LatestNews from './latest-news'
import styles from './style/index.less?modules'
import './mock'

const { Title } = Typography
function UserInfo() {
  const locale = useLocale(locales)
  const userStore = useStores('user')
  const { info: userInfo = {}, loading } = userStore

  const [noticeLoading, setNoticeLoading] = useState(false)

  const getNotice = async () => {
    setNoticeLoading(true)
    await axios.get('/api/user/notice').finally(() => setNoticeLoading(false))
  }

  useEffect(() => {
    getNotice()
  }, [])

  return (
    <div>
      <UserInfoHeader userInfo={userInfo} loading={loading} />
      <Row gutter={16}>
        <Col span={16}>
          <Card className={styles.wrapper}>
            <div className={styles['card-title-wrapper']}>
              <Title level={5}>{locale['userInfo.title.project']}</Title>
              <Button type="text">{locale['userInfo.btn.more']}</Button>
            </div>
            <MyProject />
          </Card>
        </Col>
        <Col span={8}>
          <Card className={styles.wrapper}>
            <div
              className={styles['card-title-wrapper']}
              style={{ marginBottom: '5px' }}
            >
              <Title level={5}>{locale['userInfo.title.team']}</Title>
            </div>
            <MyTeam />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={16}>
          <Card className={styles.wrapper}>
            <div className={styles['card-title-wrapper']}>
              <Title level={5}>{locale['userInfo.title.news']}</Title>
              <Button type="text">{locale['userInfo.btn.all']}</Button>
            </div>
            <LatestNews />
          </Card>
        </Col>
        <Col span={8}>
          <Card className={styles.wrapper}>
            <div className={styles['card-title-wrapper']}>
              <Title level={5}>{locale['userInfo.title.notice']}</Title>
            </div>
            {noticeLoading ? (
              <Skeleton paragraph={{ rows: 10 }} active />
            ) : (
              <Result
                status="404"
                subTitle={locale['userInfo.notice.empty']}
                style={{ paddingTop: '60px', paddingBottom: '130px' }}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default observer(UserInfo)
