import { ApiRes } from './types'

export interface GetUserListParam {
  position: number
}

export interface GetUserListRes extends ApiRes {
  data: GetUserListData[]
}

export interface GetUserListData {
  name: string
  position: number
}
