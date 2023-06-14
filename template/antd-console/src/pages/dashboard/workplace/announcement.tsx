import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, Skeleton, Tag } from 'antd'
import Link from '@/components/link'
import useLocale from './locale/useLocale'
import styles from './style/announcement.less?modules'

function Announcement() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const locale = useLocale()

  const fetchData = () => {
    setLoading(true)
    axios
      .get('/api/workplace/announcement')
      .then((res) => {
        setData(res.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  function getTagColor(type: string) {
    switch (type) {
      case 'activity':
        return 'orangered'
      case 'info':
        return 'cyan'
      case 'notice':
        return 'geekblue'
      default:
        return 'geekblue'
    }
  }

  return (
    <Card
      title={locale['workplace.announcement']}
      extra={<Link>{locale['workplace.seeMore']}</Link>}
      headStyle={{ borderBottom: 0 }}
    >
      <Skeleton loading={loading} paragraph={{ rows: 5, width: '100%' }} active>
        <div>
          {data.map((d) => (
            <div key={d.key} className={styles.item}>
              <Tag color={getTagColor(d.type)}>
                {locale[`workplace.${d.type}`]}
              </Tag>
              <span className={styles.link}>{d.content}</span>
            </div>
          ))}
        </div>
      </Skeleton>
    </Card>
  )
}

export default Announcement
