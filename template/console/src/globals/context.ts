import User from '@/store/user'
import { createContext } from 'react'

export const GlobalContext = createContext<{
  lang: string
  user?: typeof User
  setLang?: (value: string) => void
}>({ lang: 'zh-CN' })
