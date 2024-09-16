import '@/style/tailwind.css'
import { RootProvider } from '@/store'
import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import './mock'
import 'normalize.css'
import '@/style/index.less'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <RootProvider>
      <App />
    </RootProvider>
  </React.StrictMode>
)

