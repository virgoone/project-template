import React, { ReactNode } from 'react'
import { Switch, Divider, InputNumber } from '@arco-design/web-react'
import { observer } from 'mobx-react'
import useLocale from '@/hooks/useLocale'
import useStores from '@/hooks/useStores'

import styles from './style/block.less?modules'

export interface BlockProps {
  title?: ReactNode
  options?: { name: string; value: string; type?: 'switch' | 'number' }[]
  children?: ReactNode
}

function Block(props: BlockProps) {
  const { title, options, children } = props
  const locale = useLocale()
  const store = useStores('global')

  const { settings, updateSettings } = store

  return (
    <div className={styles.block}>
      <h5 className={styles.title}>{title}</h5>
      {options &&
        options.map((option) => {
          const type = option.type || 'switch'

          return (
            <div className={styles.switchWrapper} key={option.value}>
              <span>{locale[option.name]}</span>
              {type === 'switch' && (
                <Switch
                  size="small"
                  checked={!!settings[option.value]}
                  onChange={(checked) => {
                    const newSetting = {
                      ...settings,
                      [option.value]: checked,
                    }
                    updateSettings(newSetting)
                    // set color week
                    if (checked && option.value === 'colorWeek') {
                      document.body.style.filter = 'invert(80%)'
                    }
                    if (!checked && option.value === 'colorWeek') {
                      document.body.style.filter = 'none'
                    }
                  }}
                />
              )}
              {type === 'number' && (
                <InputNumber
                  style={{ width: 80 }}
                  size="small"
                  value={settings.menuWidth}
                  onChange={(value) => {
                    const newSetting = {
                      ...settings,
                      [option.value]: value,
                    }
                    updateSettings(newSetting)
                  }}
                />
              )}
            </div>
          )
        })}
      {children}
      <Divider />
    </div>
  )
}

export default observer(Block)
