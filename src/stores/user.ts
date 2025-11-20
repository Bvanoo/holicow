import type User from '../entities/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    currentUser: ref<User | null>(null),
  }),
  getters: {
    getCurrentUser: (state) => state.currentUser,
  },
  actions: {
    setCurrentUser(newUser: User) {
      this.currentUser = newUser
    },
  },
})
