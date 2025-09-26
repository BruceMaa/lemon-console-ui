import type * as T from './type'
import http from '@/utils/http'

export type * from './type'

const BASE_URL = '/dashboard'

/** @desc 查询公告列表 */
export function listDashboardNotice() {
  return http.get<T.DashboardNoticeResp[]>(`${BASE_URL}/notice`)
}
