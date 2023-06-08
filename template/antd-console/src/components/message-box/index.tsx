import React, { useEffect, useState } from 'react'
import axios from 'axios'
import groupBy from 'lodash/groupBy'
import { Badge, Spin, Button, Avatar, Tabs } from 'antd'
import {
  DesktopOutlined,
  MessageOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import HeaderDropdown from '@/components/dropdown'
import useLocale from '@/hooks/useLocale'
import MessageList, { MessageListType } from './list'
import styles from './style/index.less?modules'

function DropContent() {
  const locale = useLocale()
  const [loading, setLoading] = useState(false)
  const [groupData, setGroupData] = useState<{
    [key: string]: MessageListType
  }>({})
  const [sourceData, setSourceData] = useState<MessageListType>([])

  function fetchSourceData(showLoading = true) {
    showLoading && setLoading(true)
    axios
      .get('/api/message/list')
      .then((res) => {
        setSourceData(res.data)
      })
      .finally(() => {
        showLoading && setLoading(false)
      })
  }

  function readMessage(data: MessageListType) {
    const ids = data.map((item) => item.id)
    axios
      .post('/api/message/read', {
        ids,
      })
      .then(() => {
        fetchSourceData()
      })
  }

  useEffect(() => {
    fetchSourceData()
  }, [])

  useEffect(() => {
    const groupData: { [key: string]: MessageListType } = groupBy(
      sourceData,
      'type'
    )
    setGroupData(groupData)
  }, [sourceData])

  const tabList = [
    {
      key: 'message',
      title: locale['message.tab.title.message'],
      titleIcon: <MessageOutlined />,
    },
    {
      key: 'notice',
      title: locale['message.tab.title.notice'],
      titleIcon: <CustomerServiceOutlined />,
    },
    {
      key: 'todo',
      title: locale['message.tab.title.todo'],
      titleIcon: <FileTextOutlined />,
      avatar: (
        <Avatar style={{ backgroundColor: '#0FC6C2' }}>
          <DesktopOutlined />
        </Avatar>
      ),
    },
  ]

  return (
    <div className={styles['message-box']}>
      <Spin spinning={loading} style={{ display: 'block' }}>
        <Tabs
          type="line"
          defaultActiveKey="message"
          destroyInactiveTabPane
          tabBarExtraContent={{
            right: (
              <Button type="link" onClick={() => setSourceData([])}>
                {locale['message.empty']}
              </Button>
            ),
          }}
          items={tabList.map((item) => {
            const { key, title } = item
            const data = groupData[key] || []
            const unReadData = data.filter((item) => !item.status)
            return {
              tabKey: key,
              key,
              label: (
                <span>
                  {title}
                  {unReadData.length ? `(${unReadData.length})` : ''}
                </span>
              ),
              children: (
                <MessageList
                  data={data}
                  unReadData={unReadData}
                  onItemClick={(item) => {
                    readMessage([item])
                  }}
                  onAllBtnClick={(unReadData) => {
                    readMessage(unReadData)
                  }}
                />
              ),
            }
          })}
        ></Tabs>
      </Spin>
    </div>
  )
}

function MessageBox({ children }: { children: React.ReactNode }) {
  return (
    <HeaderDropdown trigger={['click']} dropdownRender={() => <DropContent />}>
      <Badge count={9} dot>
        {children}
      </Badge>
    </HeaderDropdown>
  )
}

export default MessageBox
