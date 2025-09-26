import type * as T from './type'
import http from '@/utils/http'

export type * from './type'

const BASE_URL = '/auth'

/** 账号密码登录 */
export const accountLogin = (req: T.AccountLoginReq) => {
  return http.post(`${BASE_URL}/login`, req)
}

/** 退出登录 */
export const logout = () => {
  return http.post(`${BASE_URL}/logout`)
}

/** 获取用户信息 */
export const getUserInfo = () => {
  return http.get<T.UserInfo>(`${BASE_URL}/user/info`)
}

/** 获取路由信息 */
export const getUserRoute = () => {
  return http.get<T.RouteItem[]>(`${BASE_URL}/user/route`)
}
