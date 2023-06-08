import React, { useState, useEffect } from 'react'
import { Avatar, Typography, List, Skeleton } from 'antd'
import axios from 'axios'

const { Text } = Typography

interface ITeam {
  avatar?: string
  name?: string
  members?: number
}

function MyTeam() {
  const [data, setData] = useState<ITeam[]>(new Array(4).fill({}))
  const [loading, setLoading] = useState(true)

  const getData = async () => {
    const { data } = await axios
      .get('/api/users/teamList')
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
          <List.Item
            key={index}
            style={
              index !== data.length - 1
                ? { padding: '8px 20px' }
                : { padding: '8px 20px 0px 20px' }
            }
          >
            {loading ? (
              <Skeleton
                active
                paragraph={{ width: ['80%', '20%'], rows: 2 }}
                avatar={{ shape: 'circle' }}
              />
            ) : (
              <List.Item.Meta
                avatar={
                  <Avatar size={48}>
                    <img src={item.avatar} />
                  </Avatar>
                }
                title={item.name}
                description={
                  <Text type="secondary" style={{ fontSize: '12px' }}>{`共${(
                    item.members || 0
                  ).toLocaleString()}人`}</Text>
                }
              />
            )}
          </List.Item>
        )
      }}
    />
  )
}

export default MyTeam
