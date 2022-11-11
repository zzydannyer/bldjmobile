import * as UserModel from './model'
import prerequest from '@/utils/request'

class UserService {
  // 获取列表
  static getList(params: UserModel.GetUserListParam) {
    return prerequest.post<UserModel.GetUserListRes>('/list', { params })
  }
}

export default UserService
