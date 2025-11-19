<script setup lang="ts">
import User from '../models/user'
import { useUserStore } from '../stores/user'
import { NButton, NCard, NEl, NFlex, NImage } from 'naive-ui'
import { ref } from 'vue'
const userStore = useUserStore()
userStore.setCurrentUser(new User(153, 'max@gmail.com', '0032485976581', 'Novice'))

const isModify = ref(false)

const show_modify_inputs = () => {
  isModify.value = !isModify.value
}
</script>

<template>
  <n-flex vertical align="center">
    <!--Chargement ...-->
    <n-flex v-if="userStore?.getCurrentUser === null" vertical>
      <n-spin size="large" />
      <n-el tag="p">Récupération du profil...</n-el>
    </n-flex>
    <!--Profil Card-->
    <n-card v-if="userStore?.getCurrentUser !== null" title="user_card" class="user__card">
      <n-flex vertical>
        <n-flex justify="center">
          <n-image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7csvPWMdfAHEAnhIRTdJKCK5SPK4cHfskow&s"
            preview-disabled
          ></n-image>
        </n-flex>
        <n-el v-if="!isModify" tag="span">Id : {{ userStore?.getCurrentUserId }}</n-el>
        <n-el v-if="!isModify" tag="span">{{ userStore?.getCurrentUserMail }}</n-el>
        <n-el v-if="!isModify" tag="span">{{ userStore?.getCurrentUserPhone }}</n-el>
        <n-input
          v-if="isModify"
          :v-model="userStore.currentUser"
          :placeholder="userStore?.getCurrentUserMail"
        ></n-input>
        <n-input v-if="isModify" :placeholder="userStore?.getCurrentUserPhone"></n-input>
        <n-button v-if="!isModify" strong round type="success" @click.prevent="show_modify_inputs"
          >Modifier mon profil</n-button
        >
        <n-button v-if="isModify" strong round type="success" @click.prevent="show_modify_inputs"
          >Appliquer les modifications</n-button
        >

        <n-button class="test" v-if="isModify" round quaternary @click.prevent="show_modify_inputs"
          >Annuler</n-button
        >
      </n-flex>
    </n-card>
    <!--Fin profil card-->
  </n-flex>
</template>

<style lang="scss">
.user {
  &__card {
    width: 50%;
  }
}
</style>
