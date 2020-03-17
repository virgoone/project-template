import React from 'react'
import { ReactComponentLike } from 'prop-types'
import { RouteConfig } from 'react-router-config'
import Loadable from '@/components/loadable'
import PageFailed from '@/components/page-failed'
import PageLoading from '@/components/page-loading'

function PageNotFound() {
  return <PageFailed code={404} message="ERR_NOT_FOUND" />
}

interface RouteInitOpts {
  filePath?: string
  Loading?: ReactComponentLike
}

function createRoute(path: string, options: RouteInitOpts = {}) {
  const { filePath = path, Loading = PageLoading } = options
  const Failed = PageFailed
  const onError = () => {}

  if (__DEV__) {
    console.log(`@/pages/${filePath.slice(1)}/page`)
    const component = Loadable.loadWithInitialProps(
      require(`@/pages/${filePath.slice(1)}/page`),
      { codeSplitting: false, Failed, onError, Loading },
    )

    return {
      path,
      component,
    }
  }

  const component = Loadable.loadWithInitialProps(
    () =>
      import(
        /* webpackChunkName: "[request]" */
        `@/pages/${filePath.slice(1)}/page`
      ),
    { Failed, onError, Loading },
  )

  return {
    path,
    component,
    filePath,
  }
}

let routes: RouteConfig[] = [createRoute('/playground')]

if (__DEV__) {
  routes = [
    ...routes,
    {
      path: '/',
      filePath: '/page',
      component: () =>
        React.createElement(Loadable.resolveChunk(require('@/pages/page'))),
      exact: true,
    },
  ]
}

routes = [
  ...routes,
  {
    component: PageNotFound,
  },
]

export default routes
