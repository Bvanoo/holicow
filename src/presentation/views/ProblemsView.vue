<template>
  <section style="padding: 16px">
    <Transition name="fade-slide" tag="FilterPanel" appear>
      <FilterPanel title="Filtres" @submit="handleSubmitFilter" class="filter">
        <div class="filter__order">
          <!-- Composant 1 -->
          <FilterSelectComponent
            class="filter__order-select"
            field-name="colonne"
            :options="[
              { label: 'Nom', value: 'disease_name_FR' },
              { label: 'Alertes', value: 'alerts' },
              { label: 'Commentaires', value: 'comments' },
              { label: 'Alertes/Avatar', value: 'avatarAlerts' },
            ]"
          />
          <!-- Composant 2 -->
          <FilterOrderSwitchComponent fieldName="order" />
        </div>
      </FilterPanel>
    </Transition>

    {{ filterResult }}

    <!-- Table -->
    <TableContainer
      :columns="columns"
      :data="rows"
      :isAuthorized="userStore.currentProfile?.role === 'Administrator'"
    />

    <div class="table-footer">
      <n-pagination
        v-model:page="currentPage"
        :page-size="pageSize"
        :item-count="totalItems"
        simple
      />
      <slot name="footer"></slot>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref, inject, watch, type Component, markRaw } from 'vue'
import { ProblemService } from '@/domain/services/ProblemService'
import type ProblemPayload from '@/domain/entities/ProblemPayload'
import type Problem from '@/domain/entities/Problem'
import FilterPanel from '../components/Filter/FilterPanel.vue'
import FilterSelectComponent from '../components/Filter/FilterSelectComponent.vue'
import FilterOrderSwitchComponent from '../components/Filter/FilterOrderSwitchComponent.vue'
import TableContainer from '../components/Table/TableContainer.vue'
import { useUserStore } from '@/stores/User'
import ProblemIcon from '../components/icons/ProblemIcon.vue'
import CommentIcon from '../components/icons/CommentIcon.vue'
import AlertsIcon from '../components/icons/AlertsIcon.vue'
import AlertAvatarIcon from '../components/icons/AlertAvatarIcon.vue'
import { SubProblemService } from '@/domain/services/SubProblemService'
import type UpdateSubProblem from '@/domain/entities/updateSubProblem'

const userStore = useUserStore()

const results = ref<ProblemPayload | null>(null)

const currentPage = ref<number>(1)
const pageSize = ref<number>(3)
const rows = ref<Problem[]>([])
const totalItems = ref<number>(0)

const columns: Ref<{ key: string; label: string; icon: Component }[]> = ref([])
const problemService = inject<ProblemService>('problemService')
const subProblemService = inject<SubProblemService>('subProblemService')

columns.value = [
  { key: 'diseaseName', label: 'Nom', icon: markRaw(ProblemIcon) },
  { key: 'commentCount', label: 'Commentaires', icon: markRaw(CommentIcon) },
  { key: 'farmerAlertCount', label: 'Alertes', icon: markRaw(AlertsIcon) },
  { key: 'similarAvatarAlertCount', label: 'Alertes/Avatar', icon: markRaw(AlertAvatarIcon) },
]

const loadProblems = async () => {
  if (!problemService) {
    console.error('problemService non injecté')
    return
  }

  try {
    const res = await problemService.getAllProblems(
      userStore.currentUserId as string,
      currentPage.value,
      pageSize.value,
      '',
      '',
    )

    console.log('LIST RESULTS', res)

    if (!res) {
      rows.value = []
      return
    }

    results.value = res
    rows.value = res.diseases ?? []

    if (res.total) {
      totalItems.value = res.total
    }
  } catch (e) {
    console.error('Erreur dans loadProblems :', e)
    rows.value = []
  }
}

onMounted(async () => {
  await loadProblems()

  //Get ONE problem
  // if (!problemService) return
  // try {
  //   const detail = await problemService.getProblemById(1)

  //   console.log('DETAIL PROBLEM ID=1', detail)
  // } catch (e) {
  //   console.error('Erreur dans getProblemById :', e)
  // }
  //edit ONE problem
  // try {
  //   const role = 'admin'
  //   const idProblem = '1'
  //   const problemUpdateDTO: UpdateProblem = {
  //     disease_name_FR: 'Diabète type 5',
  //     disease_name_DE: 'Typ-5-Diabetes',
  //     disease_name_EN: 'Type 5 Diabetes',
  //     disease_name_NL: 'Diabetes type 5',
  //     est_healing_time: 18,
  //     status_disease: true,
  //   }
  //   const detail = await problemService?.updateProblem(role, idProblem, problemUpdateDTO)

  //   console.log('Update PROBLEM ID=1', detail)
  // } catch (e) {
  //   console.error('Erreur dans getProblemById :', e)
  // }

  // try {
  //   const role = 'admin'
  //   const idProblem = 1

  //   const detail = await problemService?.toggleProblemStatus(role, idProblem)

  //   console.log('Update PROBLEM ID=1', detail)
  // } catch (e) {
  //   console.error('Erreur dans getProblemById :', e)
  // }
  // const idSubProblem = '1'

  // const detail = await subProblemService?.getAllSubProblemByProblemId(idSubProblem)
  // console.log('getAllSubPROBLEM ID=1', detail)

  // try {
  //   const role = 'admin'
  //   const idProblem = 1

  //   const detail = await subProblemService?.toggleSubProblemStatus(role, idProblem)

  //   console.log('Update PROBLEM ID=1', detail)
  // } catch (e) {
  //   console.error('Erreur dans getProblemById :', e)
  // }

  try {
    const role = 'admin'
    const idProblem = 1
    const SubproblemUpdateDTO: UpdateSubProblem = {
      id_sub_disease: 1,
      sub_disease_name_FR: 'gdhsssdfhs',
      sub_disease_name_DE: 'Grippe',
      sub_disease_name_EN: 'Flu',
      sub_disease_name_NL: 'Griep',
      status_sub_disease: true,
    }
    const detail = await subProblemService?.updateSubProblem(role, idProblem, SubproblemUpdateDTO)

    console.log('Update PROBLEM ID=1', detail)
  } catch (e) {
    console.error('Erreur dans getProblemById :', e)
  }
})

watch(currentPage, async () => {
  await loadProblems()
})

const filterResult = ref<Record<string, unknown>>()

function handleSubmitFilter(payload: Record<string, unknown>) {
  filterResult.value = payload
  console.log(payload)
}
</script>

<style lang="scss" scoped>
.table-footer {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 16px 0;
  padding-bottom: 12px;
}
</style>
