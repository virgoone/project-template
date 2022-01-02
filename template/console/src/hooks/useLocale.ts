import { useContext } from 'react'
import { GlobalContext } from '@/globals/context'

function useLocale() {
  const { locale = {} } = useContext(GlobalContext)

  return locale
}

export default useLocale
