<template>
  <!-- <ChatBubble /> -->
  <section style="padding: 16px">
    <SubProblemTable :columns="columns" :data="rows" primary-key="sub_disease_name_FR">
    </SubProblemTable>

    <div class="table-footer">
      <n-pagination v-model:page="currentPage" :page-size="pageSize" :item-count="totalItems" simple />
      <slot name="footer"></slot>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { onMounted, ref, type Ref, inject, watch } from 'vue'
  import { ProblemService } from '@/domain/services/ProblemService'
  import { useRoute } from 'vue-router'
  import SubProblemTable from '../components/SubProblemTable.vue'
  import type SubProblem from '@/domain/entities/SubProblem'
  const results = ref<SubProblem[] | void>()
  const currentPage = ref<number>(1)
  const pageSize = ref<number>(3)
  const rows = ref<SubProblem[] | undefined>()
  const totalItems = ref<number>()

  const columns: Ref<{ key: string; label: string }[]> = ref([])
  const problemService = inject<ProblemService>('problemService')
  const route = useRoute()

  onMounted(async () => {
    columns.value = [
      { key: 'description', label: 'Nom' },
      { key: 'globalRating', label: 'Note' },
      { key: 'comments', label: 'Commentaires' },
      { key: 'alerts', label: 'Alertes' },
      { key: 'avatarAlerts', label: 'Alertes/Avatar' },
    ]
    results.value = await problemService?.getSubProblemByProblemId(Number(route.params.data))

    // pageSize.value = Math.ceil(results.value!.total / results.value!.totalPages)
    rows.value = results.value!
    // totalItems.value = results.value!.total;
  })

  watch(currentPage, async () => {
    // if (sortKey.value) sortOrder.value = 'asc'
    // results.value = await problemService?.getSubProblemByProblemId(Number(route.params.id_disease))
    // rows.value = results.value!
  })

  // interface ProblemDTO {
  //     id: number
  //     name: string
  //     comments: number
  //     alerts: number
  //     avatarAlerts: number
  // }

  // const rows = ref<ProblemDTO[]>([
  //     { id: 0, name: 'Mastite', comments: 1, alerts: 2, avatarAlerts: 12 },
  //     { id: 1, name: 'Cétose', comments: 0, alerts: 0, avatarAlerts: 3 },
  //     { id: 2, name: 'Médose', comments: 2, alerts: 8, avatarAlerts: 1 },
  //     { id: 3, name: 'Acidose', comments: 3, alerts: 4, avatarAlerts: 5 },
  //     { id: 4, name: 'Champignite', comments: 1, alerts: 4, avatarAlerts: 14 },
  //     { id: 5, name: 'rhume', comments: 14, alerts: 2, avatarAlerts: 9 },
  //     { id: 6, name: 'Unnamed', comments: 2, alerts: 4, avatarAlerts: 5 },
  // ])
</script>

<style scoped>
  .table-footer {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 16px 0;
    padding-bottom: 64px;
  }
</style>
