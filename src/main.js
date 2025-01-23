import './assets/main.scss'

import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from '@/utils/firebase'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
})

app.mount('#app')
