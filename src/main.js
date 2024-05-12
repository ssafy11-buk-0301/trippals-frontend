import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { useKakao } from 'vue3-kakao-maps/@utils';

useKakao('8e8f1a95804db62ccd2f966948285d2b')

app.use(createPinia());
app.use(router)

app.mount('#app')
