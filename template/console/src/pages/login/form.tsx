import React, { useEffect, useRef, useState } from 'react'
import {
  Form,
  Input,
  Checkbox,
  Link,
  Button,
  Space,
} from '@arco-design/web-react'
import { FormInstance } from '@arco-design/web-react/es/Form'
import { IconLock, IconUser } from '@arco-design/web-react/icon'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { observer } from 'mobx-react'
import useStores from '@/hooks/useStores'
import useLocale from './locale/useLocale'
import { defaultRoute } from '@/routes'
import styles from './style.less?modules'

function LoginForm() {
  const formRef = useRef<FormInstance>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [rememberPassword, setRememberPassword] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const userStore = useStores('user')
  const locale = useLocale()

  // @ts-ignore
  const from = location.state?.from?.pathname || `/${defaultRoute}`

  function afterLoginSuccess(params: Record<string, string>, token: string) {
    // 记住密码
    if (rememberPassword) {
      localStorage.setItem('loginParams', JSON.stringify(params))
    } else {
      localStorage.removeItem('loginParams')
    }
    // 记录登录状态
    localStorage.setItem('@token', token)
    userStore.getUserInfo()
    userStore.isLogin = true
    // 跳转首页
    navigate(from)
  }

  function login(params: Record<string, any>) {
    setErrorMessage('')
    setLoading(true)
    axios
      .post('/api/user/login', params)
      .then((res) => {
        const { status, msg, token } = res.data
        if (status === 'ok') {
          afterLoginSuccess(params, token)
        } else {
          setErrorMessage(msg || '登录出错，请刷新重试')
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  function onSubmitClick() {
    formRef.current?.validate().then((values) => {
      login(values)
    })
  }

  // 读取 localStorage，设置初始值
  useEffect(() => {
    const params = localStorage.getItem('loginParams')
    const rememberPassword = !!params
    setRememberPassword(rememberPassword)
    if (formRef.current && rememberPassword) {
      const parseParams = JSON.parse(params)
      formRef.current.setFieldsValue(parseParams)
    }
  }, [])

  useEffect(() => {
    if (userStore.isLogin) {
      navigate(from, {
        replace: true,
      })
    }
  }, [from, userStore.isLogin])

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>{locale['login.title']}</div>
      <div className={styles['login-form-sub-title']}>
        {locale['login.subtitle']}
      </div>
      <div className={styles['login-form-error-msg']}>{errorMessage}</div>
      <Form className={styles['login-form']} layout="vertical" ref={formRef}>
        <Form.Item
          field="userName"
          rules={[
            { required: true, message: locale['login.form.username.required'] },
          ]}
        >
          <Input
            prefix={<IconUser />}
            placeholder={locale['login.form.password.tips']}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Form.Item
          field="password"
          rules={[
            { required: true, message: locale['login.form.password.tips'] },
          ]}
        >
          <Input.Password
            prefix={<IconLock />}
            placeholder={locale['login.form.password.tips']}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Space size={16} direction="vertical">
          <div className={styles['login-form-password-actions']}>
            <Checkbox checked={rememberPassword} onChange={setRememberPassword}>
              {locale['login.form.button.remember-password']}
            </Checkbox>
            <Link>{locale['login.form.button.forgot-password']}？</Link>
          </div>
          <Button type="primary" long onClick={onSubmitClick} loading={loading}>
            {locale['login.form.button.login']}
          </Button>
          <Button
            type="text"
            long
            className={styles['login-form-register-btn']}
          >
            {locale['login.form.button.signup']}
          </Button>
        </Space>
      </Form>
    </div>
  )
}
export default observer(LoginForm)
