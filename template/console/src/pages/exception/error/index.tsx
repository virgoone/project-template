import React, { useRef, useEffect } from 'react'
import qs from 'query-string'
import loadLottie from '@/utils/lottie'
import './style.less'

export default function PageFailed() {
  const { message = '', httpCode, code } = qs.parse(window.location.search)
  let hint = '数据加载失败'
  const lottieElement = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const animate = async () => {
      if (!lottieElement.current) {
        return
      }
      const lottieWeb = await loadLottie()

      const lottieAnimation = lottieWeb.loadAnimation({
        container: lottieElement.current,
        // eslint-disable-next-line global-require
        animationData: require('./error-animation.json'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        name: 'entry',
      })

      // eslint-disable-next-line consistent-return
      return () => {
        lottieAnimation.destroy()
      }
    }
    animate()
  }, [])

  hint = `${hint}${httpCode || code ? `(${httpCode},${code})` : ''}`

  return (
    <div className="page-failed-wrapper">
      <div className="page-failed-animate" ref={lottieElement} />
      <div className="page-failed-box">
        <div className="page-failed-text">
          <p>{hint}</p>
          <p>{message}</p>
        </div>
      </div>
    </div>
  )
}
