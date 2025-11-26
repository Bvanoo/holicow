<script lang="ts" setup>
  import { NFlex } from 'naive-ui'
  import ProfilCard from '../components/ProfilCard.vue'
  import { useUserStore } from '@/stores/User'
  // import type User from '../entities/user'

  const usersStore = useUserStore()
  usersStore.checkIfNewUser();

</script>

<template>
  <n-flex vertical align="center" class="profilView">
    <!--Chargement ...-->
    <n-flex v-if="usersStore?.getCurrentUser === null" vertical>
      <n-spin size="large" />
      <p>Récupération du profil...</p>
    </n-flex>
    <ProfilCard></ProfilCard>
  </n-flex>
</template>
