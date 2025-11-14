import { defineStore } from 'pinia'
import type { user } from '../types/user'

export const use_users_store = defineStore('user_store', {
  state: () => ({
    current_user: null as user | null,
  }),
  getters: {
    get_current_name: (state) => state.current_user?.name,
  },
  actions: {
    set_current_user(newUser: user) {
      if (this.current_user != newUser) this.current_user = newUser
    },
  },
})
