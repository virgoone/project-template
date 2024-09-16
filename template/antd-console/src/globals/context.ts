import { createContext } from 'react'
import type { UserInfo } from '@/store/rootModel'

export const GlobalContext = createContext<{
  lang: string
  user?: UserInfo
  setLang?: (value: string) => void
}>({ lang: 'zh-CN' })
