import React, { PureComponent, ComponentType } from 'react'
import { resolveChunk, isBrokenChunk } from './shared'

const INITIAL_STATE = {
  isLoading: true,
  loaded: undefined,
  error: undefined,
  timedOut: undefined,
  pastDelay: false
}

const MAX_TIMEOUT_RETRY_INC = 2

export type LoadableComponentType = React.JSX.Element | React.ReactNode

export interface LoadableState {
  isLoading: boolean
  loaded?: any
  error?: AjaxError
  timedOut?: number
  pastDelay: boolean
}

export interface ErrorExtra {
  isLoading: boolean
  pastDelay: boolean
  timedOut?: number
  loaded: any
  timeoutRetryAddon: number
  didMount: boolean
}

export interface AjaxError {
  code?: number
  httpCode?: number
  message?: string
}

export type LoadableErrorHandle = (error: AjaxError, extra: ErrorExtra) => void

export type LoadableRenderHandle = (
  loaded: ComponentType,
  props: any
) => JSX.Element

export type LoadableLoaderHandle = (props?: any) => Promise<ESModule>

export interface LoadableProps {
  loader: LoadableLoaderHandle
  loading: any
  failed: any
  render?: LoadableRenderHandle
  onError?: LoadableErrorHandle
  timeout?: number
  delay?: number
}

class Loadable extends PureComponent<LoadableProps, LoadableState> {
  state: LoadableState = {
    ...INITIAL_STATE
  }

  timeoutRetryAddon = 0
  didMount = false
  delayTimer: number
  timeoutTimer: number

  componentDidMount() {
    this.didMount = true
    this.load()
  }

  componentWillUnmount() {
    this.didMount = false
    clearTimeout(this.delayTimer)
    clearTimeout(this.timeoutTimer)
  }

  reportError(error: AjaxError) {
    if (this.props.onError) {
      const { isLoading, pastDelay, timedOut } = this.state
      const { timeoutRetryAddon, didMount } = this
      const loaded = !!this.state.loaded

      this.props.onError(error, {
        isLoading,
        pastDelay,
        timedOut,
        loaded,
        timeoutRetryAddon,
        didMount
      })
    }
  }

  onPastDelay = () => {
    this.setState({ pastDelay: true })
  }

  onTimedOut = (timedOut?: number) => {
    this.setState({ timedOut })
  }

  load = async (retryTimeout?: number) => {
    const { loader, loading, failed, render, timeout, delay, ...restProps } =
      this.props

    let isLoading = true
    let loaded
    let error

    this.setState(INITIAL_STATE)

    if (delay === 0) {
      this.onPastDelay()
    } else {
      this.delayTimer = window.setTimeout(this.onPastDelay, delay)
    }

    if (timeout) {
      const timedOut = retryTimeout || timeout

      this.timeoutTimer = window.setTimeout(this.onTimedOut, timedOut, timedOut)
    }

    try {
      loaded = await loader(restProps)
    } catch (err) {
      error = err
    }

    // 如果 js 下载成功，但是脚本加载出错
    // 会导致 error 发生，此时 retry
    // 会导致 loaded.default 为 undefined 而且没有异常发生，
    // 比如脚本加载时访问 localStorage，但是 localStorage 不可用
    // 需要显式上报错误
    if (!error && isBrokenChunk(loaded)) {
      error = new Error('Loading chunk error, broken')
    }

    isLoading = false

    clearTimeout(this.delayTimer)
    clearTimeout(this.timeoutTimer)

    if (this.didMount && !this.state.timedOut) {
      this.setState({
        isLoading,
        loaded,
        error
      })
    }

    if (error) {
      this.reportError(error)
    }
  }

  componentDidCatch(error: Error) {
    this.reportError(error)
    this.setState({ error })
  }

  render() {
    const { isLoading, loaded, error, timedOut, pastDelay } = this.state
    const {
      loader,
      loading,
      failed,
      timeout = 15000,
      delay = 200,
      render,
      onError,
      ...restProps
    } = this.props
    console.log('isLoading-->', error, pastDelay, isLoading)

    if (timedOut) {
      const message = `ERR_TIMED_OUT(${timedOut})`
      const retry = () => {
        if (this.timeoutRetryAddon < MAX_TIMEOUT_RETRY_INC) {
          this.timeoutRetryAddon++
        }
        this.load(timeout * (this.timeoutRetryAddon + 1))
      }

      return React.createElement(failed, {
        message,
        retry
      })
    }

    if (error) {
      const { code, httpCode } = error
      let message = error.message
      const retry = this.load

      if (httpCode) {
        message = `${message}(${httpCode})`
      }

      return React.createElement(failed, {
        httpCode,
        message,
        code,
        retry
      })
    }

    if (pastDelay && isLoading) {
      return React.createElement(loading)
    }

    if (!isLoading) {
      if (render) {
        return render(resolveChunk(loaded), restProps)
      }

      return React.createElement(resolveChunk(loaded), restProps)
    }

    return null // avoid loading flash
  }
}

export default Loadable
