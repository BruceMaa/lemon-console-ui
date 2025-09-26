import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios, { AxiosHeaders } from 'axios'
import qs from 'query-string'
import router from '@/routers'
import { useUserStore } from '@/stores'
import { getToken } from './auth'
import messageErrorWrapper from './message-error-wrapper'
import modalErrorWrapper from './modal-error-wrapper'
import notificationErrorWrapper from './notification-error-wrapper'

interface ICodeMessage {
  [propName: number]: string
}

const StatusCodeMessage: ICodeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功',
  400: '请求错误(400)',
  401: '未授权，请重新登录(401)',
  403: '拒绝访问(403)',
  404: '请求出错(404)',
  408: '请求超时(408)',
  500: '服务器错误(500)',
  501: '服务未实现(501)',
  502: '网络错误(502)',
  503: '服务不可用(503)',
  504: '网络超时(504)',
}

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_PREFIX ?? import.meta.env.VITE_API_BASE_URL,
  timeout: 30 * 1000,
})

const handleError = (msg: string) => {
  if (msg.length >= 15) {
    return notificationErrorWrapper({
      content: msg || '服务器端错误',
      duration: 5 * 1000,
    })
  }
  return messageErrorWrapper({
    content: msg || '服务器端错误',
    duration: 5 * 1000,
  })
}

// 请求拦截器
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response
    const { success, code, msg } = data

    if (response.request.responseType === 'blob') {
      const contentType = data.type
      if (contentType.startsWith('application/json')) {
        const reader = new FileReader()
        reader.readAsText(data)
        reader.onload = () => {
          const { success, msg } = JSON.parse(reader.result as string)
          if (!success) {
            handleError(msg)
          }
        }
        return Promise.reject(msg)
      } else {
        return response
      }
    }

    if (success) {
      return response
    }

    // Token失效
    if (code === '401' && response.config.url !== '/auth/user/info') {
      modalErrorWrapper({
        title: '提示',
        content: msg,
        maskClosable: false,
        escToClose: false,
        okText: '重新登录',
        async onOk() {
          const userStore = useUserStore()
          await userStore.logoutCallBack()
          const currentPath = router.currentRoute.value.fullPath
          await router.replace(`/login?redirect=${encodeURIComponent(currentPath)}`)
        },
      })
    } else {
      handleError(msg)
    }
    return Promise.reject(new Error(msg || '服务器端错误'))
  },
  (error: AxiosError) => {
    if (!error.response) {
      handleError('连接失败，检查您的网络')
      return Promise.reject(error)
    }
    const status = error.response?.status
    const errorMsg = StatusCodeMessage[status] || '服务器暂未响应，请刷新页面并重试。若无法解决，请联系管理员'
    handleError(errorMsg)
    return Promise.reject(error)
  },
)

const request = async <T = unknown>(config: InternalAxiosRequestConfig): Promise<ApiRes<T>> => {
  return http.request<T>(config)
    .then((res: AxiosResponse) => res.data)
    .catch((err: { msg: string }) => Promise.reject(err))
}

const requestNative = async <T = unknown>(config: InternalAxiosRequestConfig): Promise<AxiosResponse> => {
  return http.request<T>(config)
    .then((res: AxiosResponse) => res)
    .catch((err: { msg: string }) => Promise.reject(err))
}

const createRequest = (method: string) => {
  return <T = any>(url: string, params?: object, config?: InternalAxiosRequestConfig): Promise<ApiRes<T>> => {
    // 确保headers始终是一个AxiosHeaders实例
    const headers = config?.headers instanceof AxiosHeaders
      ? config.headers
      : new AxiosHeaders(config?.headers)

    // 构造请求配置对象
    const requestConfig: InternalAxiosRequestConfig = {
      method,
      url,
      headers,
      ...(method === 'get' ? { params, paramsSerializer: (obj) => qs.stringify(obj) } : { data: params }),
      ...(config ? { ...config, headers } : {}),
    }

    return request(requestConfig)
  }
}

const download = (url: string, params?: object, config?: InternalAxiosRequestConfig): Promise<AxiosResponse> => {
  // 确保headers始终是一个AxiosHeaders实例
  const headers = config?.headers instanceof AxiosHeaders
    ? config.headers
    : new AxiosHeaders(config?.headers)
    // 构造请求配置对象
  const requestConfig: InternalAxiosRequestConfig = {
    method: 'get',
    url,
    headers,
    responseType: 'blob',
    params,
    paramsSerializer: (obj) => qs.stringify(obj),
    ...(config ? { ...config, headers } : {}),
  }
  return requestNative(requestConfig)
}

export default {
  get: createRequest('get'),
  post: createRequest('post'),
  put: createRequest('put'),
  patch: createRequest('patch'),
  del: createRequest('delete'),
  request,
  requestNative,
  download,
}
