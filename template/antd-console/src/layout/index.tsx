import React, { useState, useRef, useMemo, useEffect } from 'react'
import { Breadcrumb, Layout, Menu, type MenuProps } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
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

const Sider = Layout.Sider
const Content = Layout.Content
type MenuItem = Required<MenuProps>['items'][number]
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
  const [openKeys, setOpenKeys] = useState(paths.slice(0, paths.length - 1))
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
  const rootSubmenuKeys = routes.map((item) => item.key)
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }
  function renderRoutes(locale: Record<string, any>) {
    const nodes: any[] = []
    function travel(
      _routes: RouteConfig[],
      level: number,
      parentNode: any[] = []
    ): any {
      return _routes.map((route) => {
        const { breadcrumb = true } = route

        const iconDom = route.icon || <div className={styles['icon-empty']} />
        const icon = route.icon || <div className={styles['icon-empty']} />
        const label = locale[route.name] || route.name
        const key = route.key
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
            return {
              key,
              label,
              icon,
            }
          }
          nodes.push({
            key,
            label: <Link to={`/${route.key}`}>{label}</Link>,
            icon,
          })
        }
        if (Array.isArray(route.children) && route.children.length) {
          const parentNode: any[] = []
          if (iconDom.props.isIcon) {
            parentNode.push(iconDom)
          }

          if (level > 1) {
            return {
              key,
              label,
              icon,
              children: travel(route.children, level + 1, [
                ...parentNode,
                route.name,
              ]),
            }
          }
          nodes.push({
            key,
            label,
            icon,
            children: travel(route.children, level + 1, [
              ...parentNode,
              route.name,
            ]),
            // type: 'group',
          })
        }
      })
    }
    travel(routes, 1)
    return nodes
  }

  const onClickMenuItem: MenuProps['onClick'] = ({ key }) => {
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
                // inlineCollapsed={collapsed}
                mode="inline"
                onClick={onClickMenuItem}
                selectedKeys={selectedKeys}
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                items={renderRoutes(locale)}
              >
                {/* {renderRoutes(locale)} */}
              </Menu>
            </div>
            <div className={styles['collapse-btn']} onClick={toggleCollapse}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
          </Sider>
        )}
        <Layout className={styles['layout-content']} style={paddingStyle}>
          <div className={styles['layout-content-wrapper']}>
            {!!breadcrumb.length && (
              <div className={styles['layout-breadcrumb']}>
                <Breadcrumb
                  items={breadcrumb.map((node, index) => ({
                    title:
                      typeof node === 'string' ? locale[node] || node : node,
                    key: `${node}-${index}`,
                  }))}
                >
                  {/* {breadcrumb.map((node, index) => (
                    <Breadcrumb.Item key={index}>
                      {typeof node === 'string' ? locale[node] || node : node}
                    </Breadcrumb.Item>
                  ))} */}
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
