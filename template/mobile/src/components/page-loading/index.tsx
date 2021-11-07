import React, { useEffect, useRef } from 'react'
import loadLottie from '@/utils/lottie'

import './style.scss'

export default function PageLoading() {
  const lottieElement = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const animate = async () => {
      if (!lottieElement.current) {
        return
      }
      const lottieWeb = await loadLottie()

      const lottieAnimation = lottieWeb.loadAnimation({
        container: lottieElement.current,
        animationData: require('./animate.json'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        name: 'entry',
      })

      return () => {
        lottieAnimation.destroy()
      }
    }
    animate()
  }, [])

  return (
    <div className="page-loading-wrapper">
      <div className="page-loading-lottie" ref={lottieElement} />
      <div className="page-loading-text">正在努力加载中...</div>
    </div>
  )
}
