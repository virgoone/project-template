import React from 'react'
import { ReactComponentLike } from 'prop-types'
import Loadable, { LoadableErrorHandle, LoadableLoaderHandle } from './Loadable'
import { resolveChunk } from './shared'

function renderChunk(loaded: any, props: any) {
  if (loaded.__loadable__) {
    const { component, data } = loaded

    return React.createElement(component, { ...props, ...data })
  }

  return React.createElement(loaded, props)
}

export interface LoadableInitOpts {
  onError?: LoadableErrorHandle
  Loading?: ReactComponentLike
  Failed?: ReactComponentLike
  timeout?: number
  codeSplitting?: boolean
}

export default function loadWithInitialProps(
  loader: LoadableLoaderHandle | ESModule,
  options: LoadableInitOpts = {},
) {
  const {
    onError,
    Loading,
    Failed,
    timeout = 10000,
    codeSplitting = true,
  } = options

  async function load(props: any) {
    const loaded = codeSplitting
      ? await (loader as LoadableLoaderHandle)()
      : (loader as ESModule)
    const component = resolveChunk(loaded)

    if (component && component.getInitialProps) {
      const data = await component.getInitialProps(props)
      const __loadable__ = true

      return {
        component,
        data,
        __loadable__,
      }
    }

    return loaded
  }

  return function LoadableWrapper(props: any) {
    return (
      <Loadable
        {...props}
        onError={onError}
        loading={Loading}
        failed={Failed}
        render={renderChunk}
        loader={load}
        timeout={timeout}
      />
    )
  }
}
