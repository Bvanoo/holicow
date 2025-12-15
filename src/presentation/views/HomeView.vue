<template>
  <section v-if="userStore.currentProfile?.role !== 'Administrator'" class="view">
    <div class="view__header">
      <div class="view--title">Mes alerts actives</div>
    </div>
    <section class="view__content">
      <TableContainer class="tc" :columns="columns" :data="(rows as Alert[])"
        :isAuthorized="userStore.currentProfile?.role === 'Administrator'" :actionLabel="() => 'Details'"
        :titleKey="'disease_name'" @action="showAlert">
      </TableContainer>
    </section>
  </section>
  <section class="view">
    <div class="view__header">
      <div class="view--title">Mes notification</div>
    </div>
    <div class="view__header">
      <div class="view--title" v-if="notif.length === 0">
        Aucune notifications
      </div>
    </div>
    <section v-if="notif.length !== 0" class="view__content">
      <TableContainer class="tc" :columns="columns" :isAuthorized="userStore.currentProfile?.role === 'Administrator'"
        :actionLabel="() => 'Details'" :titleKey="'disease_name'" @action="showAlert">
      </TableContainer>
    </section>
  </section>
</template>

<script setup lang="ts">

  import { onMounted, ref, type Ref, inject, type Component } from 'vue'
  import { AlertsService } from '@/domain/services/AlertsService'
  import type Alert from '@/domain/entities/Alert';
  import TableContainer from '../components/Table/TableContainer.vue';
  import { useUserStore } from '@/stores/User';
  import type AlertPayload from '@/domain/entities/AlertPayload';
  import router from '@/router/index';

  const userStore = useUserStore();

  const alertService = inject<AlertsService>("alertsService");
  const notif: [] = [];
  const res = ref<AlertPayload | void>();
  const rows = ref<Alert[]>();
  const columns: Ref<{ key: string; label: string, icon: Component | undefined }[]> = ref([])
  columns.value = [
    { key: 'warning_date', label: 'Date', icon: undefined },
    { key: 'id_animal', label: 'Id animal', icon: undefined },
    { key: 'id_troupeau', label: 'Id troupeau', icon: undefined },
    { key: 'disease_name', label: 'Maladie', icon: undefined },
    { key: 'actions', label: 'actions', icon: undefined },
  ]

  onMounted(async () => {
    res.value = await alertService?.getAllAlertsByUserId(userStore.currentUserId as string, 'fr', 1, 10);
    rows.value = res.value?.data;
    rows.value?.map(alert => {
      alert.warning_date = new Date(alert.warning_date).toLocaleDateString('fr-FR');
      alert.id_troupeau = alert.id_troupeau == null ? 'none' : alert.id_troupeau;
      alert.id_animal = alert.id_animal == null ? 'none' : alert.id_animal;
    })
  })

  function showAlert(row: Alert) {
    router.push({
      name: 'alert',
      params: { data: row.id_warn }
    });
  }

</script>
<style lang="scss" scoped></style>
