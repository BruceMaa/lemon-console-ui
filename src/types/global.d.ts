interface AnyObject {
  [key: string]: unknown
}

interface Options {
  label: string
  value: unknown
}

/** 键值对类型 */
export interface LabelValueState {
  label: string
  value: any
  extra?: string
}

declare global {
  type Recordable<T = any> = Record<string, T>
}

/** 状态（1： 启用；0： 禁用） */
type Status = 1 | 0

/** 性别（1： 男；2： 女； 0： 未知） */
type Gender = 1 | 2 | 0

/** 菜单类型 */
type MenuType = 1 | 2 | 3

/** 响应参数基类 */
export interface BaseResp {
  id: string
  createdUsername: string
  createdAt: string
  disabled: boolean
}

/** 详情响应参数基类 */
export interface BaseDetailResp extends BaseResp {
  modifiedUsername: string
  modifiedAt: string
}

type AuthType = 'ACCOUNT' | 'PHONE' | 'EMAIL'
