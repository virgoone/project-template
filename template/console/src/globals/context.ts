/* eslint-disable import/prefer-default-export */
import User from '@/store/user'
import { createContext } from 'react'

export interface GlobalContextType {
  locale?: Record<string, string>
  user?: typeof User
}
export const GlobalContext = createContext<GlobalContextType>({})
