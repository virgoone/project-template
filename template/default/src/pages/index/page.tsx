import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { RouteConfig } from 'react-router-config'
import routes from '@/routes'

import './style.less'

function flatRoutes(routes: RouteConfig[]) {
  let flatten: RouteConfig[] = []

  routes.forEach(route => {
    if (route.path && route.path !== '/') {
      if (route.routes) {
        flatten = [...flatten, ...flatRoutes(route.routes)]
      } else {
        flatten = [...flatten, route]
      }
    }
  })

  return flatten
}

const flattenRoutes = flatRoutes(routes)

export default class IndexPage extends PureComponent {
  render() {
    return (
      <div className="index-page">
        <div>
          {flattenRoutes.map(({ path, url, title }) => (
            <Link key={path} to={url || path}>
              {title || path}
            </Link>
          ))}
        </div>
      </div>
    )
  }
}
