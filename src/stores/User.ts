// import type ExistingUser from '@/entities/existingUser'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import UsersServices from '@/domain/services/UserServices'
import type IUserProfile from '@/domain/entities/IUserProfile'
import type IFirstLoginPayload from '@/domain/entities/IFirstLoginPayload'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    currentProfile: ref<IUserProfile | void>(),
    currentUserId: ref<string | void>(),
    isNewProfil: ref<boolean>(false),
    isHydrate: ref<boolean>(false),
    isProblemViewAction: ref<boolean>(true),
  }),
  getters: {},
  actions: {
    setCurrentUser(newUser: IUserProfile | void) {
      this.currentProfile = newUser
    },

    async updateProfile(currentProfile: IUserProfile) {
      if (currentProfile && currentProfile.profilId) {
        const userServices = new UsersServices()
        //Problème ici car je dois transformer la string "true" en boolean value
        const newProfile = await userServices.updateUserProfile(
          currentProfile.profilId,
          currentProfile,
        )
        this.setCurrentUser(newProfile)
        this.isNewProfil = false
      }
    },
    /**Permet de mettre le profil de l'utilisateur dans le userStore et d'affecter les booleans de vérification */
    async hydrateApp() {
      //Utilisation pour le guard router

      const usersServices = new UsersServices() // ADMIN001
      const userIdWALLeSmart: string = 'FARM001'
      // const userIdWALLeSmart: string = 'FARM001'
      // const userIdWALLeSmart: string = '579b043d-0971-494f-ab71-02e841e87dbe'
      // const userIdWALLeSmart: string = '3cc7e361-c7f3-45c8-9097-979ddcb709f4'

      //1) récupérer l'utilisateur en DB
      const firstLoginPayload: IFirstLoginPayload | void =
        await usersServices.getFirstLogin(userIdWALLeSmart)

      //2) vérifier que l'utilisateur à un profil
      let userProfile: IUserProfile | void = undefined

      if (firstLoginPayload) {
        userProfile = await usersServices.getProfile(firstLoginPayload?.user?.profilId)
        if (userProfile?.region === '')
          this.isNewProfil = true //a changer quand back end a ajouter l'attribut a l'objet
        else this.isNewProfil = false
      }

      this.currentProfile = userProfile
      this.currentUserId = firstLoginPayload?.user?.profilId
      this.isHydrate = true
    },
  },
})
