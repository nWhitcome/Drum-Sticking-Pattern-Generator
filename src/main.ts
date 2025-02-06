import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Howl, Howler } from 'howler'

const app = createApp(App)

app.use(router)

app.mount('#app')
