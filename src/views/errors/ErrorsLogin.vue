<template>
  <div class="container">
    Sorry we encouter errors, please login and try again
    <div v-if="errorMessage.getMsg.length > 0" class="gutter">
      Status Error: {{errorMessage.getMsg}}
    </div>
    <div class="gutter">
      <Button @input="goBack" label="Login"></Button>
    </div>
  </div>
</template>

<script lang="ts">
import Button from "../../components/Button.vue"
import { defineComponent } from 'vue'
import { useErrorMessageStore } from "@/stores/errorMessage";

export default defineComponent({
  components: {
    Button,
  },
  setup() {
    const errorMessage = useErrorMessageStore()
    console.log(errorMessage.getMsg);
    return {
      errorMessage
    }
  },
  methods: {
    goBack() {
      this.$router.replace('/public');
    },
  },
})
</script>
