import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import naive from 'naive-ui'

import './assets/main.scss'
import UsersServices from './services/usersServices'
import { useUserStore } from './stores/user'
import type ExistingUser from './entities/existingUser'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(naive)

//Hydrate
const userStore = useUserStore()

const usersService = new UsersServices()
const existingUser: ExistingUser | void = await usersService.getFirstLogin('101')
userStore.setCurrentUser(existingUser)

console.log('usersService.getFirstLogin("101")', userStore.getCurrentUser)

app.mount('#app')
