import type * as T from './type'
import type { Status } from '@/enums'
import type { LabelValueState } from '@/types/global'
import http from '@/utils/http'

export type * from './type'

const BASE_URL = '/system/roles'

/** @desc 查询角色列表 */
export function listRole(query: T.RoleQuery) {
  return http.get<T.RoleResp[]>(`${BASE_URL}/list`, query)
}

/** @desc 查询角色详情 */
export function getRole(id: string) {
  return http.get<T.RoleDetailResp>(`${BASE_URL}/${id}`)
}

/** @desc 新增角色 */
export function addRole(data: T.RoleReq) {
  return http.post(`${BASE_URL}`, data)
}

/** @desc 修改角色 */
export function updateRole(data: T.RoleReq, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除角色 */
export function deleteRole(id: string) {
  return http.del(`${BASE_URL}`, { ids: [id] })
}

/** @desc 查询角色权限树 */
export function listRolePermissionTree() {
  return http.get<T.RolePermissionResp[]>(`${BASE_URL}/permission/tree`)
}

/** @desc 修改角色权限 */
export function updateRolePermission(id: string, data: T.RolePermissionUpdateReq) {
  return http.patch(`${BASE_URL}/${id}/permissions`, data)
}

/** @desc 查询角色关联用户 */
export function listRoleUser(id: string, query: T.RoleUserPageQuery) {
  return http.get<PageRes<T.RoleUserResp[]>>(`${BASE_URL}/${id}/users`, query)
}

/** @desc 分配角色给用户 */
export function assignToUsers(id: string, userIds: Array<string>) {
  return http.patch(`${BASE_URL}/${id}/users`, userIds)
}

/** @desc 取消分配角色给用户 */
export function unassignFromUsers(userRoleIds: Array<string | number>) {
  return http.del(`${BASE_URL}/user`, userRoleIds)
}

/** @desc 查询角色关联用户 ID */
export function listRoleUserId(id: string) {
  return http.get(`${BASE_URL}/${id}/user-id`)
}

/** @desc 查询角色字典 */
export function listRoleDict(query?: { name: string, status: Status }) {
  return http.get<LabelValueState[]>(`${BASE_URL}/dict`, query)
}
