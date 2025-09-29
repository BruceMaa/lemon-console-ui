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
