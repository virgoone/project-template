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
import Auth from './components/auth'

function App() {
  const localeName = localStorage.getItem('arco-lang') || 'zh-CN'

  if (!localStorage.getItem('arco-lang')) {
    localStorage.setItem('arco-lang', localeName)
  }
  const [locale, setLocale] = useState()
  const { user } = store

  function getArcoLocale() {
    switch (localeName) {
      case 'zh-CN':
        return zhCN
      case 'en-US':
        return enUS
      default:
        return zhCN
    }
  }

  async function fetchLocale(ln?: string) {
    const locale = (await import(`./locales/${ln || localeName}`)).default
    setLocale(locale)
  }

  useEffect(() => {
    fetchLocale()
  }, [])

  useEffect(() => {
    const isLogin = localStorage.getItem('@token')

    if (isLogin) {
      user.getUserInfo()
      user.isLogin = true
    }
  }, [])

  const contextValue = {
    locale,
    user,
  }

  return locale ? (
    <BrowserRouter basename="/">
      <ConfigProvider locale={getArcoLocale()}>
        <Provider {...store}>
          <GlobalContext.Provider value={contextValue}>
            <Routes>
              <Route path="/ids/login" element={<Login />} />
              <Route
                path="*"
                element={
                  <Auth>
                    <PageLayout />
                  </Auth>
                }
              />
            </Routes>
            <Setting />
          </GlobalContext.Provider>
        </Provider>
      </ConfigProvider>
    </BrowserRouter>
  ) : null
}

export default App
