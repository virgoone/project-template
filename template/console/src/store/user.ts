import { makeAutoObservable, runInAction } from 'mobx'
import axios from 'axios'

class User {
  constructor() {
    makeAutoObservable(this)
  }
  loading?: boolean

  token?: string

  info: {
    name?: string

    avatar?: string

    job?: string
    jobName?: string
    organization?: string
    organizationName?: string

    location?: string
    locationName?: string

    email?: string

    accountId?: string
    phoneNumber?: string
    registrationTime?: string

    personalWebsite?: string
    introduction?: string
  }

  isLogin?: boolean

  doLogout() {
    localStorage.removeItem('@token')
    this.isLogin = false
  }

  getUserInfo() {
    this.loading = true
    axios.get('/api/user/userInfo').then((res) => {
      const { data } = res
      console.log('data', data)

      runInAction(() => {
        this.info = data
        this.isLogin = true
        this.loading = false
      })
    })
  }
}

export const user = new User()

export default user
