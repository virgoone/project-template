import React from 'react'
import { Layout } from 'antd'
import cs from 'clsx'
import useLocale from '@/hooks/useLocale'
import styles from './style.less?modules'

const { Footer } = Layout

export default (props: any = {}) => {
  const { className, ...restProps } = props
  const locale = useLocale()

  return (
    <Footer className={cs(styles.footer, className)} {...restProps}>
      {locale['app.title']} © Rights Reserved {new Date().getFullYear()}
    </Footer>
  )
}
