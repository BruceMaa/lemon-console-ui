import type { Gender, Status } from '@/types/global'

/** 用户类型 */
export interface UserResp {
  id: string
  username: string
  nickname: string
  avatar: string
  gender: Gender
  email: string
  phone: string
  description: string
  status: Status
  isSystem?: boolean
  createdUsername: string
  createdAt: string
  modifiedUsername: string
  modifiedAt: string
  deptId: string
  deptName: string
  roleIds: Array<number>
  roleNames: Array<string>
  disabled: boolean
}
export type UserDetailResp = UserResp & {
  pwdResetTime?: string
}

export interface UserImportResp {
  importKey: string
  totalRows: number
  validRows: number
  duplicateUserRows: number
  duplicateEmailRows: number
  duplicatePhoneRows: number
}

export interface UserQuery {
  description?: string
  status?: Status
  createAt?: Array<string>
  deptId?: string
  sort: Array<string>
  userIds?: Array<string>
  roleId?: string
}
export interface UserPageQuery extends UserQuery, PageQuery {}

/** 角色类型 */
export interface RoleResp {
  id: string
  name: string
  code: string
  sort: number
  description: string
  dataScope: number
  isSystem: boolean
  createdUsername: string
  createdAt: string
  modifiedUsername: string
  modifiedAt: string
  disabled: boolean
}
export type RoleDetailResp = RoleResp & {
  menuIds: Array<number>
  deptIds: Array<number>
  menuCheckStrictly: boolean
  deptCheckStrictly: boolean
}
export interface RolePermissionResp {
  id: string
  title: string
  parentId: string
  permission?: string
  children?: RolePermissionResp[]
  permissions?: RolePermissionResp[]
  isChecked?: boolean
}
export interface RoleUserResp {
  id: string
  username: string
  nickname: string
  gender: Gender
  description: string
  status: Status
  isSystem?: boolean
  deptId: string
  deptName: string
  roleIds: Array<number>
  roleNames: Array<string>
  disabled: boolean
}
export interface RoleQuery {
  description?: string
  sort: Array<string>
}
export interface RoleUserQuery {
  description?: string
  sort: Array<string>
}
export interface RoleUserPageQuery extends RoleUserQuery, PageQuery {}

/** 基础配置类型 */
export interface BasicConfig {
  SITE_FAVICON: string
  SITE_LOGO: string
  SITE_TITLE: string
  SITE_COPYRIGHT: string
  SITE_BEIAN: string
}

/** 菜单类型 */
export interface MenuResp {
  id: string
  title: string
  parentId: string
  type: 1 | 2 | 3
  path: string
  name: string
  component: string
  redirect: string
  icon: string
  isExternal: boolean
  isCache: boolean
  isHidden: boolean
  permission: string
  sort: number
  status: Status
  createdUsername: string
  createdAt: string
  modifiedUsername: string
  modifiedAt: string
  children: MenuResp[]
}
export interface MenuQuery {
  title?: string
  status?: Status
}

/** 部门类型 */
export interface DeptResp {
  id: string
  name: string
  sort: number
  status: Status
  isSystem: boolean
  description: string
  createdUsername: string
  createdAt: string
  modifiedUsername: string
  modifiedAt: string
  parentId: string
  children: DeptResp[]
}
export interface DeptQuery {
  description?: string
  status?: Status
}

/** 公告类型 */
export interface NoticeResp {
  id?: string
  title?: string
  type: string
  noticeScope: number
  noticeMethods?: Array<number>
  isTiming: boolean
  publishTime?: string
  isTop: boolean
  status?: Status
}

export type NoticeDetailResp = NoticeResp & {
  createdUsername: string
  createdAt: string
  modifiedUsername: string
  modifiedAt: string
}
export type NoticePreviewResp = NoticeDetailResp & {
  content: string
}

export interface NoticeQuery {
  title?: string
  type?: string
  sort: Array<string>
}

export interface NoticePageQuery extends NoticeQuery, PageQuery {
}

/** 系统消息类型 */
export interface MessageResp {
  id: string
  title: string
  content: string
  type: number
  path: string
  isRead: boolean
  readTime?: string
  createdUsername?: string
  createdAt: string
}

export interface MessageQuery {
  title?: string
  type?: number
  isRead?: boolean
  sort: Array<string>
}

export interface MessagePageQuery extends MessageQuery, PageQuery {
}

/** 分片上传 - 初始化参数 */
export interface MultiPartUploadInitReq {
  fileName: string
  fileSize: number
  fileMd5: string
  parentPath: string
  metaData: Record<string, string>
}

/** 分片上传 - 初始化响应 */
export interface MultiPartUploadInitResp {
  uploadId: string
  partSize: number
  path: string
  uploadedPartNumbers: number[]
}

/** 分片上传 - 上传分片参数 */
export interface UploadPartReq {
  uploadId: string
  partNumber: number
  file: Blob
  path: string
}

/** 分片上传 - 上传分片响应 */
export interface UploadPartResp {
  /** 分片编号 */
  partNumber: number
  /** 分片ETag */
  partETag: string
  /** 分片大小 */
  partSize: number
  /** 是否成功 */
  success: boolean
  /** 错误信息 */
  errorMessage?: string
}

/** 分片上传 - 完成上传参数 */
export interface CompleteMultipartUploadReq {
  uploadId: string
  partETags: Array<{
    partNumber: number
    eTag: string
  }>
}

/** 分片上传 - 取消上传参数 */
export interface CancelUploadParams {
  uploadId: string
}
