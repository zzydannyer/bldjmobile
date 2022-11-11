import { defineStore } from 'pinia'
import { LoginStates } from './types'

export const useUserStore = defineStore('user', {
  state: (): LoginStates => ({
    user: '测试用户',
    counter: 0,
    token: '',
  }),
  getters: {
    getUserInfo: (state) => ({ id: 1, user: state.user }),
  },
  actions: {
    changeVal() {
      this.counter += 1
    },
    async login() {
      try {
        setTimeout(() => {
          console.log('登陆成功')
        }, 2000)
      } catch (e) {
        //TODO handle the exception
      }
    },
  },
})
