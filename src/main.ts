import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import naive from 'naive-ui'

import './assets/main.scss'
import UsersServices from './services/usersServices'
import { useFarmerStore } from './stores/farmer'
import type User from './entities/user'
import type Farmer from './entities/farmer'
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
//2) vérifier que l'utilisateur à un profile
const userProfile: Farmer | void = await usersServices.getProfile(userIdWALLeSmart)
//3) s'il n'a pas de profile, remplir son profile avec les informations wallesmart (problème du back, ça devrait déjà être rempli)
const phone = user?.mobile.replace(/\./g, '').replace(/\//g, '')
const email = user?.email
const role = user?.role
const language = user?.language
console.log('user.email', user?.email)
console.log('user.phone', phone)
console.log('user.role', role)
console.log('user.language', language)

if (userProfile !== undefined) {
  userProfile.farmer.phone = phone
  userProfile.farmer.adr_mail = email
  userProfile.role = role ?? ''
  userProfile.language = language ?? ''
}
console.log('userProfile', userProfile)
userStore.checkIfNewUser(userProfile)

userStore.setCurrentFarmer(userProfile)
//=====End Hydrate=====

// console.log('usersService.getFirstLogin("101")', userStore.getCurrentUser)

app.mount('#app')
