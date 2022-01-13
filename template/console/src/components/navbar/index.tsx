import React, { useContext } from 'react'
import {
  Tooltip,
  Avatar,
  Select,
  Dropdown,
  Menu,
  Message,
  Divider,
  Input,
} from '@arco-design/web-react'
import {
  IconSunFill,
  IconMoonFill,
  IconUser,
  IconSettings,
  IconExperiment,
  IconDashboard,
  IconInteraction,
  IconLanguage,
  IconNotification,
  IconPoweroff,
} from '@arco-design/web-react/icon'
import { observer } from 'mobx-react'
import { useNavigate } from 'react-router-dom'

import useLocale from '@/hooks/useLocale'
import useStores from '@/hooks/useStores'
import defaultLocale, { i18nType } from '@/locale'
import { GlobalContext } from '@/globals/context'

import IconButton from './icon-button'

import { ReactComponent as Logo } from '../../assets/logo.svg'
import MessageBox from '../message-box'
import styles from './style/index.scss?modules'

function Navbar() {
  const locale = useLocale()
  const navigate = useNavigate()
  const global = useStores('global')
  const userStore = useStores('user')
  const { info: userInfo = {} } = userStore
  const { setLang } = useContext(GlobalContext)

  const { theme, changeTheme } = global

  function logout() {
    userStore.doLogout()
    navigate('/ids/login')
  }

  function onMenuItemClick(key: string) {
    if (key === 'logout') {
      logout()
    } else {
      Message.info(`You clicked ${key}`)
    }
  }
  console.log('navbar locale', locale)

  const droplist = (
    <Menu onClickMenuItem={onMenuItemClick}>
      <Menu.Item key="user info">
        <IconUser className={styles['dropdown-icon']} />
        {locale['menu.user.info']}
      </Menu.Item>
      <Menu.Item key="setting">
        <IconSettings className={styles['dropdown-icon']} />
        {locale['menu.user.setting']}
      </Menu.Item>
      <Menu.SubMenu
        key="more"
        title={
          <div style={{ width: 80 }}>
            <IconExperiment className={styles['dropdown-icon']} />
            {locale['message.seeMore']}
          </div>
        }
      >
        <Menu.Item key="workplace">
          <IconDashboard className={styles['dropdown-icon']} />
          {locale['menu.dashboard.workplace']}
        </Menu.Item>
        <Menu.Item key="card list">
          <IconInteraction className={styles['dropdown-icon']} />
          {locale['menu.list.cardList']}
        </Menu.Item>
      </Menu.SubMenu>
      <Divider style={{ margin: '4px 0' }} />
      <Menu.Item key="logout">
        <IconPoweroff className={styles['dropdown-icon']} />
        {locale['navbar.logout']}
      </Menu.Item>
    </Menu>
  )

  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Logo />
          <div className={styles['logo-name']}>Arco Pro</div>
        </div>
      </div>
      <ul className={styles.right}>
        <li>
          <Input.Search className={styles.round} placeholder="Please search" />
        </li>
        <li>
          <Select
            triggerElement={<IconButton icon={<IconLanguage />} />}
            options={[
              { label: '中文', value: 'zh-CN' },
              { label: 'English', value: 'en-US' },
            ]}
            value={localStorage.getItem('arco-lang') || 'zh-CN'}
            triggerProps={{
              autoAlignPopupWidth: false,
              autoAlignPopupMinWidth: true,
              position: 'br',
            }}
            trigger="hover"
            onChange={(value: i18nType) => {
              localStorage.setItem('arco-lang', value)
              setLang?.(value)
              const nextLang = defaultLocale[value]
              Message.info(`${nextLang['message.lang.tips']}${value}`)
            }}
          />
        </li>
        <li>
          <MessageBox>
            <IconButton icon={<IconNotification />} />
          </MessageBox>
        </li>
        <li>
          <Tooltip
            content={
              theme === 'light'
                ? locale['settings.navbar.theme.toDark']
                : locale['settings.navbar.theme.toLight']
            }
          >
            <IconButton
              icon={theme === 'light' ? <IconMoonFill /> : <IconSunFill />}
              onClick={() => changeTheme(theme === 'light' ? 'dark' : 'light')}
            />
          </Tooltip>
        </li>
        {userInfo && (
          <li>
            <Dropdown droplist={droplist} position="br">
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

export default observer(Navbar)
