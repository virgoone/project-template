import React from 'react'
import {
  Tooltip,
  Button,
  Avatar,
  Select,
  Typography,
  Dropdown,
  Menu,
  Space,
} from '@arco-design/web-react'
import { IconSunFill, IconMoonFill } from '@arco-design/web-react/icon'
import { observer } from 'mobx-react'
import { useNavigate } from 'react-router-dom'

import useLocale from '@/hooks/useLocale'
import useStores from '@/hooks/useStores'

import { ReactComponent as Logo } from '../../assets/logo.svg'
import styles from './style.scss?modules'

function Navbar() {
  const locale = useLocale()
  const navigate = useNavigate()
  const global = useStores('global')
  const user = useStores('user')
  const { theme, changeTheme } = global

  function logout() {
    user.doLogout()
    navigate('/ids/login')
  }

  function onMenuItemClick(key: string) {
    if (key === 'logout') {
      logout()
    }
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <Space size={8}>
          <Logo />
          <Typography.Title style={{ margin: 0, fontSize: 18 }} heading={5}>
            Arco Design Pro
          </Typography.Title>
        </Space>
      </div>
      <ul className={styles.right}>
        {/* <li>
          <MessageBox />
        </li> */}
        <li>
          <a>{locale['navbar.docs']}</a>
        </li>
        <li>
          <Select
            options={[
              { label: '中文', value: 'zh-CN' },
              { label: 'English', value: 'en-US' },
            ]}
            value={localStorage.getItem('arco-lang') || 'zh-CN'}
            bordered={false}
            triggerProps={{
              autoAlignPopupWidth: false,
              autoAlignPopupMinWidth: true,
              position: 'bl',
            }}
            onChange={(value) => {
              localStorage.setItem('arco-lang', value)
              window.location.reload()
            }}
          />
        </li>
        <li>
          <Tooltip
            content={
              theme === 'light'
                ? locale['settings.navbar.theme.toDark']
                : locale['settings.navbar.theme.toLight']
            }
          >
            <Button
              type="text"
              icon={theme === 'light' ? <IconMoonFill /> : <IconSunFill />}
              onClick={() => changeTheme(theme === 'light' ? 'dark' : 'light')}
              style={{ fontSize: 20 }}
            />
          </Tooltip>
        </li>
        {user?.avatar && (
          <li>
            <Avatar size={24} style={{ marginRight: 8 }}>
              <img alt="avatar" src={user.avatar} />
            </Avatar>
            <Dropdown
              trigger="click"
              droplist={
                <Menu onClickMenuItem={onMenuItemClick}>
                  <Menu.Item key="logout">登出</Menu.Item>
                </Menu>
              }
            >
              <Typography.Text className={styles.username}>
                {user.name}
              </Typography.Text>
            </Dropdown>
          </li>
        )}
      </ul>
    </div>
  )
}

export default observer(Navbar)
