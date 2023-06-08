import { lazy } from 'react'
import { map } from 'lodash'

export interface RouteConf {
  key: string
  path: string
  component: string | any
  name?: string
}

const routerConfig: RouteConf[] = [
  {
    key: 'Home',
    path: '/',
    component: 'home',
  },
]

export function generateRoute(routes: RouteConf[]): RouteConf[] {
  return map(routes, (val: RouteConf) => ({
    ...val,
    component: lazy(() => import(`@/pages/${val.component}/page.tsx`)),
  }))
}

const routeConfig = generateRoute(routerConfig)
export default routeConfig

export { routeConfig }
