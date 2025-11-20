<script lang="ts" setup>
  import { NEl, NFlex } from 'naive-ui'
  import ProfilCard from '../components/ProfilCard.vue'
  import { useUserStore } from '@/stores/user'
  // import type User from '../entities/user'

  const userStore = useUserStore()
</script>

<template>
  <n-flex vertical align="center" class="profilView">
    <!--Chargement ...-->
    <n-flex v-if="userStore?.getCurrentUser === null" vertical>
      <n-spin size="large" />
      <n-el tag="p">Récupération du profil...</n-el>
    </n-flex>
    <ProfilCard></ProfilCard>
  </n-flex>
</template>
