<script setup lang="ts">
  import type IUserProfile from '@/entities/IUserProfile'
  import type Farmer from '@/entities/user'
  import type UserUpdate from '@/entities/userUpdate'
  import UsersServices from '@/services/usersServices'
  // import UsersServices from '@/services/usersServices'
  import { useUserStore } from '@/stores/User'
  import { NButton, NCard, NEl, NFlex, NImage, NInput } from 'naive-ui'
  import { ref } from 'vue'
  import type { Ref } from 'vue'

  // import type { Ref } from 'vue'

  const userStore = useUserStore()

  const isModify = ref(false)

  const userProfile: IUserProfile | void = userStore.currentProfile;
  console.log("currentFarmer", userProfile)

  const region: Ref<string | void> = ref(userProfile?.region)
  const bio: Ref<boolean | void> = ref(userProfile?.bio)
  const robot: Ref<boolean | void> = ref(userProfile?.robot)

  const toggleModifyInputs = () => {
    isModify.value = !isModify.value
  }

  const updateProfile = () => {
    toggleModifyInputs();
    console.log("region", region.value);
    console.log("bio", bio.value);
    console.log("robot", robot.value);

    if (userProfile) {

      userProfile.bio = bio.value === "true";
      userProfile.robot = robot.value === "true";
    }

    const userUpdate: IUserProfile = {
      region: region.value,
      bio: bio.value === "true",
      robot: robot.value === "true",
      mail_notif: false,
      adr_mail: userProfile?.adr_mail,
      phone_notif: false,
      phone: userProfile?.phone

    }

    console.log("userUpdate", userUpdate)
    // farmerStore.setNewEmail(email.value);
    // const userUpdate: UserUpdate = {
    //   region: user.region
    // }
    const usersServices = new UsersServices();
    console.log("currentFarmer.profilId", userProfile?.profilId)
    usersServices.updateUserProfile(userProfile?.profilId as string, userUpdate)
    userStore.currentProfile = userUpdate

  }

</script>

<template>
  <!--Profil Card-->
  <n-card v-if="userStore?.getCurrentUser !== null" title="user_card" class="profilView__userCard">
    <n-flex vertical>
      <n-flex justify="center">
        <n-image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7csvPWMdfAHEAnhIRTdJKCK5SPK4cHfskow&s"
          preview-disabled></n-image>
      </n-flex>
      <!--id-->
      <n-el tag="h3">Id</n-el>
      <n-el tag="span">{{ userStore.currentProfile?.profilId }}</n-el>
      <!-- <n-el tag="h3">userId</n-el>
      <n-el tag="span">{{ currentFarmer?.farmer.userId }}</n-el> -->
      <!--email-->
      <template v-if="!isModify">
        <n-el tag="h3">Nom</n-el>
        <n-el tag="span">{{ userStore.currentProfile?.lastname }}</n-el>
        <n-el tag="h3">Prénom</n-el>
        <n-el tag="span">{{ userStore.currentProfile?.firstname }}</n-el>
        <n-el tag="h3">role</n-el>
        <n-el tag="span">{{ userStore.currentProfile?.role }}</n-el>
        <n-el tag="h3">email</n-el>
        <n-el tag="span">{{ userStore.currentProfile?.adr_mail }}</n-el>
        <n-el tag="h3">mobile</n-el>
        <n-el tag="span">{{ userStore.currentProfile?.phone }}</n-el>
        <n-el tag="h3">language</n-el>
        <n-el tag="span">{{ userStore.currentProfile?.language }}</n-el>
        <n-el tag="h3">country</n-el>
        <n-el tag="span">{{ userStore.currentProfile?.country }}</n-el>
        <n-el tag="h3">user_status</n-el>
        <n-el tag="span">{{ userStore.currentProfile?.user_status }}</n-el>
        <n-el tag="h3">region</n-el>
        <n-el tag="span">{{ userStore.currentProfile?.region }}</n-el>
        <n-el tag="h3">bio</n-el>
        <n-el tag="span">{{ userStore.currentProfile?.bio }}</n-el>
        <n-el tag="h3">robot</n-el>
        <n-el tag="span">{{ userStore.currentProfile?.robot }}</n-el>
      </template>
      <template v-if="isModify">
        <n-el tag="h3">region</n-el>
        <select v-model="region">
          <option value="Herbagère">Herbagère</option>
          <option value="Hautes Ardennes">Hautes Ardennes</option>
          <option value="Autres provinces">Autres provinces</option>
        </select>
        <n-el tag="h3">bio</n-el>
        <select v-model="bio">
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
        <n-el tag="h3">robot</n-el>
        <select v-model="robot">
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
      </template>
      <!--phone-->
      <!-- <n-el tag="span">Téléphone</n-el>
      <n-el v-if="!isModify" tag="span">{{ userStore.currentUser?.getPhone() }}</n-el>
      <n-input v-if="isModify" :v-model="userStore.currentUser?.phone"
        :value="userStore?.getCurrentUserPhone"></n-input> -->

      <n-button v-if="!isModify" class="profilView__userCard__buttons" strong round type="success"
        @click.prevent="toggleModifyInputs">Modifier mon
        profil</n-button>

      <n-button v-if="isModify" strong round type="success" @click.prevent="updateProfile">Appliquer les
        modifications</n-button>

      <n-button class="test" v-if="isModify" round quaternary @click.prevent="toggleModifyInputs">Annuler</n-button>
    </n-flex>
  </n-card>
  <!--Fin profil card-->
</template>

<style lang="scss">
  .user {
    &__card {
      width: 50%;
    }
  }
</style>
