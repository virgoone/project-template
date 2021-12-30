import React, { PureComponent, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { observer, Provider } from 'mobx-react'
import ErrorPage from '@/pages/error/page'
import { routeConfig } from '@/routes'

@observer
class AppRouter extends PureComponent<any> {
  render() {
    return (
      <Routes location={this.props.location}>
        {routeConfig.map((route) => (
          <Route
            key={route.key}
            path={route.path}
            element={
              <Suspense fallback={<div>loading...</div>}>
                <route.component />
              </Suspense>
            }
          />
        ))}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    )
  }
}

export default class App extends React.PureComponent {
  render() {
    return (
      <Provider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Provider>
    )
  }
}
