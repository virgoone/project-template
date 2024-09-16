import { GlobalContext } from '@/globals/context'
import useLocale from '@/hooks/useLocale'
import defaultLocale from '@/locale'
import { useModel } from '@/store'
import {
  BellOutlined,
  DashboardOutlined,
  ExperimentOutlined,
  InteractionOutlined,
  PoweroffOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'

import { Avatar, Dropdown, Input, message, Select, Tooltip } from 'antd'
import React, { useContext } from 'react'

import { useNavigate } from 'react-router-dom'
import type { i18nType } from '@/locale'
import type { MenuProps } from 'antd'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import MessageBox from '../message-box'
import IconButton from './icon-button'
import styles from './style/index.less?modules'

function Navbar() {
  const locale = useLocale()
  const navigate = useNavigate()
  const store = useModel((state) => state)
  const { info: userInfo = {}, theme } = store
  const { setLang } = useContext(GlobalContext)

  function logout() {
    // dispatch(logout())
    navigate('/user/login')
  }

  const onMenuItemClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      logout()
    } else {
      message.info(`You clicked ${key}`)
    }
  }

  const droplist: MenuProps['items'] = [
    {
      key: 'user info',
      label: locale['menu.user.info'],
      icon: <UserOutlined className={styles['dropdown-icon']} />,
    },
    {
      key: 'setting',
      label: locale['menu.user.setting'],
      icon: <SettingOutlined className={styles['dropdown-icon']} />,
    },
    {
      key: 'more',
      label: locale['message.seeMore'],
      icon: <ExperimentOutlined className={styles['dropdown-icon']} />,
      children: [
        {
          key: 'workplace',
          label: locale['menu.dashboard.workplace'],
          icon: <DashboardOutlined className={styles['dropdown-icon']} />,
        },
        {
          key: 'card list',
          icon: <InteractionOutlined className={styles['dropdown-icon']} />,
          label: locale['menu.list.cardList'],
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <PoweroffOutlined className={styles['dropdown-icon']} />,
      label: locale['navbar.logout'],
    },
  ]

  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Logo width={80} />
          <div className={styles['logo-name']}>YY</div>
        </div>
      </div>
      <ul className={styles.right}>
        <li>
          <Input.Search
            className={styles.round}
            placeholder={locale['navbar.search.placeholder']}
          />
        </li>
        <li>
          <Select
            bordered={false}
            // suffixIcon={<IconButton icon={<IconLanguage />} />}
            options={[
              { label: '中文', value: 'zh-CN' },
              { label: 'English', value: 'en-US' },
            ]}
            value={localStorage.getItem('antd-lang') || 'zh-CN'}
            placement="bottomRight"
            onChange={(value: i18nType) => {
              localStorage.setItem('antd-lang', value)
              setLang?.(value)
              const nextLang = defaultLocale[value]
              message.info(`${nextLang['message.lang.tips']}${value}`)
            }}
          />
        </li>
        <li>
          <MessageBox>
            <IconButton icon={<BellOutlined />} />
          </MessageBox>
        </li>
        <li>
          <Tooltip
            title={
              theme === 'light'
                ? locale['settings.navbar.theme.toDark']
                : locale['settings.navbar.theme.toLight']
            }
          >
            <IconButton
              icon={
                theme === 'light' ? (
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )
              }
              onClick={() => {
                store.changeTheme(theme === 'light' ? 'dark' : 'light')
                message.info('主题切换成功，将在刷新页面后生效')
              }}
            />
          </Tooltip>
        </li>
        {userInfo && (
          <li>
            <Dropdown
              menu={{
                items: droplist,
                onClick: onMenuItemClick,
              }}
              placement="bottomRight"
            >
              <Avatar size={32} style={{ cursor: 'pointer' }}>
                <img alt="avatar" src={userInfo.avatar} />
              </Avatar>
            </Dropdown>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Navbar
