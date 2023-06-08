import React from 'react'
import Loadable from '@/components/loadable'
import PageFailed from '@/components/page-failed'
import PageLoading from '@/components/page-loading'
import { AjaxError } from '@/components/loadable/Loadable'

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
  Loading?: any
}

function createRoute(path: string, options: RouteInitOpts = {}) {
  const { filePath = path, Loading = PageLoading } = options
  const Failed = PageFailed
  const onError = (err: AjaxError) => {
    console.error(err)
  }

  if (__DEV__) {
    console.log(`@/pages/${filePath.slice(1)}/page`)
    const component = Loadable.loadWithInitialProps(
      require(`@/pages/${filePath.slice(1)}/page`),
      { codeSplitting: false, Failed, onError, Loading }
    )

    return {
      path,
      component,
      key: path
    }
  }

  const component = Loadable.loadWithInitialProps(
    () =>
      import(
        /* webpackChunkName: "[request]" */
        `@/pages/${filePath.slice(1)}/page`
      ),
    { Failed, onError, Loading }
  )

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
      component: () =>
        React.createElement(
          Loadable.resolveChunk(require('@/pages/playground/page'))
        )
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
