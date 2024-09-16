import React, { useState } from 'react'
import { Card, Tabs } from 'antd'
import useLocale from '@/hooks/useLocale'
import { useModel } from '@/store'
import locales from './locale'
import InfoHeader from './header'
import InfoForm from './info'
import Security from './security'
import Verified from './verified'
import './mock'

function UserInfo() {
  const locale = useLocale(locales)
  const store = useModel(state => state)
  const { info: userInfo = {}, loading } = store
  const [activeTab, setActiveTab] = useState('basic')

  return (
    <div>
      <Card style={{ padding: '14px 20px' }}>
        <InfoHeader userInfo={userInfo} loading={loading} />
      </Card>
      <Card style={{ marginTop: '16px' }}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          type="line"
          items={[
            {
              key: 'basic',
              label: locale['userSetting.title.basicInfo'],
              children: <InfoForm loading={loading} />,
            },
            {
              key: 'security',
              label: locale['userSetting.title.security'],
              children: <Security />,
            },
            {
              key: 'verified',
              label: locale['userSetting.label.verified'],
              children: <Verified />,
            },
          ]}
        ></Tabs>
      </Card>
    </div>
  )
}

export default UserInfo
