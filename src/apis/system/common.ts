import type { LabelValueState } from '@/types/global'
import http from '@/utils/http'

const BASE_URL = '/system/common'

/**
 * @desc 查询字典列表
 */
export const listCommonDict = (code: string) => {
  return http.get<LabelValueState[]>(`${BASE_URL}/dicts/${code}`)
}

/**
 * @desc 查询系统配置参数
 */
export const listSiteOptionDict = () => {
  return http.get<LabelValueState[]>(`${BASE_URL}/options/site-dict`)
}

/** 上传文件 */
export const upload = (data: FormData) => {
  return http.post(`${BASE_URL}/files`, data)
}
