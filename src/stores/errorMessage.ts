import { defineStore } from 'pinia'

export const useErrorMessageStore = defineStore({
  id: 'errorMessageStore',
  state: () => ({
    msg: ''
  }),
  getters: {
    getMsg: (state) => state.msg
  },
  actions: {
    setMsg(newToken: string) {
      this.msg = newToken
    }
  }
})