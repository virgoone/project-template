import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { List, Typography, Skeleton, Avatar } from 'antd'
import styles from './style/index.less?modules'

const { Paragraph } = Typography
interface INews {
  title?: string
  description?: string
  avatar?: string
}

function LatestNews() {
  const [data, setData] = useState<INews[]>(new Array(4).fill({}))
  const [loading, setLoading] = useState(true)

  const getData = async () => {
    const { data } = await axios
      .get('/api/user/latestNews')
      .finally(() => setLoading(false))
    setData(data)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <List
      dataSource={data}
      renderItem={(item, index) => {
        return (
          <List.Item key={index} style={{ padding: '24px 20px' }}>
            {loading ? (
              <Skeleton
                active
                paragraph={{ width: ['60%', '90%'], rows: 2 }}
                avatar={{ shape: 'circle' }}
              />
            ) : (
              <List.Item.Meta
                className={styles['list-meta-ellipsis']}
                avatar={
                  <Avatar size={48}>
                    <img src={item.avatar} />
                  </Avatar>
                }
                title={item.title}
                description={
                  <Paragraph
                    ellipsis={{ rows: 1 }}
                    type="secondary"
                    style={{ fontSize: '12px', margin: 0 }}
                  >
                    {item.description}
                  </Paragraph>
                }
              />
            )}
          </List.Item>
        )
      }}
    />
  )
}

export default LatestNews
