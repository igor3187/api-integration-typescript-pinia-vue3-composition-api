import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { globalLoader } from 'vue-global-loader'
import { createNotivue } from 'notivue'
import 'notivue/notification.css' // Only needed if using built-in <Notification />
import 'notivue/animations.css' // Only needed if using default animations
const notivue = createNotivue(/* Options */)

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(globalLoader)
app.use(notivue)
app.mount('#app')

import { useAuthStore } from '@/stores/authStore';
const authStore = useAuthStore();
authStore.initializeUser();