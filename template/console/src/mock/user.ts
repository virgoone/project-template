import Mock from 'mockjs'
import setupMock from '../utils/setupMock'

setupMock({
  setup() {
    // @ts-ignore
    Mock.XHR.prototype.withCredentials = true

    // 用户信息
    Mock.mock(new RegExp('/api/user/userInfo'), () => {
      return {
        name: '王立群',
        avatar:
          'https://lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png',
        email: 'wangliqun@email.com',
        job: 'frontend',
        jobName: '前端开发工程师',
        organization: 'Frontend',
        organizationName: '前端',
        location: '上海',
        locationName: '北京',
        introduction: '王力群并非是一个真实存在的人。',
        personalWebsite: 'https://www.arco.design',
        verified: Mock.Random.boolean(),
        phoneNumber: '177****1234',
        accountId: Mock.Random.id(),
        registrationTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
      }
    })

    // 登录
    Mock.mock(new RegExp('/api/user/login'), (params: Record<string, any>) => {
      const { userName, password } = JSON.parse(params.body)
      if (!userName) {
        return {
          status: 'error',
          msg: '用户名不能为空',
        }
      }
      if (!password) {
        return {
          status: 'error',
          msg: '密码不能为空',
        }
      }
      if (userName === 'admin' && password === 'admin') {
        return {
          status: 'ok',
          token: Mock.mock('@id()'),
        }
      }
      return {
        status: 'error',
        msg: '账号或者密码错误',
      }
    })
  },
})
