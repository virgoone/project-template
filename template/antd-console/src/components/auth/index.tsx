import { useModel } from '@/store'
import React from 'react'

import { Navigate, useLocation } from 'react-router-dom'

function Auth({ children }: { children: JSX.Element }) {
  const location = useLocation()
  const [isLogin] = useModel((state) => [state.isLogin])

  if (!isLogin) {
    return <Navigate to="/user/login" state={{ from: location }} replace />
  }

  return children
}

export default Auth
