import React, { useEffect, useState } from 'react'
import { Space, Select, Input, Button, Typography, Spin } from 'antd'
import { SmileOutlined, DownloadOutlined } from '@ant-design/icons'
import axios from 'axios'
import useLocale from './locale/useLocale'
import MessageList from './message-list'
import styles from './style/index.less?modules'

export default function ChatPanel() {
  const locale = useLocale()
  const [messageList, setMessageList] = useState([])
  const [loading, setLoading] = useState(false)

  function fetchMessageList() {
    setLoading(true)
    axios
      .get('/api/chatList')
      .then((res) => {
        setMessageList(res.data || [])
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchMessageList()
  }, [])

  return (
    <div className={styles['chat-panel']}>
      <div className={styles['chat-panel-header']}>
        <Typography.Title style={{ marginTop: 0, marginBottom: 16 }} level={5}>
          {locale['monitor.title.chatPanel']}
        </Typography.Title>
        <Space size={8}>
          <Select style={{ width: 80 }} defaultValue="all">
            <Select.Option value="all">
              {locale['monitor.chat.options.all']}
            </Select.Option>
          </Select>
          <Input.Search
            placeholder={locale['monitor.chat.placeholder.searchCategory']}
          />
          <Button icon={<DownloadOutlined />}></Button>
        </Space>
      </div>
      <div className={styles['chat-panel-content']}>
        <Spin spinning={loading} style={{ width: '100%' }}>
          <MessageList data={messageList} />
        </Spin>
      </div>
      <div className={styles['chat-panel-footer']}>
        <Space size={8}>
          <Input suffix={<SmileOutlined />} />
          <Button type="primary">{locale['monitor.chat.update']}</Button>
        </Space>
      </div>
    </div>
  )
}
