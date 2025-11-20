<script setup lang="ts">
  import { useUserStore } from '@/stores/user'
  import type Farmer from '../entities/farmer'
  import { NButton, NCard, NEl, NFlex, NImage, NInput } from 'naive-ui'
  import { ref } from 'vue'
  import type { Ref } from 'vue'

  const userStore = useUserStore()

  const isModify = ref(false)

  const user: Ref<Farmer> = ref<Farmer>({ profil_id: "13", first_name: 'Maximilien', last_name: "Moc", country: "Belgium", user_status: "Novice", user_type_name: 0, nbr_min_comment: 0, nbr_max_comment: 0, user_type_picture: "3" });

  const toggleModifyInputs = () => {
    isModify.value = !isModify.value
  }

  const modifyInputs = () => {
    toggleModifyInputs();
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
      <n-el tag="span">{{ user?.profil_id }}</n-el>
      <!--email-->
      <n-el tag="h3">Prénom</n-el>
      <n-el v-if="!isModify" tag="span">{{ user?.first_name }}</n-el>
      <n-el tag="h3">Nom</n-el>
      <n-el v-if="!isModify" tag="span">{{ user?.last_name }}</n-el>
      <n-el tag="h3">Pays</n-el>
      <n-el v-if="!isModify" tag="span">{{ user?.country }}</n-el>
      <n-el tag="h3">User status</n-el>
      <n-el v-if="!isModify" tag="span">{{ user?.user_status }}</n-el>
      <n-el tag="h3">User type name</n-el>
      <n-el v-if="!isModify" tag="span">{{ user?.user_type_name }}</n-el>
      <n-input v-if="isModify" :v-model="user?.first_name" :value="user?.first_name" />
      <!--phone-->
      <!-- <n-el tag="span">Téléphone</n-el>
      <n-el v-if="!isModify" tag="span">{{ userStore.currentUser?.getPhone() }}</n-el>
      <n-input v-if="isModify" :v-model="userStore.currentUser?.phone"
        :value="userStore?.getCurrentUserPhone"></n-input> -->

      <n-button v-if="!isModify" strong round type="success" @click.prevent="toggleModifyInputs">Modifier mon
        profil</n-button>

      <n-button v-if="isModify" strong round type="success" @click.prevent="modifyInputs">Appliquer les
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
