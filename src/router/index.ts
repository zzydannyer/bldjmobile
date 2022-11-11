import { readonly, DeepReadonly } from 'vue'
import pages from './pages'
import { Details } from './types'

type PageNames = keyof typeof pages

type ObjectType<T> = T extends Details ? Details : never

const routeStore = {} as Record<PageNames, unknown>

//路由跳转
let navigateLock = false

export const navigate = <T extends PageNames>(
  page: T,
  params: ObjectType<T>,
): Promise<any> | undefined => {
  if (navigateLock) return

  navigateLock = true

  const eventName = Math.floor(Math.random() * 1000) + new Date().getTime() + '' // 生成唯一事件名

  routeStore[page] = params

  uni.navigateTo({
    url: `${pages[page]}?eventName=${eventName}`,
    complete() {
      navigateLock = false
    },
  })

  return new Promise<any>(
    (resolve, reject) => (
      uni.$once(eventName, resolve), uni.$once(eventName, reject)
    ),
  )
}

//重定向
export const redirect = <T extends PageNames>(
  page: T,
  params?: ObjectType<T>,
) => {
  routeStore[page] = params
  uni.redirectTo({ url: pages[page] })
}

//刷新
export const reLaunch = <T extends PageNames>(
  page: T,
  params?: ObjectType<T>,
) => {
  routeStore[page] = params
  uni.reLaunch({ url: pages[page] })
}

//切换tab
export const switchTab = <T extends PageNames>(
  page: T,
  params?: ObjectType<T>,
) => {
  routeStore[page] = params
  uni.switchTab({ url: pages[page] })
}

interface BackParams {
  /** 返回页面层级 */
  delta?: number
  /** 返回携带的数据 */
  data?: any
}

const back = ({ delta, data }: BackParams = { delta: 1, data: null }) => {
  // 获取当前路由信息
  const currentRoute = getCurrentPages().pop() as any
  // 拿到路由事件名参数
  const eventName = currentRoute.options.eventName
  uni.$emit(eventName, data)
  uni.navigateBack({
    delta,
  })
}

//路由传参
export const getRouteParams = <T extends PageNames>(
  page: T,
): DeepReadonly<ObjectType<T>> => {
  const p = routeStore[page] as ObjectType<T>
  return readonly(p) as DeepReadonly<ObjectType<T>>
}

const router = {
  navigate,
  redirect,
  reLaunch,
  switchTab,
  back,
}

export default router
