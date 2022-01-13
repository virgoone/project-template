import React from 'react'
import {
  IconGift,
  IconDashboard,
  IconExclamationCircle,
  IconSettings,
  IconList,
  IconCheckCircle,
  // IconApps,
} from '@arco-design/web-react/icon'

export const defaultRoute = 'welcome'

export type RouteConfig = Record<string, any>

export const routes: RouteConfig[] = [
  {
    name: 'menu.welcome',
    key: 'welcome',
    icon: <IconGift />,
    breadcrumb: false,
    componentPath: 'welcome',
  },
  {
    name: 'menu.dashboard',
    key: 'dashboard',
    icon: <IconDashboard />,
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
    name: 'menu.list',
    key: 'list',
    icon: <IconList />,
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
    icon: <IconSettings />,
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
    name: 'menu.result',
    key: 'result',
    icon: <IconCheckCircle />,
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
    icon: <IconExclamationCircle />,
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
]
