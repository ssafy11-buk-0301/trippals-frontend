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

import 'primevue/resources/themes/aura-light-green/theme.css'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

app.use(createPinia())
app.use(router)
app.component('QuillEditor', QuillEditor)

app.mount('#app')
