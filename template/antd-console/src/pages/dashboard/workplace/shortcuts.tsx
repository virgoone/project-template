import React from 'react'
import { Card, Divider, message } from 'antd'
import {
  FileTextOutlined,
  SettingOutlined,
  MobileOutlined,
  FireOutlined,
} from '@ant-design/icons'
import Link from '@/components/link'
import useLocale from './locale/useLocale'
import styles from './style/shortcuts.less?modules'

const IconStorage = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
    />
  </svg>
)

function Shortcuts() {
  const locale = useLocale()

  const shortcuts = [
    {
      title: locale['workplace.contentMgmt'],
      key: 'Content Management',
      icon: <FileTextOutlined />,
    },
    {
      title: locale['workplace.contentStatistic'],
      key: 'Content Statistic',
      icon: <IconStorage />,
    },
    {
      title: locale['workplace.advancedMgmt'],
      key: 'Advanced Management',
      icon: <SettingOutlined />,
    },
    {
      title: locale['workplace.onlinePromotion'],
      key: 'Online Promotion',
      icon: <MobileOutlined />,
    },
    {
      title: locale['workplace.marketing'],
      key: 'Marketing',
      icon: <FireOutlined />,
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
      icon: <FileTextOutlined />,
    },
    {
      title: locale['workplace.advancedMgmt'],
      key: 'Advanced Management',
      icon: <SettingOutlined />,
    },
  ]

  function onClickShortcut(key: string) {
    message.info({
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
      headStyle={{ borderBottom: 0 }}
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
