import type { ITokenStore } from '@/models/IToken'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore({
  id: 'tokenStore',
  state: () => ({
    token: {
      token: null,
      exp: 0
    } as ITokenStore
  }),
  getters: {
    getToken: (state) => state.token
  },
  actions: {
    setToken(newToken: ITokenStore) {
      this.token = newToken
    }
  }
})