/** 图形验证码类型 */
export interface ImageCaptchaResp {
  captchaKey: string
  img: string
  expireTime: number
  isEnabled: boolean
}

/** 仪表盘公告类型 */
export interface DashboardNoticeResp {
  id: number
  title: string
  type: number
  isTop: boolean
}
