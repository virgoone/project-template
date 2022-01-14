import React from 'react'
import { observer } from 'mobx-react'
import { Navigate, useLocation } from 'react-router-dom'

import useStores from '@/hooks/useStores'

function Auth({ children }: { children: JSX.Element }) {
  const location = useLocation()
  const userStore = useStores('user')

  if (!userStore?.isLogin) {
    return <Navigate to="/ids/login" state={{ from: location }} replace />
  }

  return children
}

export default observer(Auth)
