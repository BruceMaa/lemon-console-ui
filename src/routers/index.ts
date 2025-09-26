import { createRouter, createWebHistory } from 'vue-router'
import { useRouteStore } from '@/stores'
import { setupRouterGuard } from './guard'
import { constantRoutes, systemRoutes } from './route'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...constantRoutes, ...systemRoutes],
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

setupRouterGuard(router)

/**
 * 重置路由
 * 注意：所有动态路由必须带有name属性，否则可能会不能完全重置干净
 */
export function resetRouter() {
  try {
    const routeStore = useRouteStore()
    routeStore.asyncRoutes.forEach((route) => {
      const { name } = route
      if (name) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}

export default router
