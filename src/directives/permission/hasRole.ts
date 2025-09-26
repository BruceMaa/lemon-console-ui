import type { Directive } from 'vue'
import { useUserStore } from '@/stores'

/**
 * 检查用户角色并据此处理元素的函数
 * 使用 v-role="['admin','editor']" 来控制权限
 * @param el - 绑定指令的DOM元素
 * @param binding - 指令绑定的值，包含权限角色数组
 */
function checkRole(el: HTMLElement, binding: DirectiveBinding) {
  // 获取用户状态存储
  const userStore = useUserStore()
  // 获取指令绑定的值
  const { value } = binding
  // 定义超级管理员角色标识
  const super_admin = 'role_admin'
  // 检查绑定的值是否存在且是非空数组
  if (value && Array.isArray(value) && value.length) {
    // 将绑定的值转换为字符串数组
    const roleValues: string[] = value
    // 检查用户是否拥有所需角色之一
    const hasRole = userStore.roles.some((role: string) => {
      // 返回是否是超级管理员或拥有指定角色之一
      return super_admin === role || roleValues.includes(role)
    })
    // 如果没有所需角色
    if (!hasRole) {
      // 从父节点中移除该元素
      el.parentNode && el.parentNode.removeChild(el)
    } else {
      // 如果有角色，抛出错误提示正确用法
      throw new Error(`need roles! LIke v-hasRole="['admin', 'user]"`)
    }
  }
}

const directive: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkRole(el, binding)
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkRole(el, binding)
  },
}

export default directive
