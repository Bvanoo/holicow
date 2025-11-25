<script setup lang="ts">
  import type User from '@/domain/entities/user'
  import type UserUpdate from '@/domain/entities/userUpdate'
  import UsersServices from '@/domain/services/UserServices'
  // import UsersServices from '@/services/usersServices'
  import { useUserStore } from '@/stores/user'
  import { NButton, NCard, NEl, NFlex, NImage, NInput } from 'naive-ui'
  import { ref } from 'vue'
  import type { Ref } from 'vue'

  // import type { Ref } from 'vue'

  const usersStore = useUserStore()

  const isModify = ref(false)

  const user: User | void = usersStore.currentUser;

  const email: Ref<string | void> = ref(user?.email)

  console.log("user", user)
  const toggleModifyInputs = () => {
    isModify.value = !isModify.value
  }

  const updateProfile = () => {
    toggleModifyInputs();
    console.log("email", email.value);
    usersStore.setNewEmail(email.value);
    // const userUpdate: UserUpdate = {
    //   region: user.region
    // }
    // const usersServices = new UsersServices();
    // usersServices.updateUserProfile(usersStore.currentUser)
  }

</script>

<template>
  <!--Profil Card-->
  <n-card v-if="usersStore?.getCurrentUser !== null" title="user_card" class="profilView__userCard">
    <n-flex vertical>
      <n-flex justify="center">
        <n-image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7csvPWMdfAHEAnhIRTdJKCK5SPK4cHfskow&s"
          preview-disabled></n-image>
      </n-flex>
      <!--id-->
      <n-el tag="h3">Id</n-el>
      <n-el tag="span">{{ user?.profilId }}</n-el>
      <n-el tag="h3">userId</n-el>
      <n-el tag="span">{{ user?.userId }}</n-el>
      <!--email-->
      <template v-if="!isModify">
        <n-el tag="h3">Nom</n-el>
        <n-el tag="span">{{ user?.lastname }}</n-el>
        <n-el tag="h3">Prénom</n-el>
        <n-el tag="span">{{ user?.firstname }}</n-el>
        <n-el tag="h3">denomination</n-el>
        <n-el tag="span">{{ user?.denomination }}</n-el>
        <n-el tag="h3">role</n-el>
        <n-el tag="span">{{ user?.role }}</n-el>
        <n-el tag="h3">email</n-el>
        <n-el tag="span">{{ user?.email }}</n-el>
        <n-el tag="h3">mobile</n-el>
        <n-el tag="span">{{ user?.mobile }}</n-el>
        <n-el tag="h3">language</n-el>
        <n-el tag="span">{{ user?.language }}</n-el>
        <n-el tag="h3">links</n-el>
        <n-el tag="span">{{ user?.links }}</n-el>
        <n-el tag="h3">country</n-el>
        <n-el tag="span">{{ user?.country }}</n-el>
        <n-el tag="h3">user_status</n-el>
        <n-el tag="span">{{ user?.user_status }}</n-el>
      </template>
      <template v-if="isModify">
        <n-el tag="h3">email</n-el>
        <input v-model="email" />
        <n-el tag="h3">mobile</n-el>
        <n-input :v-model:value="user?.mobile" />
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
