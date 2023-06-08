import { Row, Col, Card, Typography, Avatar, Space, Grid } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import React from 'react'
import useLocale from './locale/useLocale'
import styles from './style/index.less?modules'

interface StudioProps {
  userInfo: {
    name?: string
    avatar?: string
  }
}

export default function Studio(props: StudioProps) {
  const locale = useLocale()
  const { userInfo } = props
  return (
    <Card bordered={false}>
      <Row>
        <Col span={16}>
          <Typography.Title
            style={{ marginTop: 0, marginBottom: 16 }}
            level={5}
          >
            {locale['monitor.title.studioPreview']}
          </Typography.Title>
        </Col>
        <Col span={8} style={{ textAlign: 'right' }}>
          <MoreOutlined />
        </Col>
      </Row>
      <div className={styles['studio-wrapper']}>
        <img
          src="http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c788fc704d32cf3b1136c7d45afc2669.png~tplv-uwbnlip3yd-webp.webp"
          className={styles['studio-preview']}
        />
        <div className={styles['studio-bar']}>
          {userInfo && (
            <div>
              <Space size={12}>
                <Avatar size={24}>
                  <img src={userInfo.avatar} />
                </Avatar>
                <Typography.Text>
                  {userInfo.name}
                  {locale['monitor.studioPreview.studio']}
                </Typography.Text>
              </Space>
            </div>
          )}
          <Typography.Text type="secondary">
            3,6000 {locale['monitor.studioPreview.watching']}
          </Typography.Text>
        </div>
      </div>
    </Card>
  )
}
