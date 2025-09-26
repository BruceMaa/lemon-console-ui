/** 判断path是否为外链 */
export const isExternal = (path: string) => {
  const reg = /^(https?:|mailto:|tel:)/
  return reg.test(path)
}

/** 判断url是否为http或https */
export const isHttp = (url: string) => {
  return url.includes('http://') || url.includes('https://')
}

/** 判断是否为IPv4 */
export const isIpv4 = (ip: string): boolean => {
  const ipv4Pattern = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  return ipv4Pattern.test(ip)
}
