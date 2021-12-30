import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'normalize.css'
import '@/style/index.scss'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
if (__DEV__) {
  // module.hot.accept('./App', init)
}
