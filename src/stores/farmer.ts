// import type ExistingUser from '@/entities/existingUser'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '../router'
import type Farmer from '@/entities/farmer'

export const useFarmerStore = defineStore('farmerStore', {
  state: () => ({
    currentFarmer: ref<Farmer | void>(),
  }),
  getters: {
    getCurrentUser: (state) => state.currentFarmer,
  },
  actions: {
    setCurrentFarmer(newUser: Farmer | void) {
      this.currentFarmer = newUser
    },
    setNewEmail(newEmail: string) {
      if (this.currentFarmer !== undefined) this.currentFarmer.email = newEmail
    },
    checkCurrentFarmer() {
      if (!this.currentFarmer) {
        console.log('not Allowed')
        router.push('/notAllowed')
        return false
      }
      return true
    },
    checkIfNewUser(user: Farmer | void) {
      if (!user?.farmer.region && !user?.farmer.bio && !user?.farmer.robot) {
        console.log('new profile')
        router.push('/firstConnexion')
        return true
      }
      return false
    },
  },
})
