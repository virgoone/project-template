/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */

import React, { PureComponent, Suspense } from 'react'
import { Router, Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { observer, Provider } from 'mobx-react'
import ErrorPage from '@/pages/error/page'
import { routeConfig } from '@/routes'
import history from '@/globals/history'

@observer
// @ts-ignore
@withRouter
class AppRouter extends PureComponent<any> {
  render() {
    return (
      <Switch location={this.props.location}>
        {routeConfig.map((route) => (
          <Route
            exact
            key={route.key}
            path={route.path}
            component={(props: any) => (
              <Suspense fallback={<div>loading...</div>}>
                <route.component {...props} />
              </Suspense>
            )}
          />
        ))}
        <Route exact path="/error" component={ErrorPage} />
        <Redirect
          from="/"
          push
          to={{ pathname: '/', state: { from: window.location.pathname } }}
        />
      </Switch>
    )
  }
}

export default class App extends React.PureComponent {
  render() {
    return (
      <Provider>
        <Router history={history}>
          <AppRouter />
        </Router>
      </Provider>
    )
  }
}
