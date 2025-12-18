import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.portfolio.vue'
import router from './router/portfolio'

// 样式导入
import './styles/global.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')