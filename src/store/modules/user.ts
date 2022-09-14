import { defineStore } from 'pinia';
export const useUserStore = defineStore('user', {
	state: () => ({
		user: '测试用户',
		counter: 0
	}),

	getters: {
		doubleCount: state => state.counter * 2,
		getUser: state => ({ id: 1, user: state.user })
	},
	actions: {
		changeVal() {
			this.counter += 100
			this.user = this.user + this.counter
		},
		async login() {
			try {
				setTimeout(() => {
					console.log('登陆成功')
				}, 2000)
			} catch (e) {
				//TODO handle the exception
			}
		}
	}
});
