// import type ExistingUser from '@/entities/existingUser'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '../router'
import UsersServices from '@/domain/services/UserServices'
import type IUserProfile from '@/domain/entities/IUserProfile'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    currentProfile: ref<IUserProfile | void>(),
    currentUserId: ref<string | void>(),
    isNewProfil: ref<boolean>(false),
  }),
  getters: {
    getCurrentUser: (state) => state.currentProfile,
  },
  actions: {
    updateCurrentUser(newUser: IUserProfile | void) {
      this.currentProfile = newUser
    },
    setNewEmail(newEmail: string) {
      if (this.currentProfile !== undefined) this.currentProfile.adr_mail = newEmail
    },
    checkIfNewUser() {
      if (this.isNewProfil) {
        console.log('new profile')
        router.push('/firstConnexion')
        return true
      }
      return false
    },
    updateProfile() {
      if (this.currentProfile && this.currentUserId) {
        const userServices = new UsersServices()
        //Problème ici car je dois transformer la string "true" en boolean value
        userServices.updateUserProfile(this.currentUserId, this.currentProfile)
        this.isNewProfil = false
      }
    },
  },
})
