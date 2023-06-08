import React from 'react'
import { Avatar, Space, Skeleton } from 'antd'
import {
  CameraOutlined,
  UserOutlined,
  HomeOutlined,
} from '@ant-design/icons'
import {IconLocation} from '@/components/icon'
import styles from './style/index.less?modules'

interface HeaderProps {
  userInfo?: {
    name?: string
    avatar?: string
    jobName?: string
    organizationName?: string
    locationName?: string
  }
  loading?: boolean
}

function UserInfoHeader(props: HeaderProps) {
  const { userInfo = {}, loading } = props

  const loadingNode = (
    <Skeleton
      paragraph={{
        rows: 1,
        style: { width: '100px', height: '20px', marginBottom: '-4px' },
        width: ['100%'],
      }}
      active
    />
  )
  const loadingImgNode = (
    <Skeleton
      paragraph={{ rows: 0 }}
      avatar={{ style: { width: '64px', height: '64px' }, shape: 'circle' }}
      active
    />
  )
  return (
    <div className={styles.header}>
      <Space
        size={8}
        direction="vertical"
        align="center"
        className={styles['header-content']}
      >
        {loading ? (
          loadingImgNode
        ) : (
          <Avatar size={64} icon={<CameraOutlined />}>
            <img src={userInfo.avatar} />
          </Avatar>
        )}
        <div className={styles.username}>
          {loading ? loadingNode : userInfo.name}
        </div>
        <div className={styles['user-msg']}>
          <Space size={18}>
            <div>
              <UserOutlined />
              <span className={styles['user-msg-text']}>
                {loading ? loadingNode : userInfo.jobName}
              </span>
            </div>
            <div>
              <HomeOutlined />
              <span className={styles['user-msg-text']}>
                {loading ? loadingNode : userInfo.organizationName}
              </span>
            </div>
            <div className='flex items-center'>
              <IconLocation />
              <span className={styles['user-msg-text']}>
                {loading ? loadingNode : userInfo.locationName}
              </span>
            </div>
          </Space>
        </div>
      </Space>
    </div>
  )
}

export default UserInfoHeader
