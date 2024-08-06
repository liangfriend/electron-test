import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import "./assets/css/styles.scss";
import App from './App.vue'
import store from './store'

const app = createApp(App)




app.use(ElementPlus)
app.use(store)
app.mount('#app')
