import React from 'react'
import { observer } from 'mobx-react'
import { Navigate, useLocation } from 'react-router-dom'

import useStores from '@/hooks/useStores'

function Auth({ children }: { children: JSX.Element }) {
  let location = useLocation()
  const user = useStores('user')

  if (!user?.isLogin) {
    return <Navigate to="/ids/login" state={{ from: location }} replace />
  }

  return children
}

export default observer(Auth)
