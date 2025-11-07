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

/**
 * LogResp，日志响应参数
 */
export interface LogResp {
  /**
   * IP 归属地
   */
  address?: string
  /**
   * 浏览器
   */
  browser?: string
  /**
   * 创建时间
   */
  createdAt?: string
  /**
   * 创建人
   */
  createdUsername?: string
  /**
   * 日志描述
   */
  description?: string
  /**
   * 错误信息
   */
  errorMsg?: string
  /**
   * ID
   */
  id: string
  /**
   * IP
   */
  ip?: string
  /**
   * 所属模块
   */
  module?: string
  /**
   * 操作系统
   */
  os?: string
  /**
   * 状态<span style='color:red'>{1=成功, 2=失败}</span>
   */
  status?: number
  /**
   * 耗时（ms）
   */
  timeTaken: number
}
/**
 * LogDetailResp，日志详情响应参数
 */
export interface LogDetailResp {
  /**
   * IP 归属地
   */
  address?: string
  /**
   * 浏览器
   */
  browser?: string
  /**
   * 创建时间
   */
  createdAt?: string
  /**
   * 创建人
   */
  createdUsername?: string
  /**
   * 日志描述
   */
  description?: string
  /**
   * 错误信息
   */
  errorMsg?: string
  /**
   * ID
   */
  id: string
  /**
   * IP
   */
  ip?: string
  /**
   * 所属模块
   */
  module?: string
  /**
   * 操作系统
   */
  os?: string
  /**
   * 请求体
   */
  requestBody?: string
  /**
   * 请求头
   */
  requestHeaders?: string
  /**
   * 请求方式
   */
  requestMethod?: string
  /**
   * 请求 URL
   */
  requestUrl?: string
  /**
   * 响应体
   */
  responseBody?: string
  /**
   * 响应头
   */
  responseHeaders?: string
  /**
   * 状态<span style='color:red'>{1=成功, 2=失败}</span>
   */
  status?: number
  /**
   * 状态码
   */
  statusCode?: number
  /**
   * 耗时（ms）
   */
  timeTaken: number
  /**
   * 链路 ID
   */
  traceId?: string
}

export interface LogQuery {
  description?: string
  module?: string
  ip?: string
  createdUsername?: string
  createdAt: Array<string>
  status?: number
  sort: Array<string>
}

export interface LogPageQuery extends LogQuery, PageQuery {}
