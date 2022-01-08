import React, { forwardRef } from 'react'
import { Button } from '@arco-design/web-react'
import styles from './style/icon-button.scss?modules'

function IconButton(
  props: { [x: string]: any; icon: any },
  ref: React.Ref<unknown> | undefined
) {
  const { icon, ...rest } = props

  return (
    <Button
      ref={ref}
      className={styles['icon-button']}
      icon={icon}
      shape="circle"
      type="secondary"
      {...rest}
    />
  )
}

export default forwardRef(IconButton)
