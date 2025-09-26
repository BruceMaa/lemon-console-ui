import type { AccountLoginReq, UserInfo } from '@/apis'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { accountLogin as accountLoginApi, getUserInfo as getUserInfoApi, logout as logoutApi } from '@/apis'

import { resetRouter } from '@/routers'
import { resetHasRouteFlag } from '@/routers/guard'
import { clearToken, getToken, setToken } from '@/utils/auth'

const storeSetup = () => {
  const userInfo = reactive<UserInfo>({
    id: '',
    username: '',
    nickname: '',
    gender: 0,
    email: '',
    phone: '',
    avatar: '',
    pwdResetTime: '',
    pwdExpired: false,
    registrationDate: '',
    deptName: '',
    roles: [],
    roleNames: [],
    permissions: [],
  })
  const nickname = computed(() => userInfo.nickname)
  const username = computed(() => userInfo.username)
  const avatar = computed(() => userInfo.avatar)

  const token = ref(getToken() || '')
  const pwdExpiredShow = ref<boolean>(true)
  const roles = ref<string[]>([]) // 当前用户角色
  const permissions = ref<string[]>([]) // 当前用户权限标识集合
  // 重置token
  const resetToken = () => {
    token.value = ''
    clearToken()
    resetHasRouteFlag()
  }

  // 登录
  const accountLogin = async (req: AccountLoginReq) => {
    const res = await accountLoginApi({ ...req, clientId: import.meta.env.VITE_CLIENT_ID })
    setToken(res.data.token)
    token.value = res.data.token
  }

  // 退出登录回调
  const logoutCallBack = async () => {
    roles.value = []
    permissions.value = []
    pwdExpiredShow.value = true
    resetToken()
    resetRouter()
  }

  // 退出登录
  const logout = async () => {
    try {
      await logoutApi()
      await logoutCallBack()
      return true
    } catch (error) {
      console.error('Logout failed:', error)
      return false
    }
  }

  // 获取用户信息
  const getUserInfo = async () => {
    const res = await getUserInfoApi()
    Object.assign(userInfo, res.data)
    // FIXME 先注掉，看看是否有影响
    // userInfo.avatar = res.data.avatar
    if (res.data.roles && res.data.roles.length) {
      roles.value = res.data.roles
      permissions.value = res.data.permissions
    }
  }

  return {
    userInfo,
    nickname,
    username,
    avatar,
    token,
    roles,
    permissions,
    pwdExpiredShow,
    accountLogin,
    logout,
    logoutCallBack,
    getUserInfo,
    resetToken,
  }
}

export const useUserStore = defineStore('user', storeSetup, {
  persist: { pick: ['token', 'roles', 'permissions', 'pwdExpiredShow'], storage: localStorage },
})
