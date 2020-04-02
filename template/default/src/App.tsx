import React, { PureComponent } from 'react'
import { Router } from 'react-router-dom'
import {
  renderRoutes,
  RouteConfigComponentProps,
  RouteConfig,
} from 'react-router-config'
import history from '@/globals/history'
import routes from '@/routes'

class Root extends PureComponent<RouteConfigComponentProps> {

  render() {
    const { route } = this.props

    return renderRoutes(route && route.routes)
  }
}

const appRoutes: RouteConfig[] = [
  {
    component: Root,
    routes,
  },
]

export default class App extends PureComponent {
  render() {
    return <Router history={history}>{renderRoutes(appRoutes)}</Router>
  }
}
