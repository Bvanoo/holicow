// import type ExistingUser from '@/entities/existingUser'
import type User from '../entities/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

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
  },
})
