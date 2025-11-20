<script lang="ts" setup>
  import { NEl, NFlex } from 'naive-ui'
  import ProfilCard from '../components/ProfilCard.vue'
  import { useFarmerStore } from '@/stores/farmer'
  // import type User from '../entities/user'

  const usersStore = useFarmerStore()
  usersStore.checkCurrentFarmer()

</script>

<template>
  <n-flex vertical align="center" class="profilView">
    <!--Chargement ...-->
    <n-flex v-if="usersStore?.getCurrentUser === null" vertical>
      <n-spin size="large" />
      <n-el tag="p">Récupération du profil...</n-el>
    </n-flex>
    <ProfilCard></ProfilCard>
  </n-flex>
</template>
