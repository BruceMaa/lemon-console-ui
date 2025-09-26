import type { RouteRecordRaw } from 'vue-router'
import type { RouteItem } from '@/apis'
import { cloneDeep, omit } from 'lodash-es'
import { defineStore } from 'pinia'
import { mapTree, toTreeArray } from 'xe-utils'
import { getUserRoute } from '@/apis'
import { asyncRouteModules } from '@/routers/asyncModules'
import { constantRoutes, systemRoutes } from '@/routers/route'
import { transformPathToName } from '@/utils'

const layoutComponentMap = {
  Layout: () => import('@/layouts/index.vue'),
  ParentView: () => import('@/components/ParentView/index.vue'),
}

/**
 * 将component由字符串转成真正的模块
 */
const transformComponentView = (component: string) => {
  return layoutComponentMap[component as keyof typeof layoutComponentMap] || asyncRouteModules[component]
}

/**
 * 将菜单排序，格式化
 * 同时将component由字符串转换成真正的模块
 */
const formatAsyncRoutes = (menus: RouteItem[]) => {
  if (!menus.length) return []

  const pathMap = new Map()
  return mapTree(menus, (item) => {
    pathMap.set(item.id, item.path)

    if (item.children?.length) {
      item.children.sort((a, b) => (a?.sort ?? 0) - (b?.sort ?? 0))
    }

    // 部分子菜单，例如：通知公告新增、查看详情，需要选中其父菜单
    if (item.parentId && item.type === 2 && item.permission) {
      item.activeMenu = pathMap.get(item.parentId)
    }

    return {
      path: item.path,
      name: item.name ?? transformPathToName(item.path),
      component: transformComponentView(item.component),
      redirect: item.redirect,
      meta: {
        title: item.title,
        hidden: item.isHidden,
        keepAlive: item.isCache,
        icon: item.icon,
        showInTabs: item.showInTabs,
        activeMenu: item.activeMenu,
      },
    }
  }) as unknown as RouteRecordRaw[]
}

/** 判断路由层级是否大于 2 */
export const isMultipleRoute = (route: RouteRecordRaw) => {
  return route.children?.some((child) => child.children?.length) ?? false
}

/** 路由降级（把三级及其以上的路由转化为二级路由） */
export const flatMultiLevelRoutes = (routes: RouteRecordRaw[]) => {
  return cloneDeep(routes).map((route) => {
    if (!isMultipleRoute(route)) return route

    return {
      ...route,
      children: toTreeArray(route.children).map((item) => omit(item, 'children')) as RouteRecordRaw[],
    }
  })
}

const routeStoreSetup = () => {
  // 所有路由(常驻路由 + 动态路由)
  const routes = ref<RouteRecordRaw[]>([])
  // 动态路由(异步路由)
  const asyncRoutes = ref<RouteRecordRaw[]>([])

  // 合并路由
  const setRoutes = (data: RouteRecordRaw[]) => {
    // 合并路由并排序
    routes.value = [...constantRoutes, ...systemRoutes].concat(data).sort((a, b) => (a.meta?.sort ?? 0) - (b.meta?.sort ?? 0))
    asyncRoutes.value = data
  }

  // 生成路由
  const generateRoutes = async (): Promise<RouteRecordRaw[]> => {
    const { data } = await getUserRoute()
    const asyncRoutes = formatAsyncRoutes(data)
    const flatRoutes = flatMultiLevelRoutes(cloneDeep(asyncRoutes))
    setRoutes(asyncRoutes)
    return flatRoutes
  }

  return {
    routes,
    asyncRoutes,
    generateRoutes,
  }
}

export const useRouteStore = defineStore('route', routeStoreSetup, { persist: true })
