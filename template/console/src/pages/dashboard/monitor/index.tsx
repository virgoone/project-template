import { Space } from '@arco-design/web-react'
import React from 'react'
import useStores from '@/hooks/useStores'
import ChatPanel from './chat-panel'
import Studio from './studio'
import DataStatistic from './data-statistic'
import StudioStatus from './studio-status'
import QuickOperation from './quick-operation'
import StudioInformation from './studio-information'
import styles from './style/index.scss?modules'
import './mock'
import { observer } from 'mobx-react'

function Monitor() {
  const userInfo = useStores('user')

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
export default observer(Monitor)
