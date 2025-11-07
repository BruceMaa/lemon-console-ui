/**
 * OnlineUserResp，在线用户响应参数
 */
export interface OnlineUserResp {
  /**
   * 登录地点
   */
  address?: string
  /**
   * 浏览器
   */
  browser?: string
  /**
   * 客户端 ID
   */
  clientId?: string
  /**
   * 客户端类型
   */
  clientType?: string
  /**
   * ID
   */
  id: number
  /**
   * 登录 IP
   */
  ip?: string
  /**
   * 最后活跃时间
   */
  lastActiveTime?: string
  /**
   * 登录时间
   */
  loginTime?: string
  /**
   * 昵称
   */
  nickname?: string
  /**
   * 操作系统
   */
  os?: string
  /**
   * 令牌
   */
  token: string
  /**
   * 用户名
   */
  username?: string
}
export interface OnlineUserQuery {
  nickname?: string
  loginTime?: string
  sort: Array<string>
}
export interface OnlineUserPageQuery extends OnlineUserQuery, PageQuery {}
