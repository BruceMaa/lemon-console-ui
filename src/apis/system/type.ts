import type { AuthType, Gender, MenuType, Status, StorageType } from '@/enums'
import type { BaseDetailResp } from '@/types/global'

/** 字典类型 */
export interface DictReq {
  name: string
  code: string
  description: string
}
export interface DictResp extends BaseDetailResp {
  name: string
  code: string
  isSystem: boolean
  description: string
}
export interface DictQuery {
  description?: string
  sort: Array<string>
}
export interface DictItemReq {
  label: string
  value: string
  color: string
  sort: number
  description: string
  status: Status
  dictId: number
}
export interface DictItemResp extends BaseDetailResp {
  label: string
  value: string
  color: string
  sort: number
  description: string
  status: Status
  dictId: number
}
export interface DictItemQuery {
  description?: string
  status?: Status
  sort: Array<string>
  dictId: string
}
export interface DictItemPageQuery extends DictItemQuery, PageQuery {
}

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

/** 菜单类型 */
export interface MenuResp {
  id: string
  title: string
  parentId: string
  type: MenuType
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

/** 存储类型 */
export interface StorageReq {
  /**
   * Access Key
   */
  accessKey?: string
  /**
   * Bucket/存储路径
   */
  bucketName?: string
  /**
   * 编码
   */
  code: string
  /**
   * 描述
   */
  description?: string
  /**
   * 域名/访问路径
   */
  domain: string
  /**
   * Endpoint
   */
  endpoint?: string
  /**
   * 名称
   */
  name: string
  /**
   * Secret Key
   */
  secretKey?: string
  /**
   * 排序
   */
  sort?: number
  /**
   * 状态<span style='color:red'>{1=启用, 0=禁用}</span>
   */
  status?: Status
  /**
   * 类型<span style='color:red'>{1=本地存储, 2=对象存储}</span>
   */
  type: number
}
export interface StorageResp extends BaseDetailResp {
  name: string
  code: string
  type: StorageType
  accessKey: string
  secretKey: string
  endpoint: string
  bucketName: string
  domain: string
  description: string
  isDefault: boolean
  sort: number
  status: Status
}

export interface StorageQuery {
  description?: string
  type?: number | string
  sort: Array<string>
}

/** 客户端类型 */

export interface ClientReq {
  clientType: string
  authType: AuthType[]
  activeTimeout: number
  timeout: number
  status: Status
}
export interface ClientResp extends BaseDetailResp {
  clientId: string
  clientType: string
  authType: AuthType
  activeTimeout: string
  timeout: string
  status: Status
}
export interface ClientDetailResp extends ClientResp {
}
export interface ClientQuery {
  clientType: string
  status: null | Status
  sort: Array<string>
}
export interface ClientPageQuery extends ClientQuery, PageQuery {}

/** 系统参数类型 */
export interface OptionResp {
  id: string
  name: string
  code: string
  value: string
  description: string
}

export interface OptionQuery {
  code?: Array<string>
  category?: string
}

/** 基础配置类型 */
export interface BasicConfig {
  SITE_FAVICON: string
  SITE_LOGO: string
  SITE_TITLE: string
  SITE_COPYRIGHT: string
  SITE_BEIAN: string
}

/** 网站配置类型 */
export interface SiteConfig {
  SITE_FAVICON: OptionResp
  SITE_LOGO: OptionResp
  SITE_TITLE: OptionResp
  SITE_DESCRIPTION: OptionResp
  SITE_COPYRIGHT: OptionResp
  SITE_BEIAN: OptionResp
}

/** 安全配置类型 */
export interface SecurityConfig {
  PASSWORD_ERROR_LOCK_COUNT: OptionResp
  PASSWORD_ERROR_LOCK_MINUTES: OptionResp
  PASSWORD_EXPIRATION_DAYS: OptionResp
  PASSWORD_EXPIRATION_WARNING_DAYS: OptionResp
  PASSWORD_REPETITION_TIMES: OptionResp
  PASSWORD_MIN_LENGTH: OptionResp
  PASSWORD_ALLOW_CONTAIN_USERNAME: OptionResp
  PASSWORD_REQUIRE_SYMBOLS: OptionResp
}

/** 邮箱配置类型 */
export interface MailConfig {
  MAIL_PROTOCOL: OptionResp
  MAIL_HOST: OptionResp
  MAIL_PORT: OptionResp
  MAIL_USERNAME: OptionResp
  MAIL_PASSWORD: OptionResp
  MAIL_SSL_ENABLED: OptionResp
  MAIL_SSL_PORT: OptionResp
}

/** 登录配置类型 */
export interface LoginConfig {
  LOGIN_CAPTCHA_ENABLED: OptionResp
}
