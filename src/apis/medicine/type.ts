import type { BaseDetailResp, BaseResp } from '@/types/global'

/**
 * 药品基本信息创建或修改请求参数
 */
export interface MedicineInfoReq {
  /**
   * 活性成分列表
   */
  activeIngredients?: string[]
  /**
   * 不良反应
   */
  adverseReactions?: string
  /**
   * 药品性状，颜色、形状等
   */
  appearance?: string
  /**
   * 药品唯一标识符
   */
  code: string
  /**
   * 禁忌症
   */
  contraindications?: string
  /**
   * 用法用量
   */
  dosage?: string
  /**
   * 剂型
   */
  dosageForm: string
  /**
   * 药物相互作用
   */
  drugInteractions?: string
  /**
   * 药品英文名称
   */
  englishName?: string
  /**
   * 辅料 / 非活性成分列表
   */
  excipients?: string[]
  /**
   * 药品通用名称，中文
   */
  genericName: string
  /**
   * 适应症
   */
  indications?: string
  /**
   * 包装规格
   */
  packageSpec?: string
  /**
   * 药代动力学
   */
  pharmacokinetics?: string
  /**
   * 药理毒理
   */
  pharmacology?: string
  /**
   * 中文拼音
   */
  pinyin?: string
  /**
   * 注意事项
   */
  precautions?: string
  /**
   * 给药途径
   */
  routeOfAdministration?: string[]
  /**
   * 规格
   */
  spec: string
  /**
   * 规格单位
   */
  specUnit: string
  /**
   * 存储条件
   */
  storageConditions: string
  /**
   * 治疗类别
   */
  therapeuticCategories?: string[]
  /**
   * 有效期
   */
  validityPeriod: string
}

/**
 * 药品基本信息响应参数
 */
export interface MedicineInfoResp extends BaseResp {
  /**
   * 药品性状，颜色、形状等
   */
  appearance?: string
  /**
   * 药品唯一标识符
   */
  code: string
  /**
   * 剂型
   */
  dosageForm: string
  /**
   * 药品英文名称
   */
  englishName?: string
  /**
   * 药品通用名称，中文
   */
  genericName: string
  /**
   * 包装规格
   */
  packageSpec?: string
  /**
   * 中文拼音
   */
  pinyin?: string
  /**
   * 规格
   */
  spec: string
  /**
   * 规格单位
   */
  specUnit: string
  /**
   * 存储条件
   */
  storageConditions: string
  /**
   * 有效期
   */
  validityPeriod: string
}

/**
 * 药品基本信息详情响应参数
 */
export interface MedicineInfoDetailResp extends BaseDetailResp, MedicineInfoReq {
}

/** 药品基本信息查询条件 */
export interface MedicineInfoQuery {
  info?: string
  sort: string[]
}

export interface MedicineInfoPageQuery extends MedicineInfoQuery, PageQuery {

}
