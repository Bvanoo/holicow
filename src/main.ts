import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import naive from 'naive-ui'

import './assets/main.scss'
import UsersServices from './services/usersServices'
import { useUserStore } from './stores/user'
import type User from './entities/user'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(naive)

//=====Hydrate=====
const userStore = useUserStore()
const userIdWALLeSmart: string = '3cc7e361-c7f3-45c8-9097-979ddcb709f4'
// const userIdWALLeSmart: string = ''

const usersService = new UsersServices()
const existingUser: User | void = await usersService.getFirstLogin(userIdWALLeSmart)

userStore.setCurrentUser(existingUser)
//=====End Hydrate=====

// console.log('usersService.getFirstLogin("101")', userStore.getCurrentUser)

app.mount('#app')
