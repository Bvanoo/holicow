import User from '@/models/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    currentUser: ref<User | null>(null),
  }),
  getters: {
    getCurrentUser: (state) => state.currentUser,
    getCurrentUserId: (state) => state.currentUser?.getId(),
    getCurrentUserMail: (state) => state.currentUser?.getMail(),
    getCurrentUserPhone: (state) => state.currentUser?.getPhone(),
  },
  actions: {
    setCurrentUser(newUser: User) {
      this.currentUser = newUser
    },
  },
})
