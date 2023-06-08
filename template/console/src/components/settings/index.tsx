import React, { useState } from 'react'
import { Drawer, Alert, Message } from '@arco-design/web-react'
import { IconSettings } from '@arco-design/web-react/icon'
import { observer } from 'mobx-react'

import useLocale from '@/hooks/useLocale'
import useStores from '@/hooks/useStores'
import clipboard from '@/utils/clipboard'

import Block from './block'
import ColorPanel from './color'

import styles from './style/index.less?modules'

function Setting() {
  const [visible, setVisible] = useState(false)
  const locale = useLocale()
  const store = useStores('global')

  const { settings } = store

  function onCopySettings() {
    clipboard(JSON.stringify(settings, null, 2))
    Message.success(locale['settings.copySettings.message'])
  }

  return (
    <div>
      <div className={styles.btn} onClick={() => setVisible(true)}>
        <IconSettings />
      </div>
      <Drawer
        width={300}
        title={
          <>
            <IconSettings />
            {locale['settings.title']}
          </>
        }
        visible={visible}
        okText={locale['settings.copySettings']}
        cancelText={locale['settings.close']}
        onOk={onCopySettings}
        onCancel={() => setVisible(false)}
      >
        <Block title={locale['settings.themeColor']}>
          <ColorPanel />
        </Block>
        <Block
          title={locale['settings.content']}
          options={[
            { name: 'settings.navbar', value: 'navbar' },
            { name: 'settings.menu', value: 'menu' },
            { name: 'settings.footer', value: 'footer' },
            { name: 'settings.menuWidth', value: 'menuWidth', type: 'number' },
          ]}
        />
        <Block
          title={locale['settings.otherSettings']}
          options={[{ name: 'settings.colorWeek', value: 'colorWeek' }]}
        />
        <Alert content={locale['settings.alertContent']} />
      </Drawer>
    </div>
  )
}

export default observer(Setting)
