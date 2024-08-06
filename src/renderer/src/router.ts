import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home/DeviceManagement'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
