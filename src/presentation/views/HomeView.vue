<template>
  <div class="alert">
    <div class="title">Mes alerts actives</div>
      <TableContainer class="tc" :columns="columns" :data="(rows as Alert[])"
              :isAuthorized="userStore.currentProfile?.role === 'Administrator'" :actionLabel="() => 'Details'"
              :titleKey="'disease_name'" @action="showAlert">
          </TableContainer>
  </div>
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

  const res = ref<AlertPayload | void>();
  const rows = ref<Alert[]>();
  const columns: Ref<{ key: string; label: string, icon: Component | null}[]> = ref([])
  columns.value = [
      { key: 'warning_date', label: 'Date', icon: null },
      { key: 'id_animal', label: 'Id animal', icon: null },
      { key: 'id_troupeau', label: 'Id troupeau', icon: null },
      { key: 'disease_name', label: 'Maladie', icon: null },
  ]

  onMounted(async () => {
    res.value = await alertService?.getAllAlertsByUserId(userStore.currentUserId as string, 'fr',1,10);
    rows.value = res.value?.data;
    rows.value?.map(alert => {
      alert.warning_date = new Date(alert.warning_date).toLocaleDateString('fr-FR'),
      alert.id_troupeau = alert.id_troupeau == null ? 'none' : alert.id_troupeau,
      alert.id_animal = alert.id_animal == null ? 'none' : alert.id_animal
    })
  })

  function showAlert(row: Alert){
    router.push({
                  name: 'alerte',
                  params: { data: row.id_warn }
              });
  }

</script>
<style lang="scss" scoped>
  .alert{
    margin-left: 5vw !important;
    margin-top: 20vh !important;
    display: flex !important;
    flex-direction: column !important;
    width: 90vw !important;
  }

  .title{
    font-size: large;
    font-weight: bold;
    color: white;
  }

</style>
