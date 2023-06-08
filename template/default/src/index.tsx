
import React from 'react'
import { createRoot } from 'react-dom/client'
import 'normalize.css'
import '@/style/index.less'
import App from './App'


const container = document.getElementById('root')
const root = createRoot(container as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
window.__APP_LOADED__ = true
