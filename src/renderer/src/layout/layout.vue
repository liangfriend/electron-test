<template>
  <el-button @click="getFile">
    获取
  </el-button>
  <el-button @click="revert">
    重置
  </el-button>
  <el-button @click="stop">
    暂停
  </el-button>
  <div>
    <ul>进度</ul>
    <el-progress
      :percentage="progress"
      :status="status"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from "vue"
import { ElNotification } from 'element-plus'
const start=ref(-1)
const getFile=async ()=>{
  const res=await window.api.getFile(start.value)
  console.log(res)
}
const status=ref('')
const progress=ref(0)
const load = () => {
  const d=debounce(1000, updateProgress)
  window.api.getFileProgress((p, end) => {
    console.log(p)
    start.value=end
    d(p)
    if (p === 100) {
      status.value = "success"
       progress.value=100
    }
  })
    window.api.notificationMessage((msg) => {
    console.log(msg)
  
    ElNotification({
      title: 'Error',
      message: msg,
      type: 'error',
    })
  })
}
const stop = () => {
  window.api.stop()
}
const updateProgress = (p) => {
  if(progress.value!==100)
  progress.value = +p.toFixed(2)*100
}
const debounce = (delay,func) => {
  let locker = false
  return (args) => {
    if (!locker) {
       locker = !locker
      setTimeout(() => {
        func(args)
          locker = !locker
      },delay)
     
      
    
    }
  }
}
const revert = () => {
  start.value = -1
  progress.value=0
}
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
