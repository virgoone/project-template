
import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css'
import '@/style/index.scss'

const init = () => {
  // eslint-disable-next-line
  const App = require('./App').default

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  )
}

if (__DEV__) {
  module.hot.accept('./App', init)
}

init()
