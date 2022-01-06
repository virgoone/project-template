import { makeAutoObservable } from 'mobx'
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

  getUserInfo() {
    axios.get('/api/user/userInfo').then((res) => {
      const { data } = res

      this.name = data.name
      this.avatar = data.avatar
      this.job = data.job
      this.organization = data.organization
      this.location = data.location
      this.email = data.email
    })
  }
}

export const user = new User()

export default user
