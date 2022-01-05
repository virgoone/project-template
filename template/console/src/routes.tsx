import React from 'react'
import { IconGift } from '@arco-design/web-react/icon'

export const defaultRoute = 'index'

export type RouteConfig = Record<string, any>

export const routes: RouteConfig[] = [
  {
    name: 'menu.welcome',
    key: 'index',
    icon: <IconGift />,
    componentPath: 'index',
  },
]
