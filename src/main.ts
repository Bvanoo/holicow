import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import naive from 'naive-ui'

import './assets/main.scss'
import UsersServices from './services/usersServices'
import { useFarmerStore } from './stores/User'
import type User from './entities/user'
import type IUserProfile from './entities/IUserProfile'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(naive)

//=====Hydrate=====
const userStore = useFarmerStore()
const usersServices = new UsersServices()
const userIdWALLeSmart: string = '3cc7e361-c7f3-45c8-9097-979ddcb709f4'
// const userIdWALLeSmart: string = ''

//1) récupérer l'utilisateur
const user: User | void = await usersServices.getFirstLogin(userIdWALLeSmart)
console.log('user', user)
//2) vérifier que l'utilisateur à un profile
let userProfile: IUserProfile = {}
if (user) {
  userProfile = await usersServices.getProfile(user?.profilId)
}
console.log('userProfile', userProfile)

userStore.setCurrentUser(user)
//=====End Hydrate=====

// console.log('usersService.getFirstLogin("101")', userStore.getCurrentUser)

app.mount('#app')
