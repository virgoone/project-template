import React from 'react'
import { MobXProviderContext } from 'mobx-react'

function useStores(name: string): Record<string, any> {
  return React.useContext(MobXProviderContext)[name]
}

export default useStores
