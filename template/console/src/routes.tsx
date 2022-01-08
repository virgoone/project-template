import React from 'react'
import {
  IconGift,
  IconDashboard,
  IconExclamationCircle,
} from '@arco-design/web-react/icon'

export const defaultRoute = 'welcome'

export type RouteConfig = Record<string, any>

export const routes: RouteConfig[] = [
  {
    name: 'menu.welcome',
    key: 'welcome',
    icon: <IconGift />,
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
