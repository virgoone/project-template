import React, { useEffect, useState } from 'react'
import { Avatar, Upload, Descriptions, Tag, Skeleton, UploadProps } from 'antd'
import { CameraOutlined, PlusOutlined } from '@ant-design/icons'
import Link from '@/components/link'
import useLocale from '@/hooks/useLocale'
import locales from './locale'
import styles from './style/header.less?modules'

export default function Info({
  userInfo = {},
  loading,
}: {
  userInfo: any
  loading: boolean
}) {
  console.log(
    'userInfo',
    userInfo.avatar,
    userInfo.phoneNumber,
    userInfo.accountId
  )
  const locale = useLocale(locales)

  const [avatar, setAvatar] = useState('')

  const onAvatarChange: UploadProps['onChange'] = ({ fileList }) => {
    console.log('fileList->', fileList)
    // setAvatar(file.originFile ? URL.createObjectURL(file.originFile) : '')
  }

  useEffect(() => {
    setAvatar(userInfo.avatar)
  }, [userInfo])

  const loadingImg = (
    <Skeleton
      paragraph={{ rows: 0 }}
      style={{ width: '100px', height: '100px' }}
      active
    />
  )

  const loadingNode = <Skeleton paragraph={{ rows: 1 }} active />
  return (
    <div className={styles['info-wrapper']}>
      <Upload showUploadList={false} onChange={onAvatarChange}>
        {loading ? (
          loadingImg
        ) : (
          <Avatar
            size={100}
            icon={<CameraOutlined />}
            className={styles['info-avatar']}
          >
            {avatar ? <img src={avatar} /> : <PlusOutlined />}
          </Avatar>
        )}
      </Upload>
      <Descriptions
        className={styles['info-content']}
        column={2}
        colon
        labelStyle={{ textAlign: 'right' }}
      >
        {[
          {
            label: locale['userSetting.label.name'],
            value: loading ? loadingNode : userInfo.name,
          },
          {
            label: locale['userSetting.label.verified'],
            value: loading ? (
              loadingNode
            ) : (
              <span>
                {userInfo.verified ? (
                  <Tag color="green" className={styles['verified-tag']}>
                    {locale['userSetting.value.verified']}
                  </Tag>
                ) : (
                  <Tag color="red" className={styles['verified-tag']}>
                    {locale['userSetting.value.notVerified']}
                  </Tag>
                )}
                <Link role="button" className={styles['edit-btn']}>
                  {locale['userSetting.btn.edit']}
                </Link>
              </span>
            ),
          },
          {
            label: locale['userSetting.label.accountId'],
            value: loading ? loadingNode : userInfo.accountId,
          },
          {
            label: locale['userSetting.label.phoneNumber'],
            value: loading ? (
              loadingNode
            ) : (
              <span>
                {userInfo.phoneNumber}
                <Link role="button" className={styles['edit-btn']}>
                  {locale['userSetting.btn.edit']}
                </Link>
              </span>
            ),
          },
          {
            label: locale['userSetting.label.registrationTime'],
            value: loading ? loadingNode : userInfo.registrationTime,
          },
        ].map((item) => (
          <Descriptions.Item label={item.label} key={item.label}>
            {item.value}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </div>
  )
}
