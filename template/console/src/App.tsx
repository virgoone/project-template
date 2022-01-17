import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { ConfigProvider } from '@arco-design/web-react'
import zhCN from '@arco-design/web-react/es/locale/zh-CN'
import enUS from '@arco-design/web-react/es/locale/en-US'
import { GlobalContext } from '@/globals/context'
import store from '@/store'
import PageLayout from './layout'
import Login from './pages/login'
import Setting from './components/settings'

function App() {
  const defaultLang = localStorage.getItem('arco-lang') || 'zh-CN'
  const [lang, setLang] = useState(defaultLang)

  const { user } = store

  function getArcoLocale() {
    switch (lang) {
      case 'zh-CN':
        return zhCN
      case 'en-US':
        return enUS
      default:
        return zhCN
    }
  }

  useEffect(() => {
    localStorage.setItem('arco-lang', lang)
  }, [lang])

  useEffect(() => {
    const isLogin = localStorage.getItem('@token')

    if (isLogin) {
      user.getUserInfo()
      user.isLogin = true
    } else if (window.location.pathname !== '/user/login') {
      window.location.href = '/user/login'
    }
  }, [])

  const contextValue = {
    user,
    lang,
    setLang,
  }

  return (
    <BrowserRouter basename="/">
      <ConfigProvider
        locale={getArcoLocale()}
        componentConfig={{
          Card: {
            bordered: false,
          },
          List: {
            bordered: false,
          },
          Table: {
            border: false,
          },
        }}
      >
        <Provider {...store}>
          <GlobalContext.Provider value={contextValue}>
            <Routes>
              <Route path="/user/login" element={<Login />} />
              <Route path="*" element={<PageLayout />} />
            </Routes>
            <Setting />
          </GlobalContext.Provider>
        </Provider>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App
