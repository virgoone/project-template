import { makeAutoObservable, runInAction } from 'mobx'
import axios from 'axios'

class User {
  constructor() {
    makeAutoObservable(this)
  }
  name?: string

  avatar?: string

  job?: string

  organization?: string

  location?: string

  email?: string

  isLogin?: boolean

  doLogout() {
    localStorage.removeItem('@token')
    this.isLogin = false
  }

  getUserInfo() {
    axios.get('/api/user/userInfo').then((res) => {
      const { data } = res

      runInAction(() => {
        this.name = data.name
        this.avatar = data.avatar
        this.job = data.job
        this.organization = data.organization
        this.location = data.location
        this.email = data.email
        this.isLogin = true
      })
    })
  }
}

export const user = new User()

export default user
