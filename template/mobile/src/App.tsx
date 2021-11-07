import React, { PureComponent } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import routeConfig from '@/routes'

export default class App extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          {routeConfig.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
      </BrowserRouter>
    )
  }
}
