import type * as T from './type'
import http from '@/utils/http'

const BASE_URL = '/medicine/infos'

/** @desc 分页查询列表 */
export function pageMedicineInfo(query: T.MedicineInfoPageQuery) {
  return http.get<PageRes<T.MedicineInfoResp[]>>(`${BASE_URL}`, query)
}

/** @desc 创建数据 */
export function createMedicineInfo(data: T.MedicineInfoReq) {
  return http.post<ApiRes<{ id: string }>>(`${BASE_URL}`, data)
}

/** @desc 查询详情 */
export function getMedicineInfo(id: string) {
  return http.get<T.MedicineInfoDetailResp>(`${BASE_URL}/${id}`)
}

/** @desc 修改数据 */
export function updateMedicineInfo(data: T.MedicineInfoReq, id: string) {
  return http.put<ApiRes<undefined>>(`${BASE_URL}/${id}`, data)
}

/** @desc 删除数据 */
export function deleteMedicineInfo(id: string) {
  return http.del(`${BASE_URL}`, { ids: [id] })
}
