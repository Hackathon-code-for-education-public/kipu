import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {View360} from "@egjs/vue3-view360";

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
