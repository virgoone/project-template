import React from 'react'
import { Trigger, Typography } from '@arco-design/web-react'
import { SketchPicker } from 'react-color'
import { generate, getRgbStr } from '@arco-design/color'
import { observer } from 'mobx-react'
import useLocale from '@/hooks/useLocale'
import useStores from '@/hooks/useStores'

import styles from './style/color-panel.scss?modules'

function ColorPanel() {
  const theme =
    document.querySelector('body')?.getAttribute('arco-theme') || 'light'
  const store = useStores('global')
  const { settings, updateSettings } = store

  const locale = useLocale()
  const themeColor = settings.themeColor
  const list = generate(themeColor, { list: true })

  return (
    <div>
      <Trigger
        trigger="hover"
        position="bl"
        popup={() => (
          <SketchPicker
            color={themeColor}
            onChangeComplete={(color) => {
              const newColor = color.hex
              updateSettings({ ...settings, themeColor: newColor })
              const newList = generate(newColor, {
                list: true,
                dark: theme === 'dark',
              })
              newList.forEach((l: any, index: number) => {
                const rgbStr = getRgbStr(l)
                document.body.style.setProperty(
                  `--arcoblue-${index + 1}`,
                  rgbStr
                )
              })
            }}
          />
        )}
      >
        <div className={styles.input}>
          <div
            className={styles.color}
            style={{ backgroundColor: themeColor }}
          />
          <span>{themeColor}</span>
        </div>
      </Trigger>
      <ul className={styles.ul}>
        {list.map((item: any, index: number) => (
          <li
            key={index}
            className={styles.li}
            style={{ backgroundColor: item }}
          />
        ))}
      </ul>
      <Typography.Paragraph style={{ fontSize: 12 }}>
        {locale['settings.color.tooltip']}
      </Typography.Paragraph>
    </div>
  )
}

export default observer(ColorPanel)
