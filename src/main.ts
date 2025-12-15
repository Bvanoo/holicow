import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import naive from 'naive-ui'

import './assets/main.scss'
import { registerDependencies } from './di/DependenciesProvider'


const app = createApp(App)


registerDependencies(app)
app.use(createPinia())
app.use(router)
app.use(naive)

//=====Hydrate=====
// const userStore = useUserStore()

// await userStore.hydrateApp()

// console.log('usersService.getFirstLogin("101")', userStore.getCurrentUser)
app.mount('#app')
