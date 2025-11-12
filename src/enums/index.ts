/** 状态（1： 启用；0： 禁用） */
export type Status = 1 | 0

/** 性别（1： 男；2： 女； 0： 未知） */
export type Gender = 1 | 2 | 0

/** 菜单类型 */
export type MenuType = 1 | 2 | 3

/** 认证类型 */
export type AuthType = 'ACCOUNT' | 'PHONE' | 'EMAIL'

/** 存储类型 */
export type StorageType = 1 | 2

/**
 * 数据范围类型
 */
export type DataScopeType = 1 | 2 | 3 | 4 | 5

/** 公告状态 */
export type NoticeStatus = 1 | 2 | 3

/**
 * 通知范围(1.所有人 2.指定用户)<span style='color:red'>{1=所有人, 2=指定用户}</span>
 */
export type NoticeScope = 1 | 2

/** 通知方式 */
export type NoticeMethod = 1 | 2

/**
 * 类型<span style='color:red'>{1=系统消息, 2=安全消息}</span>
 */
export type MessageType = 1 | 2
