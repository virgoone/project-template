// import { hash } from 'spark-md5'
import type { StateCreator } from 'zustand'
import ajax from '@/utils/ajax'
import type { RootStoreState } from '../rootModel'
import type {
  PersistMiddleware,
  DevtoolsMiddleware,
  ImmerMiddleware,
} from '../type'

interface UserModelSlice {
  token?: string // 用户token

  setToken: (token: string) => void
  setUser: (info: any) => void
  setUserInfo: () => void
  // updateUserInfo: (
  //   payload: Parameters<typeof updateUserInfoAPI>[number]
  // ) => Promise<string>

  // emitLoginCallback: (callback?: () => void) => void
  // emitLoginCallbackWithPathname: (
  //   pathname: string,
  //   callback?: () => void
  // ) => void
}

/**
 * 用户模型切片
 */
const createUserModelSlice: StateCreator<
  RootStoreState,
  [
    DevtoolsMiddleware,
    PersistMiddleware<unknown>,
    ImmerMiddleware<RootStoreState>,
  ],
  [],
  UserModelSlice
> = (set, get) => ({
  token: null,
  info: null,

  // /**
  //  * 触发登录状态
  //  * 未登录 打开登录Modal
  //  */
  // emitLoginCallback: (callback) => {
  //   const { userInfo } = get()
  //   if (userInfo) {
  //     callback?.()
  //     return
  //   }

  //   get().setLoginModalVisible(true)
  // },

  // // 判断路由
  // emitLoginCallbackWithPathname: (pathname, callback) => {
  //   // 首页 发现页 继续操作
  //   if (allowNotLoginInPath(pathname)) {
  //     callback?.()
  //   } else {
  //     get().emitLoginCallback(callback)
  //   }
  // },

  // 设置用户信息
  setUser: (info) => {
    // const { bilibiliLink, xhsLink, tiktokLink, invitationCode } = info
    set((state) => {
      state.info = info
    })
  },

  // 设置用户信息
  setUserInfo: async () => {
    const res = await ajax.get('/api/user/userInfo')

    if (!res) return

    get().setUser(res)
  },

  // // 修改用户信息
  // updateUserInfo: async (payload) => {
  //   try {
  //     await updateUserInfoAPI(payload)
  //     set((state) => {
  //       if (!state.userInfo) return
  //       state.userInfo.avatar = payload.avatar ?? state.userInfo.avatar
  //       state.userInfo.nickName = payload.nickName ?? state.userInfo.nickName
  //       state.userInfo.signature = payload.signature ?? state.userInfo.signature
  //       state.userInfo.bilibiliLink =
  //         payload.bilibiliLink ?? state.userInfo.bilibiliLink
  //       state.userInfo.xhsLink = payload.xhsLink ?? state.userInfo.xhsLink
  //       state.userInfo.tiktokLink =
  //         payload.tiktokLink ?? state.userInfo.tiktokLink
  //     })

  //     return ''
  //   } catch (error) {
  //     const { message } = error as Error
  //     return message
  //   }
  // },

  // 登录
  // 设置token
  setToken: (token) =>
    set((state) => {
      state.token = token
      localStorage.setItem('@@token', token)
    }),
})

export type { UserModelSlice }
export { createUserModelSlice }
