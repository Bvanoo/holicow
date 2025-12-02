// import type ExistingUser from '@/entities/existingUser'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import UsersServices from '@/domain/services/UserServices'
import type IUserProfile from '@/domain/entities/IUserProfile'
import type IFirstLogin from '@/domain/entities/IFirstLogin'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    currentProfile: ref<IUserProfile | void>(),
    currentUserId: ref<string | void>(),
    isNewProfil: ref<boolean>(false),
    isHydrate: ref<boolean>(false),
  }),
  getters: {
    getCurrentUser: (state) => state.currentProfile,
  },
  actions: {
    updateCurrentUser(newUser: IUserProfile | void) {
      this.currentProfile = newUser
    },

    updateProfile() {
      if (this.currentProfile && this.currentUserId) {
        const userServices = new UsersServices()
        //Problème ici car je dois transformer la string "true" en boolean value
        userServices.updateUserProfile(this.currentUserId, this.currentProfile)
        this.isNewProfil = false
      }
    },
    /**Permet de mettre le profil de l'utilisateur dans le userStore et d'affecter les booleans de vérification */
    async hydrateApp() {
      //Utilisation pour le guard router

      const usersServices = new UsersServices()
      const userIdWALLeSmart: string = '3cc7e361-c7f3-45c8-9097-979ddcb709f4'

      //1) récupérer l'utilisateur en DB
      const user: IFirstLogin | void = await usersServices.getFirstLogin(userIdWALLeSmart)

      //2) vérifier que l'utilisateur à un profil
      let userProfile: IUserProfile | void = undefined

      if (user) {
        userProfile = await usersServices.getProfile(user?.profilId)
        if (userProfile?.region === 'BE')
          this.isNewProfil = true //a changer quand back end a ajouter l'attribut a l'objet
        else this.isNewProfil = false
      }

      this.currentProfile = userProfile
      this.currentUserId = user?.profilId
      this.isHydrate = true
    },
  },
})
