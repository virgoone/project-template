import React, { useEffect, useRef, useState } from 'react'
import { Form, Input, Checkbox, Button, Space } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import Link from '@/components/link'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useModel } from '@/store'
import useLocale from './locale/useLocale'
import { defaultRoute } from '@/routes'
import styles from './style.less?modules'

function LoginForm() {
  const [form] = Form.useForm()
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [rememberPassword, setRememberPassword] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const store = useModel(state => state)
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
    store.setToken(token)
    // 记录登录状态
    store.setUserInfo()
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
    form?.validateFields().then((values) => {
      console.log('values-->', values)
      login(values)
    })
  }

  // 读取 localStorage，设置初始值
  useEffect(() => {
    const params = localStorage.getItem('loginParams')
    const rememberPassword = !!params
    setRememberPassword(rememberPassword)
    if (form && rememberPassword) {
      const parseParams = JSON.parse(params)
      form.setFieldsValue(parseParams)
    }
  }, [])

  useEffect(() => {
    if (store.isLogin) {
      navigate(from, {
        replace: true,
      })
    }
  }, [from, store.isLogin])

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>{locale['login.title']}</div>
      <div className={styles['login-form-sub-title']}>
        {locale['login.subtitle']}
      </div>
      <div className={styles['login-form-error-msg']}>{errorMessage}</div>
      <Form form={form} className={styles['login-form']} layout="vertical">
        <Form.Item
          name="username"
          rules={[
            { required: true, message: locale['login.form.username.required'] },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder={locale['login.form.password.tips']}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: locale['login.form.password.tips'] },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={locale['login.form.password.tips']}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Space size={16} style={{ width: '100%' }} direction="vertical">
          <div className={styles['login-form-password-actions']}>
            <Checkbox
              checked={rememberPassword}
              onChange={(e) => setRememberPassword(e.target.checked)}
            >
              {locale['login.form.button.remember-password']}
            </Checkbox>
            <Link>{locale['login.form.button.forgot-password']}？</Link>
          </div>
          <Button
            type="primary"
            block
            onClick={onSubmitClick}
            loading={loading}
          >
            {locale['login.form.button.login']}
          </Button>
          <Button
            type="text"
            block
            className={styles['login-form-register-btn']}
          >
            {locale['login.form.button.signup']}
          </Button>
        </Space>
      </Form>
    </div>
  )
}
export default LoginForm
