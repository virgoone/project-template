import React from 'react'
import { Layout } from '@arco-design/web-react'
import { FooterProps } from '@arco-design/web-react/es/Layout/interface'
import cs from 'clsx'
import useLocale from '@/hooks/useLocale'
import styles from './style.scss?modules'

const { Footer } = Layout

export default (props: FooterProps = {}) => {
  const { className, ...restProps } = props
  const locale = useLocale()

  return (
    <Footer className={cs(styles.footer, className)} {...restProps}>
      {locale['app.title']} © Rights Reserved {new Date().getFullYear()}
    </Footer>
  )
}
