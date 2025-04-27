import {createApp} from 'vue'
import {createPinia} from 'pinia'
import Vue3Toastify, {type ToastContainerOptions} from "vue3-toastify";

import App from './App.vue'
import router from "@/router";
import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'
import '@/assets/styles/global.css'
import '@/assets/styles/variables.css'


const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(Vue3Toastify, {
    autoClose: 3000,
} as ToastContainerOptions)


app.mount('#app')