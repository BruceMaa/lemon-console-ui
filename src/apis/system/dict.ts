import type * as T from './type'
import http from '@/utils/http'

export type * from './type'

const BASE_URL = '/system/dicts'
const ITEM_BASE_URL = '/system/dict-items'

/** @desc 查询字典列表 */
export function listDict(query?: T.DictQuery) {
  return http.get<T.DictResp[]>(`${BASE_URL}/list`, query)
}

/** @desc 查询字典详情 */
export function getDict(id: string) {
  return http.get<T.DictResp>(`${BASE_URL}/${id}`)
}

/** @desc 新增字典 */
export function addDict(data: T.DictReq) {
  return http.post(`${BASE_URL}`, data)
}

/** @desc 修改字典 */
export function updateDict(data: T.DictReq, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除字典 */
export function deleteDict(id: string) {
  return http.del(`${BASE_URL}`, { ids: [id] })
}

/** @desc 清除字典缓存 */
export function clearDictCache(code: string) {
  return http.del(`${BASE_URL}/cache/${code}`)
}

/** @desc 查询字典项列表 */
export function listDictItem(query: T.DictItemPageQuery) {
  return http.get<PageRes<T.DictItemResp[]>>(`${ITEM_BASE_URL}`, query)
}

/** @desc 查询字典项详情 */
export function getDictItem(id: string) {
  return http.get<T.DictItemResp>(`${ITEM_BASE_URL}/${id}`)
}

/** @desc 新增字典项 */
export function addDictItem(data: T.DictItemReq) {
  return http.post(`${ITEM_BASE_URL}`, data)
}

/** @desc 修改字典项 */
export function updateDictItem(data: T.DictItemReq, id: string) {
  return http.put(`${ITEM_BASE_URL}/${id}`, data)
}

/** @desc 删除字典项 */
export function deleteDictItem(id: string) {
  return http.del(`${ITEM_BASE_URL}`, { ids: [id] })
}
