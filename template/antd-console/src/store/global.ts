import { makeAutoObservable } from 'mobx'

import defaultSettings from '../settings.json'

type ThemeType = 'light' | 'dark'

const defaultTheme = localStorage.getItem('antd-theme') || 'light'

function changeTheme(newTheme?: ThemeType) {
  if ((newTheme || defaultTheme) === 'dark') {
    document.body.setAttribute('antd-theme', 'dark')
  } else {
    document.body.removeAttribute('antd-theme')
  }
}

class GlobalStore {
  constructor() {
    makeAutoObservable(this)
    const theme = (localStorage.getItem('antd-theme') || 'light') as ThemeType
    this.changeTheme(theme)
    changeTheme(theme)
  }
  theme: ThemeType = defaultTheme as ThemeType

  settings = defaultSettings

  changeTheme = (theme: ThemeType) => {
    if (theme === 'light' || theme === 'dark') {
      localStorage.setItem('antd-theme', theme)
    }
    this.theme = theme
    console.log('theme store dispatch', this.theme)
  }

  updateSettings = (settings: typeof defaultSettings) => {
    this.settings = { ...defaultSettings, ...settings }
  }
}

export const globalStore = new GlobalStore()

export default globalStore
