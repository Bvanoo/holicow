<script setup lang="ts">
  import { useUserStore } from '@/stores/user'
  import { NButton, NCard, NEl, NFlex, NImage, NInput } from 'naive-ui'
  import { ref } from 'vue'

  const userStore = useUserStore()

  const isModify = ref(false)

  const show_modify_inputs = () => {
    isModify.value = !isModify.value
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
      <n-el tag="span">Id</n-el>
      <n-el tag="span">{{ userStore.currentUser?.getId() }}</n-el>
      <!--email-->
      <n-el tag="span">Email</n-el>
      <n-el v-if="!isModify" tag="span">{{ userStore.currentUser?.getMail() }}</n-el>
      <n-input v-if="isModify" :v-model="userStore.currentUser?.mail" :value="userStore.getCurrentUserMail"></n-input>
      <!--phone-->
      <n-el tag="span">Téléphone</n-el>
      <n-el v-if="!isModify" tag="span">{{ userStore.currentUser?.getPhone() }}</n-el>
      <n-input v-if="isModify" :v-model="userStore.currentUser?.phone" :value="userStore?.getCurrentUserPhone"></n-input>

      <n-button v-if="!isModify" strong round type="success" @click.prevent="show_modify_inputs">Modifier mon profil</n-button>

      <n-button v-if="isModify" strong round type="success" @click.prevent="show_modify_inputs">Appliquer les modifications</n-button>
      <n-button class="test" v-if="isModify" round quaternary @click.prevent="show_modify_inputs">Annuler</n-button>
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
