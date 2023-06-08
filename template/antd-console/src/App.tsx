import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { ConfigProvider, theme as antdTheme } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import enUS from 'antd/locale/en_US'

import { GlobalContext } from '@/globals/context'
import store from '@/store'
import PageLayout from './layout'
import Login from './pages/login'

function App() {
  const defaultLang = localStorage.getItem('antd-lang') || 'zh-CN'
  const [lang, setLang] = useState(defaultLang)

  const { user, global } = store

  function getLocale() {
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
    localStorage.setItem('antd-lang', lang)
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
        locale={getLocale()}
        theme={{
          algorithm:
            global.theme === 'light'
              ? antdTheme.defaultAlgorithm
              : antdTheme.darkAlgorithm,
        }}
      >
        <Provider {...store}>
          <GlobalContext.Provider value={contextValue}>
            <Routes>
              <Route path="/user/login" element={<Login />} />
              <Route path="*" element={<PageLayout />} />
            </Routes>
          </GlobalContext.Provider>
        </Provider>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App
