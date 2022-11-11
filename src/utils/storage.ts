import { ref, Ref, watch } from 'vue'
interface Company {
  companyName: string
  companyId: number
}

type StorageKeys = 'company' | 'companyList'

type ObjectType<T> = T extends 'company'
  ? Company
  : T extends 'companyList'
  ? Company[]
  : never

export const setStorage = <T extends StorageKeys>(
  key: T,
  data: ObjectType<T>,
): void => {
  uni.setStorageSync(key, data)
}

export const getStorage = <T extends StorageKeys>(
  key: T,
  initValue: any = '',
): ObjectType<T> => {
  const data = uni.getStorageSync(key) || initValue
  return data as ObjectType<T>
}

export const getStorageRef = <T extends StorageKeys>(
  key: T,
  initValue: any = '',
): Ref<ObjectType<T>> => {
  const data = uni.getStorageSync(key) || initValue
  const result = ref(data)
  watch(result.value, () => {
    setStorage(key, result.value)
  })
  return result as Ref<ObjectType<T>>
}
