import defaultSettings from '@/settings.json'
import { message } from 'antd'
import { enableMapSet } from 'immer'
import { createContext, createElement, useContext, useRef } from 'react'
import { createStore, useStore } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { PropsWithChildren } from 'react'

import type { StorageValue } from 'zustand/middleware'
import type { UserModelSlice } from './slices/userSlice'
import { createUserModelSlice } from './slices/userSlice'
import type { Selector } from './type'

enableMapSet()

type ThemeType = 'light' | 'dark'

const defaultTheme = localStorage.getItem('antd-theme') || 'light'

function updateTheme(newTheme?: ThemeType) {
  if ((newTheme || defaultTheme) === 'dark') {
    document.body.setAttribute('antd-theme', 'dark')
  } else {
    document.body.removeAttribute('antd-theme')
  }
}

interface RootStoreProps { }

export interface UserInfo {
  name?: string
  avatar?: string
  phoneNumber?: string
  job?: string
  organization?: string
  location?: string
  email?: string
  permissions?: Record<string, string[]>
  [key: string]: any
}

interface RootStoreState extends RootStoreProps, UserModelSlice {
  loading: boolean
  settings: typeof defaultSettings
  theme: ThemeType
  info?: UserInfo
  isLogin?: boolean
  token?: string

  init: () => void

  changeTheme: (theme: ThemeType) => void

  updateSettings: (settings: typeof defaultSettings) => void

  reset: () => void

  showSuccess: (text: string | React.ReactNode) => void
  showInfo: (text: string | React.ReactNode) => void
  showError: (text: string | React.ReactNode) => void
}

type RootStore = ReturnType<typeof createRootStore>

/**
 * Context
 */
const rootContext = createContext<RootStore | null>(null)

/**
 * 创建根级仓库
 * @param {Partial<RootStoreProps>} initialProps
 * @returns {RootStore}
 */
function createRootStore(initialProps?: Partial<RootStoreProps>) {
  return createStore<RootStoreState>()(
    persist(
      immer(
        devtools((set, get, store) => ({
          loading: true,
          info: {},
          isLogin: !!localStorage.getItem('@@token'),
          settings: defaultSettings,
          theme: 'light',
          ...initialProps,
          ...createUserModelSlice(set, get, store),
          init: async () => {
            set((state) => {
              state.theme = defaultTheme as ThemeType
              state.isLogin = !!localStorage.getItem('@@token')
              state.token = localStorage.getItem('@@token')
              updateTheme(state.theme)
            })
            const { info } = get()
            if (info?.id) {
              set((state) => {
                state.loading = false
              })
              return
            }
            await get().setUserInfo()
            set((state) => {
              state.loading = false
            })
          },

          changeTheme: (theme) => {
            set((state) => {
              if (theme === 'light' || theme === 'dark') {
                localStorage.setItem('antd-theme', theme)
              }
              state.theme = theme
            })
          },
          updateSettings: (settings) => {
            set((state) => {
              state.settings = settings
            })
          },
          // 重置状态
          reset: () =>
            set((state) => {
              // state.pictureBookId = null
              // state.token = null
              // state.userInfo = null
              // state.loginModalVisible = false
            }),

          showSuccess: (text: string | React.ReactNode) => {
            message.success(text)
          },

          showError: (text: string | React.ReactNode) => {
            message.error(text)
          },

          showInfo: (text: string | React.ReactNode) => {
            message.info(text)
          },
        }))
      ),
      {
        name: 'root-storage',
        storage: {
          getItem: (name) => {
            const stringValue = localStorage.getItem(name)
            if (!stringValue) return null
            const { state } = JSON.parse(
              stringValue
            ) as StorageValue<RootStoreProps>
            return {
              state: {
                ...state,
              },
            }
          },
          setItem: (name, newValue: StorageValue<RootStoreProps>) => {
            const stringValue = JSON.stringify({
              state: {
                ...newValue.state,
              },
            })
            localStorage.setItem(name, stringValue)
          },
          removeItem: (name) => localStorage.removeItem(name),
        },
      }
    )
  )
}

/**
 * Provider
 * @description 上下文插件
 * @param {PropsWithChildren<RootStoreProps>}
 * @returns {JSX.Element}
 */
function RootProvider({
  children,
  ...props
}: PropsWithChildren<Partial<RootStoreProps>>) {
  const storeRef = useRef<RootStore>()
  if (!storeRef.current) {
    storeRef.current = createRootStore(props)
  }
  return createElement(
    rootContext.Provider,
    { value: storeRef.current },
    children
  )
}

/**
 * Hook
 * @description 获取上下文
 * @param {Selector} selector
 * @returns {RootStore}
 */
function useModel<T>(selector: Selector<RootStoreState, T>): T {
  const store = useContext(rootContext)
  if (!store) throw new Error('useModel must be used within a RootProvider')
  return useStore(store, selector)
}

export { RootProvider, useModel }
export type { RootStoreState }
