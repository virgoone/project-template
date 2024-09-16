import { Space } from 'antd'
import React from 'react'
import { useModel } from '@/store'
import ChatPanel from './chat-panel'
import Studio from './studio'
import DataStatistic from './data-statistic'
import StudioStatus from './studio-status'
import QuickOperation from './quick-operation'
import StudioInformation from './studio-information'
import styles from './style/index.less?modules'
import './mock'

function Monitor() {
  const userInfo = useModel(state => state.info)

  return (
    <div>
      <div className={styles.layout}>
        <div className={styles['layout-left-side']}>
          <ChatPanel />
        </div>
        <div className={styles['layout-content']}>
          <Space size={12} direction="vertical" style={{ width: '100%' }}>
            <Studio userInfo={userInfo} />
            <DataStatistic />
          </Space>
        </div>
        <div className={styles['layout-right-side']}>
          <Space size={12} direction="vertical" style={{ width: '100%' }}>
            <StudioStatus />
            <QuickOperation />
            <StudioInformation />
          </Space>
        </div>
      </div>
    </div>
  )
}
export default Monitor
