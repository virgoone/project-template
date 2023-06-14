import React from 'react'

import './style.less'

export default function PageLoading() {
  return (
    <div className="page-loading-wrapper">
      <div className="page-loading-lottie">
        <div className="waveform">
          <div className="waveform__bar"></div>
          <div className="waveform__bar"></div>
          <div className="waveform__bar"></div>
          <div className="waveform__bar"></div>
        </div>
      </div>
    </div>
  )
}
