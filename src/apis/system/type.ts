import type { AuthType, DataScopeType, Gender, MenuType, Status, StorageType } from '@/enums'
import type { BaseDetailResp, BaseResp } from '@/types/global'

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
/**
 * UserReq，用户创建或修改请求参数
 */
export interface UserReq {
  /**
   * 所属部门
   */
  deptId: number
  /**
   * 描述
   */
  description?: string
  /**
   * 邮箱
   */
  email?: string
  /**
   * 性别<span style='color:red'>{0=未知, 1=男, 2=女}</span>
   */
  gender: Gender
  /**
   * 昵称
   */
  nickname: string
  /**
   * 密码
   */
  password: string
  /**
   * 手机号
   */
  phone?: string
  /**
   * 所属角色
   */
  roleIds: number[]
  /**
   * 状态<span style='color:red'>{1=启用, 0=禁用}</span>
   */
  status?: Status
  /**
   * 用户名
   */
  username: string
}
/**
 * UserResp
 *
 * BaseDetailResp
 *
 * BaseResp
 *
 * 详情响应参数基类
 */
export interface UserResp extends BaseDetailResp {
  /**
   * 头像地址
   */
  avatar?: string
  /**
   * 部门 ID
   */
  deptId?: number
  /**
   * 所属部门
   */
  deptName?: string
  /**
   * 描述
   */
  description?: string
  /**
   * 邮箱
   */
  email?: string
  /**
   * 性别<span style='color:red'>{0=未知, 1=男, 2=女}</span>
   */
  gender?: Gender
  /**
   * 是否为系统内置数据
   */
  isSystem?: boolean
  /**
   * 昵称
   */
  nickname?: string
  /**
   * 手机号码
   */
  phone?: string
  /**
   * 角色 ID 列表
   */
  roleIds?: number[]
  /**
   * 角色名称列表
   */
  roleNames?: string[]
  /**
   * 状态<span style='color:red'>{1=启用, 0=禁用}</span>
   */
  status?: Status
  /**
   * 用户名
   */
  username?: string
}
export interface UserDetailResp extends UserResp {
  pwdResetTime?: string
}

export interface UserQuery {
  description?: string
  status?: Status
  createdAt?: Array<string>
  deptId?: string
  sort: Array<string>
  userIds?: Array<string>
  roleId?: string
}
export interface UserPageQuery extends UserQuery, PageQuery {}
/**
 * UserImportParseResp，用户导入解析响应参数
 */
export interface UserImportParseResp {
  /**
   * 重复邮箱行数
   */
  duplicateEmailRows?: number
  /**
   * 重复手机行数
   */
  duplicatePhoneRows?: number
  /**
   * 重复行数
   */
  duplicateUserRows?: number
  /**
   * 导入会话Key
   */
  importKey?: string
  /**
   * 总计行数
   */
  totalRows?: number
  /**
   * 有效行数
   */
  validRows?: number
}
/**
 * UserImportReq，用户导入请求参数
 */
export interface UserImportReq {
  /**
   * 默认状态<span style='color:red'>{1=启用, 0=禁用}</span>
   */
  defaultStatus?: Status
  /**
   * 重复邮箱策略<span style='color:red'>{1=跳过该行, 2=修改数据, 3=停止导入}</span>
   */
  duplicateEmail: number
  /**
   * 重复手机策略<span style='color:red'>{1=跳过该行, 2=修改数据, 3=停止导入}</span>
   */
  duplicatePhone: number
  /**
   * 重复用户策略<span style='color:red'>{1=跳过该行, 2=修改数据, 3=停止导入}</span>
   */
  duplicateUser: number
  /**
   * 导入会话KEY
   */
  importKey: string
}
/**
 * UserImportResp，用户导入结果响应参数
 */
export interface UserImportResp {
  /**
   * 新增行数
   */
  insertRows?: number
  /**
   * 总计行数
   */
  totalRows?: number
  /**
   * 修改行数
   */
  updateRows?: number
}

/** 角色类型 */
export interface RoleReq {
  /**
   * 编码
   */
  code: string
  /**
   * 数据权限<span style='color:red'>{1=全部数据权限, 2=本部门及以下数据权限, 3=本部门数据权限, 4=仅本人数据权限,
   * 5=自定义数据权限}</span>
   */
  dataScope?: DataScopeType
  /**
   * 部门选择是否父子节点关联
   */
  deptCheckStrictly?: boolean
  /**
   * 权限范围：部门 ID 列表
   */
  deptIds?: number[]
  /**
   * 描述
   */
  description?: string
  /**
   * 名称
   */
  name: string
  /**
   * 排序
   */
  sort?: number
}
export interface RolePermissionUpdateReq {
  /**
   * 菜单选择是否父子节点关联
   */
  menuCheckStrictly?: boolean
  /**
   * 功能权限：菜单 ID 列表
   */
  menuIds?: (string | number)[]
  /**
   * 角色 ID
   */
  roleId?: number
}
export interface RoleResp extends BaseDetailResp {
  /**
   * 编码，编码
   */
  code?: string
  /**
   * 数据权限，数据权限
   */
  dataScope?: DataScopeType
  /**
   * 描述，描述
   */
  description?: string
  /**
   * 是否为系统内置数据，是否为系统内置数据
   */
  isSystem?: boolean
  /**
   * 名称，名称
   */
  name?: string
  /**
   * 排序，排序
   */
  sort?: number
}
export interface RoleDetailResp extends RoleResp {
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
}
export interface RoleUserResp {
  /**
   * 部门 ID
   */
  deptId?: number
  /**
   * 所属部门
   */
  deptName?: string
  /**
   * 描述
   */
  description?: string
  disabled?: boolean
  /**
   * 性别<span style='color:red'>{0=未知, 1=男, 2=女}</span>
   */
  gender?: Gender
  /**
   * ID
   */
  id?: number
  /**
   * 是否为系统内置数据
   */
  isSystem?: boolean
  /**
   * 昵称
   */
  nickname?: string
  /**
   * 角色 ID
   */
  roleId?: number
  /**
   * 角色 ID 列表
   */
  roleIds?: number[]
  /**
   * 角色名称列表
   */
  roleNames?: string[]
  /**
   * 状态<span style='color:red'>{1=启用, 0=禁用}</span>
   */
  status?: Status
  /**
   * 用户 ID
   */
  userId?: number
  /**
   * 用户名
   */
  username?: string
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
export interface MenuReq {
  /**
   * 组件路径
   */
  component?: string
  /**
   * 图标
   */
  icon?: string
  /**
   * 是否缓存
   */
  isCache?: boolean
  /**
   * 是否外链
   */
  isExternal?: boolean
  /**
   * 是否隐藏
   */
  isHidden?: boolean
  /**
   * 组件名称
   */
  name?: string
  /**
   * 上级菜单 ID
   */
  parentId?: number
  /**
   * 路由地址
   */
  path?: string
  /**
   * 权限标识
   */
  permission?: string
  /**
   * 重定向地址
   */
  redirect?: string
  /**
   * 排序
   */
  sort: number
  /**
   * 状态<span style='color:red'>{1=启用, 0=禁用}</span>
   */
  status: Status
  /**
   * 标题
   */
  title: string
  /**
   * 类型<span style='color:red'>{1=目录, 2=菜单, 3=按钮}</span>
   */
  type: MenuType
}

/**
 * 菜单树列表响应参数
 */
export interface MenuTreeResp extends MenuResp {
  children: MenuTreeResp[]
}
export interface MenuResp extends BaseDetailResp {
  /**
   * 组件路径
   */
  component?: string
  /**
   * 图标
   */
  icon?: string
  /**
   * 是否缓存
   */
  isCache?: boolean
  /**
   * 是否外链
   */
  isExternal?: boolean
  /**
   * 是否隐藏
   */
  isHidden?: boolean
  /**
   * 组件名称
   */
  name?: string
  /**
   * 上级菜单 ID
   */
  parentId?: number
  /**
   * 路由地址
   */
  path?: string
  /**
   * 权限标识
   */
  permission?: string
  /**
   * 重定向地址
   */
  redirect?: string
  /**
   * 排序
   */
  sort?: number
  /**
   * 状态<span style='color:red'>{1=启用, 0=禁用}</span>
   */
  status?: Status
  /**
   * 标题
   */
  title?: string
  /**
   * 类型<span style='color:red'>{1=目录, 2=菜单, 3=按钮}</span>
   */
  type: MenuType
}
export interface MenuQuery {
  title?: string
  status?: Status
}

/** 部门类型 */
export interface DeptReq {
  /**
   * 描述
   */
  description?: string
  /**
   * 名称
   */
  name: string
  /**
   * 上级部门 ID
   */
  parentId: number
  /**
   * 排序
   */
  sort?: number
  /**
   * 状态<span style='color:red'>{1=启用, 0=禁用}</span>
   */
  status?: Status
}
export interface DeptResp extends BaseDetailResp {
  /**
   * 描述，描述
   */
  description?: string
  /**
   * 是否为系统内置数据，是否为系统内置数据
   */
  isSystem?: boolean
  /**
   * 名称，名称
   */
  name?: string
  /**
   * 上级部门ID，上级部门ID
   */
  parentId?: number
  /**
   * 排序，排序
   */
  sort?: number
  /**
   * 状态，状态：1=启用，0=禁用
   */
  status?: Status
}
export interface DeptTreeResp extends DeptResp {
  children: DeptTreeResp[]
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

/**
 * FileStatisticsResp，文件资源统计响应参数
 */
export interface FileStatisticsResp {
  /**
   * 分类数据
   */
  data?: FileStatisticsResp[]
  unit?: string
  /**
   * 数量
   */
  number: number
  /**
   * 大小（字节）
   */
  size: number
  /**
   * 类型<span style='color:red'>{0=目录, 1=其他, 2=图片, 3=文档, 4=视频, 5=音频}</span>
   */
  type?: number
}

export interface FileQuery {
  originalName?: string
  parentPath?: string
  type?: number
  sort: Array<string>
}

export interface FilePageQuery extends FileQuery, PageQuery {}

/**
 * FileResp，文件响应参数
 */
export interface FileResp {
  /**
   * 创建时间，创建时间
   */
  createdAt?: Date
  /**
   * 创建者名称，创建者名称
   */
  createdUsername?: string
  /**
   * 是否禁用修改，是否禁用修改
   */
  disabled?: boolean
  /**
   * 主键ID，主键ID
   */
  id: string
  /**
   * 更新时间，更新时间
   */
  modifiedAt?: Date
  /**
   * 更新者名称，更新者名称
   */
  modifiedUsername?: string
  /**
   * 内容类型
   */
  contentType?: string
  /**
   * 扩展名
   */
  extension: string
  /**
   * 元数据
   */
  metadata?: string
  /**
   * 名称
   */
  name?: string
  /**
   * 原始名称
   */
  originalName?: string
  /**
   * 上级目录
   */
  parentPath?: string
  /**
   * 路径
   */
  path?: string
  /**
   * SHA256 值
   */
  sha256?: string
  /**
   * 大小（字节）
   */
  size: number
  /**
   * 存储 ID
   */
  storageId?: number
  /**
   * 存储名称
   */
  storageName?: string
  /**
   * 缩略图文件元数据
   */
  thumbnailMetadata?: string
  /**
   * 缩略图名称
   */
  thumbnailName?: string
  /**
   * 缩略图大小（字节)
   */
  thumbnailSize?: number
  /**
   * 缩略图 URL
   */
  thumbnailUrl?: string
  /**
   * 类型<span style='color:red'>{0=目录, 1=其他, 2=图片, 3=文档, 4=视频, 5=音频}</span>
   */
  type?: number
  /**
   * URL
   */
  url: string
}
/**
 * FileReq，文件修改请求参数
 */
export interface FileReq {
  /**
   * 名称
   */
  originalName: string
  /**
   * 上级目录
   */
  parentPath?: string
}
/**
 * FileUploadResp，文件上传响应参数
 */
export interface FileUploadResp {
  /**
   * 文件 id
   */
  id?: string
  /**
   * 元数据
   */
  metadata?: { [key: string]: string }
  /**
   * 缩略图文件 URL
   */
  thUrl?: string
  /**
   * 文件 URL
   */
  url?: string
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
