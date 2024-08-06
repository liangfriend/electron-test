<template>
  <el-button @click="getFile">获取</el-button>
</template>
<script setup lang="ts">
import {ref, onMounted, reactive} from "vue"
const getFile=async ()=>{
  const res=await window.api.test()
  console.log(res)
}

const load = () => {}
onMounted(() => {
  load()
})
</script>
<style scoped lang="scss">
.el-container {
  height: 100vh;
}
.el-menu {
  height: 100%;
}
</style>
