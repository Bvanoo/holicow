// import type ExistingUser from '@/entities/existingUser'
import type User from '../entities/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '../router'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    currentUser: ref<User | void>(),
  }),
  getters: {
    getCurrentUser: (state) => state.currentUser,
  },
  actions: {
    setCurrentUser(newUser: User | void) {
      this.currentUser = newUser
    },
    setNewEmail(newEmail: string | void) {
      this.currentUser.email = newEmail
    },
    checkCurrentUser() {
      console.log('usersStore.currentUser', this.currentUser)

      if (!this.currentUser) {
        console.log('not Allowed HomeView')
        router.push('/notAllowed')
        return false
      }
      return true
    },
  },
})
