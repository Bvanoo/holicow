import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import naive from 'naive-ui'

import './assets/main.scss'
import UsersServices from './services/usersServices'
import { useUserStore } from './stores/User'
import type IUserProfile from './entities/IUserProfile'
import type IFirstLogin from './entities/IFirstLogin'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(naive)

//=====Hydrate=====
const userStore = useUserStore()
const usersServices = new UsersServices()
const userIdWALLeSmart: string = '3cc7e361-c7f3-45c8-9097-979ddcb709f4'
// const userIdWALLeSmart: string = ''

//1) récupérer l'utilisateur
const user: IFirstLogin | void = await usersServices.getFirstLogin(userIdWALLeSmart)
console.log('user', user)
//2) vérifier que l'utilisateur à un profile
let userProfile: IUserProfile | void = undefined
if (user) {
  userProfile = await usersServices.getProfile(user?.profilId)
  if (userProfile?.region === 'BE') userStore.isNewProfil = true
}
console.log('userProfile', userProfile)

userStore.updateCurrentUser(userProfile)
userStore.currentUserId = user?.profilId
//=====End Hydrate=====

// console.log('usersService.getFirstLogin("101")', userStore.getCurrentUser)

app.mount('#app')
