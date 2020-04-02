import '@/style/index.less'

import React from 'react'
import ReactDOM from 'react-dom'

window.__APP_LOADED__ = true

const init = () => {
  const App = require('./App').default

  ReactDOM.render(<App />, document.getElementById('App'))
}

if (__DEV__) {
  module.hot.accept('./App', init)
}

init()
