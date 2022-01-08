import React from 'react'
import { Link, Card, Divider, Message } from '@arco-design/web-react'
import {
  IconFile,
  IconStorage,
  IconSettings,
  IconMobile,
  IconFire,
} from '@arco-design/web-react/icon'
import useLocale from './locale/useLocale'
import styles from './style/shortcuts.scss?modules'

function Shortcuts() {
  const locale = useLocale()

  const shortcuts = [
    {
      title: locale['workplace.contentMgmt'],
      key: 'Content Management',
      icon: <IconFile />,
    },
    {
      title: locale['workplace.contentStatistic'],
      key: 'Content Statistic',
      icon: <IconStorage />,
    },
    {
      title: locale['workplace.advancedMgmt'],
      key: 'Advanced Management',
      icon: <IconSettings />,
    },
    {
      title: locale['workplace.onlinePromotion'],
      key: 'Online Promotion',
      icon: <IconMobile />,
    },
    {
      title: locale['workplace.marketing'],
      key: 'Marketing',
      icon: <IconFire />,
    },
  ]

  const recentShortcuts = [
    {
      title: locale['workplace.contentStatistic'],
      key: 'Content Statistic',
      icon: <IconStorage />,
    },
    {
      title: locale['workplace.contentMgmt'],
      key: 'Content Management',
      icon: <IconFile />,
    },
    {
      title: locale['workplace.advancedMgmt'],
      key: 'Advanced Management',
      icon: <IconSettings />,
    },
  ]

  function onClickShortcut(key: string) {
    Message.info({
      content: (
        <span>
          You clicked <b>{key}</b>
        </span>
      ),
    })
  }

  return (
    <Card
      title={locale['workplace.shortcuts']}
      headerStyle={{ borderBottom: 0 }}
      extra={<Link>{locale['workplace.manage']}</Link>}
    >
      <div className={styles.shortcuts}>
        {shortcuts.map((shortcut) => (
          <div
            className={styles.item}
            key={shortcut.key}
            onClick={() => onClickShortcut(shortcut.key)}
          >
            <div className={styles.icon}>{shortcut.icon}</div>
            <div className={styles.title}>{shortcut.title}</div>
          </div>
        ))}
      </div>
      <Divider />
      <div className={styles.recent}>{locale['workplace.recent']}</div>
      <div className={styles.shortcuts}>
        {recentShortcuts.map((shortcut) => (
          <div
            className={styles.item}
            key={shortcut.key}
            onClick={() => onClickShortcut(shortcut.key)}
          >
            <div className={styles.icon}>{shortcut.icon}</div>
            <div className={styles.title}>{shortcut.title}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default Shortcuts
