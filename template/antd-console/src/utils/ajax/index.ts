// http.ts
import { URL_API_BASE } from '@/constants'
import { message as toast } from 'antd'
import axios from 'axios'

import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios'

export interface AjaxError extends AxiosError {
  httpCode?: number
  reason?: string
  $response?: any
  $request?: any
}

function onFulfilledInterceptor(response: AxiosResponse): any {
  return response.data
}

function onRejectedInterceptor(error: AjaxError): void {
  if (error.response) {
    const { data = {}, status } = error.response
    const responseData = data as any
    error.reason =
      responseData.message || responseData.error || responseData.details
    error.httpCode = status
    error.code = responseData.code || responseData.error_code || error.code
    error.$response = error.response
  } else if (error.request) {
    error.code = '-1'
    error.$request = error.request
    error.reason = 'no response'
  }

  throw error
}

export interface AjaxInstance extends AxiosInstance {
  request: <T = any>(config: AxiosRequestConfig) => Promise<T>

  get: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<T>

  post: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => Promise<T>

  put: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => Promise<T>

  patch: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => Promise<T>
}
async function onRequestInterceptor(config: any) {
  // auto append service prefix
  if (config.url) {
    config.url = URL_API_BASE + config.url
  }

  const _headers: AxiosRequestHeaders | any = {
    Authorization: localStorage.getItem('@@token'),
    'Content-Type': 'application/json',
  }

  config.headers = {
    ..._headers,
    ...config.headers,
  }
  return config
}
function ajax(config: AxiosRequestConfig): AjaxInstance {
  const instance = axios.create(config)
  instance.interceptors.response.use(
    onFulfilledInterceptor,
    onRejectedInterceptor
  )
  instance.interceptors.request.use(onRequestInterceptor, (error) => {
    error.data = {}
    error.data.msg = 'The server is abnormal, please contact the administrator!'
    return Promise.resolve(error)
  })
  return instance as AjaxInstance
}

const request = ajax({
  baseURL: '/',
  timeout: 30000,
  withCredentials: true,
})

// request.defaults.withCredentials = true
// response interceptor
request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.log(`repeated request: ${error.message}`)
    } else {
      // handle error code
      const { data } = error.response
      if (data.statusCode === 401) {
        localStorage.removeItem('@@token')

        window.location.href = `${window.location.origin}/login`
        return data
      } else if (data.statusCode === 403) {
        toast.error(data.message ? data.message : '403 Forbidden')
        return data
      } else if (data.statusCode === 404) {
        toast.error(data.message ? data.message : '404 Not Found')
        return data
      } else if (data.statusCode === 500 || data.statusCode === 502) {
        toast.error('500 Internal Server Error')
        return
      }

      toast.error(data.message)

      error.data = {}
      error.data.msg = 'Please check the network or contact the administrator!'
      return Promise.reject(error)
    }
  }
)

export default request
