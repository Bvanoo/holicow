<template>
  <!-- <ChatBubble /> -->
  <section style="padding: 16px">
    <CustomTable :columns="columns" :data="rows" primary-key="name">
      <!-- <template #footer>
        <n-button type="primary">Action footer</n-button>
      </template> -->
    </CustomTable>
  </section>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import CustomTable from '../components/CustomTable.vue'

import { useUserStore } from '@/stores/user';

const usersStore = useUserStore();
usersStore.checkCurrentUser()

const columns: Ref<{ key: string; label: string }[]> = ref([
  { key: 'name', label: 'Nom' },
  { key: 'comments', label: 'Commentaires' },
  { key: 'alerts', label: 'Alertes' },
  { key: 'avatarAlerts', label: 'Alertes/Avatar' },
])

interface ProblemDTO {
  id: number | string
  name: string
  comments: number
  alerts: number
  avatarAlerts: number
}

const rows = ref<ProblemDTO[]>([
  { id: 0, name: 'Mastite', comments: 1, alerts: 2, avatarAlerts: 12 },
  { id: 1, name: 'Cétose', comments: 0, alerts: 0, avatarAlerts: 3 },
  { id: 2, name: 'Médose', comments: 2, alerts: 8, avatarAlerts: 1 },
  { id: 3, name: 'Acidose', comments: 3, alerts: 4, avatarAlerts: 5 },
  { id: 4, name: 'Champignite', comments: 1, alerts: 4, avatarAlerts: 14 },
  { id: 5, name: 'rhume', comments: 14, alerts: 2, avatarAlerts: 9 },
  { id: 6, name: 'Unnamed', comments: 2, alerts: 4, avatarAlerts: 5 },
])
</script>
