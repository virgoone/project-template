/* eslint-disable import/prefer-default-export */
import { createContext } from 'react'

export const GlobalContext = createContext<{ locale?: Record<string, string> }>(
  {}
)
