import React from 'react'
import NotFountPng from '@/assets/404.png'
import ErrorPng from '@/assets/500.png'

import './style.less'

export interface PageFailedProps {
  code?: number
  httpCode?: number
  message?: string
  retry?: (() => void) | null
}
export default function PageFailed(props: PageFailedProps) {
  const { message = '', httpCode, code } = props
  const statusCode = httpCode || code
  let { retry } = props
  let hint = '数据加载失败'
  if (statusCode && statusCode >= 400) {
    if (statusCode === 401) {
      retry = null
      hint = '请先登录哦'
    } else if (statusCode === 404) {
      retry = null
      hint = '呜呜呜~老汉找不到家啦'
    }
  }

  hint = `${hint}${statusCode ? `(${statusCode})` : ''}`

  return (
    <div className="page-failed-wrapper">
      <div className="page-failed-img">
        <img src={statusCode === 404 ? NotFountPng : ErrorPng} />
      </div>
      <div className="page-failed-box">
        <div className="page-failed-text">
          <p>{hint}</p>
          <p>{message}</p>
        </div>
        {retry && (
          <button onClick={retry} className="page-failed-retry">
            点击重试
          </button>
        )}
      </div>
    </div>
  )
}
