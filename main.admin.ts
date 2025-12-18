import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.admin.vue'
import router from './router/admin'
import TDesign from 'tdesign-vue-next'

// 样式导入
import './styles/global.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(TDesign)

app.mount('#app')