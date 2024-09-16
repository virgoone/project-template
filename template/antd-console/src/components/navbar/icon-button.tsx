import React, { forwardRef } from 'react'
import { Button } from 'antd'
import styles from './style/icon-button.less?modules'

function IconButton(
  props: { [x: string]: any; icon: any },
  ref: React.Ref<any> | undefined
) {
  const { icon, ...rest } = props

  return (
    <Button
      ref={ref}
      className={styles['icon-button']}
      icon={icon}
      shape="circle"
      type="default"
      {...rest}
    />
  )
}

export default forwardRef(IconButton)
