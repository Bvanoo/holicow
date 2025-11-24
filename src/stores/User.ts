// import type ExistingUser from '@/entities/existingUser'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '../router'
import type Farmer from '@/entities/farmer'
import type IUser from '@/entities/user'

export const useFarmerStore = defineStore('farmerStore', {
  state: () => ({
    currentFarmer: ref<IUser | void>(),
  }),
  getters: {
    getCurrentUser: (state) => state.currentFarmer,
  },
  actions: {
    setCurrentUser(newUser: IUser | void) {
      this.currentFarmer = newUser
    },
    setNewEmail(newEmail: string) {
      if (this.currentFarmer !== undefined) this.currentFarmer.adr_mail = newEmail
    },
    checkIfNewUser() {
      if (!this.currentFarmer?.region && !this.currentFarmer?.bio && !this.currentFarmer?.robot) {
        console.log('new profile', this.currentFarmer)
        router.push('/firstConnexion')
        return true
      }
      return false
    },
  },
})
