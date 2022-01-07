import React, { useState, useRef, useMemo } from 'react'
import { Layout, Menu } from '@arco-design/web-react'
import { IconMenuFold, IconMenuUnfold } from '@arco-design/web-react/icon'
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { observer } from 'mobx-react'
import qs from 'query-string'
import useStores from '@/hooks/useStores'

import { routes, defaultRoute, RouteConfig } from '../routes'
import useLocale from '../hooks/useLocale'
import { getUrlParams } from '../utils/url'

import Navbar from '../components/navbar'
import Footer from '../components/footer'
import LoadingBar, { LoadingBarHandle } from '../components/loading-bar'
import lazyload from '../components/lazyload'
import Welcome from '../pages/welcome'

import styles from './style.scss?modules'

const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

const Sider = Layout.Sider
const Content = Layout.Content

function getFlattenRoutes() {
  const res: RouteConfig[] = []
  function travel(_routes: RouteConfig[]) {
    _routes.forEach((route) => {
      if (route.componentPath) {
        route.component = lazyload(
          () => import(`../pages/${route.componentPath}`)
        )
        res.push(route)
      } else if (Array.isArray(route.children) && route.children.length) {
        travel(route.children)
      }
    })
  }
  travel(routes)
  return res
}

function renderRoutes(locale: Record<string, string>) {
  const nodes: any[] = []
  function travel(_routes: RouteConfig[], level: number) {
    return _routes.map((route) => {
      const titleDom = (
        <>
          {route.icon} {locale[route.name] || route.name}
        </>
      )
      if (
        route.component &&
        (!Array.isArray(route.children) ||
          (Array.isArray(route.children) && !route.children.length))
      ) {
        if (level > 1) {
          return <MenuItem key={route.key}>{titleDom}</MenuItem>
        }
        nodes.push(
          <MenuItem key={route.key}>
            <Link to={`/${route.key}`}>{titleDom}</Link>
          </MenuItem>
        )
      }
      if (Array.isArray(route.children) && route.children.length) {
        if (level > 1) {
          return (
            <SubMenu key={route.key} title={titleDom}>
              {travel(route.children, level + 1)}
            </SubMenu>
          )
        }
        nodes.push(
          <SubMenu key={route.key} title={titleDom}>
            {travel(route.children, level + 1)}
          </SubMenu>
        )
      }
    })
  }
  travel(routes, 1)
  return nodes
}

function PageLayout() {
  const urlParams = getUrlParams()
  const location = useLocation()
  const navigate = useNavigate()
  const currentComponent = qs.parseUrl(location.pathname).url.slice(1)
  const defaultSelectedKeys = [currentComponent || defaultRoute]
  const locale = useLocale()
  const store = useStores('global')
  const { settings } = store

  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [selectedKeys, setSelectedKeys] =
    useState<string[]>(defaultSelectedKeys)
  const loadingBarRef = useRef<LoadingBarHandle>(null)

  const navbarHeight = 60
  const menuWidth = collapsed ? 48 : settings.menuWidth

  const showNavbar = settings.navbar && urlParams.navbar !== false
  const showMenu = settings.menu && urlParams.menu !== false
  const showFooter = settings.footer && urlParams.footer !== false

  const flattenRoutes = useMemo(() => getFlattenRoutes() || [], [])
  function onClickMenuItem(key: string) {
    const currentRoute = flattenRoutes.find((r) => r.key === key)
    if (!currentRoute) {
      console.error(`Route ${key} not found`)
      return
    }
    const component = currentRoute.component
    const preload = component.preload()
    loadingBarRef.current?.loading?.()
    preload.then(() => {
      setSelectedKeys([key])
      navigate(currentRoute.path ? currentRoute.path : `/${key}`)
      loadingBarRef.current?.success?.()
    })
  }

  function toggleCollapse() {
    setCollapsed((collapsed) => !collapsed)
  }

  const paddingLeft = showMenu ? { paddingLeft: menuWidth } : {}
  const paddingTop = showNavbar ? { paddingTop: navbarHeight } : {}
  const paddingStyle = { ...paddingLeft, ...paddingTop }

  return (
    <Layout className={styles.layout}>
      <LoadingBar ref={loadingBarRef} />
      {showNavbar && (
        <div className={styles.layoutNavbar}>
          <Navbar />
        </div>
      )}
      <Layout>
        {showMenu && (
          <Sider
            className={styles.layoutSider}
            width={menuWidth}
            collapsed={collapsed}
            onCollapse={setCollapsed}
            trigger={null}
            collapsible
            breakpoint="xl"
            style={paddingTop}
          >
            <div className={styles.menuWrapper}>
              <Menu
                collapse={collapsed}
                onClickMenuItem={onClickMenuItem}
                selectedKeys={selectedKeys}
                autoOpen
              >
                {renderRoutes(locale)}
              </Menu>
            </div>
            <div className={styles.collapseBtn} onClick={toggleCollapse}>
              {collapsed ? <IconMenuUnfold /> : <IconMenuFold />}
            </div>
          </Sider>
        )}
        <Layout className={styles.layoutContent} style={paddingStyle}>
          <Content>
            <Routes>
              {flattenRoutes.map((route, index) => {
                return (
                  <Route
                    key={index}
                    path={`/${route.key}`}
                    element={<route.component />}
                  />
                )
              })}
              <Route path="*" element={<Welcome />} />
            </Routes>
          </Content>
          {showFooter && <Footer />}
        </Layout>
      </Layout>
    </Layout>
  )
}

export default observer(PageLayout)
