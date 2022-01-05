import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { observer, Provider } from 'mobx-react'
import { ConfigProvider } from '@arco-design/web-react'
import zhCN from '@arco-design/web-react/es/locale/zh-CN'
import enUS from '@arco-design/web-react/es/locale/en-US'
import { GlobalContext } from '@/globals/context'
import store from '@/stores'
import PageLayout from './layout'
import Login from './pages/login'

function App() {
  const localeName = localStorage.getItem('arco-lang') || 'zh-CN'

  if (!localStorage.getItem('arco-lang')) {
    localStorage.setItem('arco-lang', localeName)
  }

  const [locale, setLocale] = useState()

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

  const contextValue = {
    locale,
  }

  return (
    <BrowserRouter>
      <ConfigProvider locale={getArcoLocale()}>
        <Provider store={store}>
          <GlobalContext.Provider value={contextValue}>
            <Routes>
              <Route path="/ids/login" element={<Login />} />
              <Route path="*" element={<PageLayout />} />
            </Routes>
          </GlobalContext.Provider>
        </Provider>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default observer(() => <App />)
