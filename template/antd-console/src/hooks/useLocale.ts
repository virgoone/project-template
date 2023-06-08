import { useContext } from 'react'
import { GlobalContext } from '@/globals/context'
import defaultLocale from '@/locale'

function useLocale(locale: Record<string, any> = defaultLocale) {
  const { lang } = useContext(GlobalContext)

  return locale[lang] || {}
}

export default useLocale
