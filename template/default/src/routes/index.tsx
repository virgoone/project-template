import React from 'react'
import Loadable, { LoadingComponentProps } from 'react-loadable'
import PageFailed from '@/components/page-failed'
import PageLoading from '@/components/page-loading'

export interface RouteConf {
  key?: string
  path: string
  component: string | any
  name?: string
}

function PageNotFound() {
  return <PageFailed code={404} message="ERR_NOT_FOUND" />
}

interface RouteInitOpts {
  filePath?: string
  Loading?: () => JSX.Element
}

function RouteLoading(
  props: LoadingComponentProps,
  PageLoading: () => JSX.Element
) {
  if (props.error) {
    return <PageFailed code={400} message={props.error} />
  } else if (props.timedOut) {
    return <PageFailed code={400} message="加载时间过长..." />
  } else if (props.pastDelay) {
    return <PageLoading />
  } else {
    return null
  }
}

function createRoute(path: string, options: RouteInitOpts = {}) {
  const { filePath = path, Loading = PageLoading } = options

  if (__DEV__) {
    console.log(`@/pages/${filePath.slice(1)}/page`)
  }

  const component = Loadable({
    loader: () => import(`@/pages/${filePath.slice(1)}/page`),
    loading: (props) => RouteLoading(props, Loading),
    timeout: 10000 // 10s
  })

  return {
    path,
    component,
    filePath
  }
}

let routes: RouteConf[] = [
  createRoute('/', {
    filePath: '/index'
  })
]

if (__DEV__) {
  routes = [
    ...routes,
    {
      path: '/playground',
      component: () => import('@/pages/playground/page')
    }
  ]
}

routes = [
  ...routes,
  {
    path: '*',
    component: PageNotFound
  }
]

export default routes
