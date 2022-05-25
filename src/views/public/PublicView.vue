<template>
  <div class="container">
    <div class="welcomeText">Welcome</div>
    <div class="card">
      <input v-model="username" placeholder="Username" class="input" />
      <input v-model="password" placeholder="Password" type="password" class="input" />
      <div class="buttonContainer">
        <Button @input="doLogin" label="Login"></Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref } from "vue-demi";
import { useTokenStore } from '../../stores/token'
import { useErrorMessageStore } from '../../stores/errorMessage'
import Button from '../../components/Button.vue'
import { BASE_URL, KEY_STORAGE } from '@/utils/Constant';

export default defineComponent({
  name: "PublicView",
  components: {
    Button
  },
  setup() {
    const errorMessage = useErrorMessageStore()
    const tokenStore = useTokenStore()
    const username = ref(null);
    const password = ref(null);
    return {
      username,
      password,
      tokenStore,
      errorMessage
    };
  },
  methods: {
    doLogin() {
      fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })
        .then((response) => {
          if (response.status !== 200) {
            this.errorMessage.setMsg(`${response.statusText} (${response.status})`)
            this.$router.push('/error')
          }
          return response.json()
        })
        .then((response) => {
          if (response) {
            localStorage.setItem(KEY_STORAGE, JSON.stringify(response))
            this.tokenStore.setToken({
              token: response.token,
              exp: response.exp
            })
            this.$router.push('/private')
          }
        });
    }
  }
});
</script>

<style scoped>
.welcomeText {
  margin-bottom: 10px;
  font-size: 40px;
}
.card {
  padding: 10px;
  border-radius: 5px;
  background-color: #cdd1e4;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.input {
  padding: 7px;
  border: 1px solid white;
  border-radius: 5px;
  margin-bottom: 10px;
  font-family: "Poppins", sans-serif;
}
.buttonContainer {
  display: flex;
  justify-content: flex-end;
}
</style>
