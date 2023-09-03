<template>
  <router-view></router-view>
</template>

<script>
import { registerAPI } from "@/api";
export default {
  name: 'App',
  async created() {
    const res = await registerAPI()
    console.log(res)
  }
}
</script>

<style lang="less" scoped></style>