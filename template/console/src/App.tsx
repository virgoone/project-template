import React, { PureComponent, Suspense } from 'react'
import { Router, Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { observer } from 'mobx-react'
import { History } from 'history'
import { Provider } from 'mobx-react'
import ErrorPage from '@/pages/error/page'
import RotateSpinner from '@/components/spinners/rotate-spinners'
import { routeConfig } from '@/routes'
import history from '@/globals/history'

interface AppRouterProps {
  history: History
  location: {
    pathname: string
  }
}

@observer
@withRouter
class AppRouter extends PureComponent<AppRouterProps> {
  render() {
    return (
      <Switch location={this.props.location}>
        {routeConfig.map(route => (
          <Route
            exact
            key={route.key}
            path={route.path}
            component={props => (
              <Suspense fallback={<RotateSpinner loading />}>
                <route.component {...props} />
              </Suspense>
            )}
          />
        ))}
        <Route exact path="/error" component={ErrorPage} />
        <Redirect
          from="/"
          push
          to={{ pathname: '/', state: { from: location.pathname } }}
        />
      </Switch>
    )
  }
}

class App extends React.Component {
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

export default App
