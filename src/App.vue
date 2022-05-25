<template>
  <RouterView />
</template>

<script lang="ts">
import { RouterView } from 'vue-router'
import { defineComponent } from 'vue'
import { useTokenStore } from './stores/token';
import { KEY_STORAGE } from '../src/utils/Constant'
import router from './router';
import type { ITokenStore } from './models/IToken';

export default defineComponent({
  setup() {
    const tokenStore = useTokenStore()
    const tempTokenStorage = localStorage.getItem(KEY_STORAGE)
    if (tempTokenStorage) {
      const currectIat = Math.floor(Date.now() / 1000)
      const parsedToken:ITokenStore = JSON.parse(tempTokenStorage)
      if (currectIat > parsedToken.exp) {
        localStorage.clear()
        tokenStore.setToken({} as ITokenStore)
      } else {
        tokenStore.setToken(JSON.parse(tempTokenStorage))
        router.push('/private')
      }
    }
  }
})
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  font-weight: bold;
  font-size: 20px;
  flex-direction: column;
}
.gutter {
  margin-top: 10px;
}
</style>