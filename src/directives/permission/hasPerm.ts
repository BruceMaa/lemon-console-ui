import type { Directive, DirectiveBinding } from 'vue'
import { useUserStore } from '@/stores'

/**
 * 检查元素权限的自定义指令函数
 * 使用 v-permission="['system:users:create']" 指令
 * @param el - 绑定指令的DOM元素
 * @param binding - 指令绑定对象，包含指令的值等
 */
function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  // 获取用户状态存储
  const userStore = useUserStore()
  // 获取指令绑定的值
  const { value } = binding
  // 定义所有权限的标识符
  const all_permission = '*:*:*'

  // 检查权限值是否存在且为数组且数组长度大于0
  if (value && Array.isArray(value) && value.length) {
    // 将权限值转换为字符串数组
    const permissionValues: string[] = value
    // 检查用户是否具有所需权限
    const hasPermission = userStore.permissions.some((perm: string) => {
      // 如果用户拥有所有权限，或者权限值数组中包含用户的某个权限，则返回true
      return all_permission === perm || permissionValues.includes(perm)
    })
    // 如果用户没有权限，则从DOM中移除该元素
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    // 如果权限值无效，抛出错误提示
    throw new Error(`need permissions! Like v-hasPerm="['home:btn:edit','home:btn:delete']"`)
  }
}

const directive: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  },
}

export default directive
