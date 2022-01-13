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
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { observer } from 'mobx-react'
import useStores from '@/hooks/useStores'
import styles from './style.scss?modules'

function LoginForm() {
  const formRef = useRef<FormInstance>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [rememberPassword, setRememberPassword] = useState(false)
  const navigate = useNavigate()
  const userStore = useStores('user')

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
    navigate('/')
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
      navigate('/')
    }
  }, [userStore])

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>登录 Arco Design Pro</div>
      <div className={styles['login-form-sub-title']}>登录 Arco Design Pro</div>
      <div className={styles['login-form-error-msg']}>{errorMessage}</div>
      <Form className={styles['login-form']} layout="vertical" ref={formRef}>
        <Form.Item
          field="userName"
          rules={[{ required: true, message: '用户名不能为空' }]}
        >
          <Input
            prefix={<IconUser />}
            placeholder="用户名：admin"
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Form.Item
          field="password"
          rules={[{ required: true, message: '密码不能为空' }]}
        >
          <Input.Password
            prefix={<IconLock />}
            placeholder="密码：admin"
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Space size={16} direction="vertical">
          <div className={styles['login-form-password-actions']}>
            <Checkbox checked={rememberPassword} onChange={setRememberPassword}>
              记住密码
            </Checkbox>
            <Link>忘记密码？</Link>
          </div>
          <Button type="primary" long onClick={onSubmitClick} loading={loading}>
            登录
          </Button>
          <Button
            type="text"
            long
            className={styles['login-form-register-btn']}
          >
            注册账号
          </Button>
        </Space>
      </Form>
    </div>
  )
}
export default observer(LoginForm)
