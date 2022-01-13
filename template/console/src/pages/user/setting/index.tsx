import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { Card, Tabs } from '@arco-design/web-react'
import useLocale from '@/hooks/useLocale'
import useStores from '@/hooks/useStores'
import locales from './locale'
import InfoHeader from './header'
import InfoForm from './info'
import Security from './security'
import Verified from './verified'
import './mock'

function UserInfo() {
  const locale = useLocale(locales)
  const userStore = useStores('user')
  const { info: userInfo = {}, loading } = userStore
  const [activeTab, setActiveTab] = useState('basic')

  return (
    <div>
      <Card style={{ padding: '14px 20px' }}>
        <InfoHeader userInfo={userInfo} loading={loading} />
      </Card>
      <Card style={{ marginTop: '16px' }}>
        <Tabs activeTab={activeTab} onChange={setActiveTab} type="rounded">
          <Tabs.TabPane
            key="basic"
            title={locale['userSetting.title.basicInfo']}
          >
            <InfoForm loading={loading} />
          </Tabs.TabPane>
          <Tabs.TabPane
            key="security"
            title={locale['userSetting.title.security']}
          >
            <Security />
          </Tabs.TabPane>
          <Tabs.TabPane
            key="verified"
            title={locale['userSetting.label.verified']}
          >
            <Verified />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  )
}

export default observer(UserInfo)
