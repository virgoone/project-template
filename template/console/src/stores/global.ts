import { action, observable } from 'mobx'
import defaultSettings from '../settings.json'

type ThemeType = 'light' | 'dark'

const defaultTheme = localStorage.getItem('arco-theme') || 'light'

function changeTheme(newTheme?: ThemeType) {
  if ((newTheme || defaultTheme) === 'dark') {
    document.body.setAttribute('arco-theme', 'dark')
  } else {
    document.body.removeAttribute('arco-theme')
  }
}
changeTheme()

class GlobalStore {
  @observable
  theme: ThemeType = defaultTheme as ThemeType

  @observable
  settings = defaultSettings

  @action
  changeTheme = (theme: ThemeType) => {
    if (theme === 'light' || theme === 'dark') {
      localStorage.setItem('arco-theme', theme)
      changeTheme(theme)
    }
    this.theme = theme
  }

  @action
  updateSettings = (settings: typeof defaultSettings) => {
    this.settings = { ...defaultSettings, ...settings }
  }
}

export const globalStore = new GlobalStore()

export default globalStore
