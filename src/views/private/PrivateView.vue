<template>
  <div class="container">
    Welcome to protected page
    <div class="gutter">
      <Button @input="goBack" label="Logout"></Button>
    </div>
  </div>
</template>

<script lang="ts">
import Button from "../../components/Button.vue"
import { defineComponent } from 'vue'
import { useTokenStore } from "@/stores/token"

export default defineComponent({
  components: {
    Button
  },
  setup() {
    const tokenStore = useTokenStore()
    return {
      tokenStore
    }
  },
  methods: {
    goBack() {
      localStorage.clear()
      this.tokenStore.setToken({token: null, exp: 0})
      this.$router.replace('/')
    }
  }
}) 
</script>