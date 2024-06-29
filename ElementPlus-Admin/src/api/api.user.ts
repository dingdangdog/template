import $http from './index'
import type { User, LoginUser } from '../types/user'

/**
 * 登录
 * @param flag 是否记住
 * @param user 用户信息
 * @returns LoginUser
 */
// export function login(flag: boolean, user: User): Promise<LoginUser> {
//   return $http({ url: '/login?flag=' + flag, method: 'post', data: user })
// }

/**
 * 这是个模拟接口
 */
export function login(flag: boolean, user: User): Promise<LoginUser> {
  return new Promise((resolve, reject) => {
    const loginUser: LoginUser = {
      id: 1,
      name: 'string',
      token: 'string'
    }
    resolve(loginUser)
  })
}
