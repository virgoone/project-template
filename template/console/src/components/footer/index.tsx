import React from 'react'
import { Layout } from '@arco-design/web-react'
import { FooterProps } from '@arco-design/web-react/es/Layout/interface'
import cs from 'clsx'
import styles from './style.scss?modules'

const Footer = Layout.Footer

export default (props: FooterProps = {}) => {
  const { className, ...restProps } = props
  return (
    <Footer className={cs(styles.footer, className)} {...restProps}>
      Arco Design Pro
    </Footer>
  )
}
