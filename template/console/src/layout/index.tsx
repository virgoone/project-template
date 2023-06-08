import React, { useState, useRef, useMemo, useEffect } from 'react'
import { Breadcrumb, Layout, Menu } from '@arco-design/web-react'
import { IconMenuFold, IconMenuUnfold } from '@arco-design/web-react/icon'
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { observer } from 'mobx-react'
import qs from 'query-string'
import NProgress from 'nprogress'

import useStores from '@/hooks/useStores'
import Welcome from '@/pages/welcome'

import { routes, defaultRoute, RouteConfig } from '../routes'
import useLocale from '../hooks/useLocale'
import { getUrlParams } from '../utils/url'

import Navbar from '../components/navbar'
import Footer from '../components/footer'

import lazyload from '../components/lazyload'

import styles from './style.less?modules'

const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

const Sider = Layout.Sider
const Content = Layout.Content

function getFlattenRoutes() {
  const res: RouteConfig[] = []
  function travel(_routes: RouteConfig[]) {
    _routes.forEach((route) => {
      if (route.componentPath && !route.children) {
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

function PageLayout() {
  const urlParams = getUrlParams()
  const location = useLocation()
  const navigate = useNavigate()
  const currentComponent = qs.parseUrl(location.pathname).url.slice(1)
  const defaultSelectedKeys = [currentComponent || defaultRoute]

  const paths = (currentComponent || defaultRoute).split('/')
  const defaultOpenKeys = paths.slice(0, paths.length - 1)

  const locale = useLocale()
  const store = useStores('global')
  const { settings } = store

  const [breadcrumb, setBreadCrumb] = useState<string[] | React.ReactNode[]>([])
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [selectedKeys, setSelectedKeys] =
    useState<string[]>(defaultSelectedKeys)
  const routeMap = useRef<Map<string, React.ReactNode[]>>(new Map())

  const navbarHeight = 60
  const menuWidth = collapsed ? 48 : settings.menuWidth

  const showNavbar = settings.navbar && urlParams.navbar !== false
  const showMenu = settings.menu && urlParams.menu !== false
  const showFooter = settings.footer && urlParams.footer !== false

  const flattenRoutes = useMemo(() => getFlattenRoutes() || [], [])

  function renderRoutes(locale: Record<string, any>) {
    const nodes: any[] = []
    function travel(
      _routes: RouteConfig[],
      level: number,
      parentNode: any[] = []
    ) {
      return _routes.map((route) => {
        const { breadcrumb = true } = route

        const iconDom = route.icon || <div className={styles['icon-empty']} />
        const titleDom = (
          <>
            {iconDom} {locale[route.name] || route.name}
          </>
        )
        if (
          route.component &&
          (!Array.isArray(route.children) ||
            (Array.isArray(route.children) && !route.children.length))
        ) {
          routeMap.current.set(
            `/${route.key}`,
            breadcrumb ? [...parentNode, route.name] : []
          )
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
          const parentNode: any[] = []
          if (iconDom.props.isIcon) {
            parentNode.push(iconDom)
          }

          if (level > 1) {
            return (
              <SubMenu key={route.key} title={titleDom}>
                {travel(route.children, level + 1, [...parentNode, route.name])}
              </SubMenu>
            )
          }
          nodes.push(
            <SubMenu key={route.key} title={titleDom}>
              {travel(route.children, level + 1, [...parentNode, route.name])}
            </SubMenu>
          )
        }
      })
    }
    travel(routes, 1)
    return nodes
  }

  function onClickMenuItem(key: string) {
    const currentRoute = flattenRoutes.find((r) => r.key === key)
    if (!currentRoute) {
      console.error(`Route ${key} not found`)
      return
    }
    const component = currentRoute.component
    const preload = component.preload()
    NProgress.start()
    preload.then(() => {
      setSelectedKeys([key])
      navigate(currentRoute.path ? currentRoute.path : `/${key}`)
      NProgress.done()
    })
  }

  function toggleCollapse() {
    setCollapsed((collapsed) => !collapsed)
  }

  const paddingLeft = showMenu ? { paddingLeft: menuWidth } : {}
  const paddingTop = showNavbar ? { paddingTop: navbarHeight } : {}
  const paddingStyle = { ...paddingLeft, ...paddingTop }

  useEffect(() => {
    const routeConfig = routeMap.current.get(location.pathname)
    setBreadCrumb(routeConfig || [])
  }, [location.pathname])

  return (
    <Layout className={styles.layout}>
      {showNavbar && (
        <div className={styles['layout-navbar']}>
          <Navbar />
        </div>
      )}
      <Layout>
        {showMenu && (
          <Sider
            className={styles['layout-sider']}
            width={menuWidth}
            collapsed={collapsed}
            onCollapse={setCollapsed}
            trigger={null}
            collapsible
            breakpoint="xl"
            style={paddingTop}
          >
            <div className={styles['menu-wrapper']}>
              <Menu
                collapse={collapsed}
                onClickMenuItem={onClickMenuItem}
                selectedKeys={selectedKeys}
                defaultOpenKeys={defaultOpenKeys}
              >
                {renderRoutes(locale)}
              </Menu>
            </div>
            <div className={styles['collapse-btn']} onClick={toggleCollapse}>
              {collapsed ? <IconMenuUnfold /> : <IconMenuFold />}
            </div>
          </Sider>
        )}
        <Layout className={styles['layout-content']} style={paddingStyle}>
          <div className={styles['layout-content-wrapper']}>
            {!!breadcrumb.length && (
              <div className={styles['layout-breadcrumb']}>
                <Breadcrumb>
                  {breadcrumb.map((node, index) => (
                    <Breadcrumb.Item key={index}>
                      {typeof node === 'string' ? locale[node] || node : node}
                    </Breadcrumb.Item>
                  ))}
                </Breadcrumb>
              </div>
            )}
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
          </div>
          {showFooter && <Footer />}
        </Layout>
      </Layout>
    </Layout>
  )
}

export default observer(PageLayout)
