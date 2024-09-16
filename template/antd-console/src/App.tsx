import { IconPrefix, Prefix } from '@/constants/config'
import { GlobalContext } from '@/globals/context'
import { useModel } from '@/store'
import { theme as antdTheme, ConfigProvider } from 'antd'
import enUS from 'antd/locale/en_US'
import zhCN from 'antd/locale/zh_CN'

import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PageLayout from './layout'
import Login from './pages/login'
import { QueryProvider } from './query-provider'

function App() {
  const defaultLang = localStorage.getItem('antd-lang') || 'zh-CN'
  const [lang, setLang] = useState(defaultLang)
  const store = useModel((state) => state)
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
    if (!!localStorage.getItem('@@token')) {
      store.init()
    } else if (window.location.pathname !== '/user/login') {
      window.location.href = '/user/login'
    }
  }, [])

  const contextValue = {
    user: store.info,
    lang,
    setLang,
  }

  return (
    <QueryProvider>
      <ConfigProvider
        locale={getLocale()}
        prefixCls={Prefix}
        iconPrefixCls={IconPrefix}
        theme={{
          algorithm:
            store.theme === 'light'
              ? antdTheme.defaultAlgorithm
              : antdTheme.darkAlgorithm,
        }}
      >
        <GlobalContext.Provider value={contextValue}>
          <BrowserRouter basename="/">
            <Routes>
              <Route path="/user/login" element={<Login />} />
              <Route path="*" element={<PageLayout />} />
            </Routes>
          </BrowserRouter>
        </GlobalContext.Provider>
      </ConfigProvider>
    </QueryProvider>
  )
}

export default App
