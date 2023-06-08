import React from 'react'
import {
  UnorderedListOutlined ,
  CheckCircleOutlined,
  SettingOutlined,
  GiftOutlined,
  ExclamationCircleOutlined,
  DashboardOutlined,
  FileTextOutlined,
  UserOutlined,
  AppstoreOutlined
} from '@ant-design/icons'

export const defaultRoute = 'welcome'

export type RouteConfig = Record<string, any>

export const routes: RouteConfig[] = [
  {
    name: 'menu.welcome',
    key: 'welcome',
    icon: <GiftOutlined />,
    breadcrumb: false,
    componentPath: 'welcome',
  },
  {
    name: 'menu.dashboard',
    key: 'dashboard',
    icon: <DashboardOutlined />,
    children: [
      {
        name: 'menu.dashboard.workplace',
        key: 'dashboard/workplace',
        componentPath: 'dashboard/workplace',
      },
      {
        name: 'menu.dashboard.monitor',
        key: 'dashboard/monitor',
        componentPath: 'dashboard/monitor',
      },
    ],
  },
  {
    name: 'menu.visualization',
    key: 'visualization',
    icon: <AppstoreOutlined />,
    children: [
      {
        name: 'menu.visualization.dataAnalysis',
        key: 'visualization/data-analysis',
        componentPath: 'visualization/data-analysis',
      },
      {
        name: 'menu.visualization.multiDimensionDataAnalysis',
        key: 'visualization/multi-dimension-data-analysis',
        componentPath: 'visualization/multi-dimension-data-analysis',
      },
    ],
  },
  {
    name: 'menu.list',
    key: 'list',
    icon: <UnorderedListOutlined />,
    children: [
      {
        name: 'menu.list.searchTable',
        key: 'list/search-table',
        componentPath: 'list/search-table',
      },
      {
        name: 'menu.list.cardList',
        key: 'list/card',
        componentPath: 'list/card',
      },
    ],
  },
  {
    name: 'menu.form',
    key: 'form',
    icon: <SettingOutlined />,
    children: [
      {
        name: 'menu.form.group',
        key: 'form/group',
        componentPath: 'form/group',
      },
      {
        name: 'menu.form.step',
        key: 'form/step',
        componentPath: 'form/step',
      },
    ],
  },
  {
    name: 'menu.profile',
    key: 'profile',
    icon: <FileTextOutlined />,
    children: [
      {
        name: 'menu.profile.basic',
        key: 'profile/basic',
        componentPath: 'profile/basic',
      },
    ],
  },
  {
    name: 'menu.result',
    key: 'result',
    icon: <CheckCircleOutlined />,
    children: [
      {
        name: 'menu.result.success',
        key: 'result/success',
        breadcrumb: false,
        componentPath: 'result/success',
      },
      {
        name: 'menu.result.error',
        key: 'result/error',
        breadcrumb: false,
        componentPath: 'result/error',
      },
    ],
  },
  {
    name: 'menu.exception',
    key: 'exception',
    icon: <ExclamationCircleOutlined />,
    children: [
      {
        name: 'menu.exception.403',
        key: 'exception/403',
        componentPath: 'exception/403',
      },
      {
        name: 'menu.exception.404',
        key: 'exception/404',
        componentPath: 'exception/404',
      },
      {
        name: 'menu.exception.500',
        key: 'exception/500',
        componentPath: 'exception/500',
      },
    ],
  },
  {
    name: 'menu.user',
    key: 'user',
    icon: <UserOutlined />,
    children: [
      {
        name: 'menu.user.info',
        key: 'user/info',
        componentPath: 'user/info',
      },
      {
        name: 'menu.user.setting',
        key: 'user/setting',
        componentPath: 'user/setting',
      },
    ],
  },
]
