import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'virtual:windi.css'
// @ts-ignore
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import { useSocketIO } from './socket.io'

const app = createApp(App)

const { socket } = useSocketIO()
app.config.globalProperties.$io = socket

app.use(createPinia())
app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })

app.mount('#app')
