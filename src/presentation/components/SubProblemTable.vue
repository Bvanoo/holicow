<template>
  <section class="select-container">
    <n-flex justify="center" class="sort-items">
      <n-select class="nselect" v-model:value="sortKey"
        :options="columns.map((c) => ({ label: c.label, value: c.key }))" placeholder="Trier par..." />
      <n-button :color="'white'" :text-color="'grey'" :bordered="true" v-on:click="toggleSortOrder">
        {{ sortOrder === 'asc' ? '⬆️ Asc' : '⬇️ Desc' }}
      </n-button>
    </n-flex>
  </section>

  <div class="responsive-table">
    <!-- Header (hidden on mobile) -->
    <div class="table-header" v-if="!isMobile">
      <div class="header-cell" v-for="col in columns" :key="col.key">
        {{ col.label }}
      </div>
    </div>

    <!-- Body -->
    <div class="table-body">
      <div @click="() => {
        router.push({
          name: 'sub problems',
          params: { data: 'Hello' }
        });
      }" class="table-row" v-for="(row, index) in data" :key="index">
        <!-- Desktop layout -->
        <template v-if="!isMobile">
          <div class="row-cell" v-for="col in columns" :key="col.key">
            <n-badge v-if="col.key == 'sub_disease_name_FR'" :value="row.sub_disease_name_FR" type="info" class="bubble" />
            <template v-else> ? </template>
          </div>
        </template>

        <!-- Mobile card layout -->
        <template v-else>
          <n-card class="mobile-card" :title="row[primaryKey]">
            <div class="mobile-line" v-for="col in columns" :key="col.key">

              <template v-if="col.key == 'sub_disease_name_FR'">
                <!-- <span>{{ row[col.key] }}</span> -->
              </template>
              <template v-else>
                <strong>{{ col.label }}:</strong>
                ?
              </template>
            </div>
          </n-card>
        </template>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  import { NFlex, NBadge, NSelect, NButton } from 'naive-ui'
  import router from '@/router'
import type SubProblem from '@/domain/entities/SubProblem'

  interface Column {
    key: string
    label: string
  }

  interface Props {
    columns: Column[]
    data: SubProblem[] | undefined
    primaryKey?: string
  }

  const props = defineProps<Props>()
  const primaryKey = props.primaryKey ?? props.columns[0]?.key ?? 'id'
  const isMobile = ref(false)
  const checkIsMobile = () => {
    isMobile.value = window.innerWidth < 768
  }

  onMounted(() => {
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    // Get data from API
  })

  onUnmounted(() => {
    window.removeEventListener('resize', checkIsMobile)
  })

  // const currentPage = ref(1)
  // const pageSize = ref(5)

  // Sorting
  type SortOrder = 'asc' | 'desc' | null
  const sortKey = ref<string | null>(null)
  const sortOrder = ref<SortOrder>(null)

  function toggleSortOrder() {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  }

  // watch(sortKey, () => {
  //   // if (sortKey.value) sortOrder.value = 'asc'
  // })

  // const sortedData = computed(() => {
  //   if (!sortKey.value || !sortOrder.value) return props.data
  //   return [...props.data].sort((a, b) => {
  //     const v1 = a[sortKey.value!]
  //     const v2 = b[sortKey.value!]
  //     return sortOrder.value === 'asc'
  //       ? String(v1).localeCompare(String(v2))
  //       : String(v2).localeCompare(String(v1))
  //   })
  // })

  // const paginatedData = computed(() => {
  //   const start = (currentPage.value - 1) * pageSize.value
  //   return sortedData.value.slice(start, start + pageSize.value)
  //   // on doit call l'api ici avec la nouvelle page
  // })
</script>

<style lang='scss' scoped>
@use '@/assets/variables' as *;
  .responsive-table {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top:100px;
  }

  .table-header {
    display: flex;
    flex-direction: row;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
    padding-bottom: 0.5rem;
    gap: 1rem;
  }

  .header-cell {
    flex: 1;
  }

  .table-body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .table-row {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    /* box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19); */
  }

  .row-cell {
    flex: 1;
    /* padding: 0.5rem; */
    /* border-bottom: 1px solid #eee; */
  }

  .select-container {
    margin: 16px 0;
    display: flex;
    justify-content: center!important;
    align-items: end;
    background-color: $main_color;
    gap: 16px;
    width: 100%;
    height:100px;
    position:fixed;
    z-index:500;
    left:0;
    top:100px;
  }

  .sort-items{
    position: relative;
    display:flex;
    justify-content: center;
    width:80%;
    height:fit-content;
    background-color: white;
    padding:10px;
    box-shadow: 0 0 10px ;
  }
  .nselect {
    max-width: 150px;

  }

  /* Mobile styles */
  @media (max-width: 768px) {
    .table-row {
      flex-direction: column;
    }

    .mobile-card {
      width: 100%;
      border-radius: 10px;
      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
    }

    .mobile-card:hover {
      transform: translateY(-4px);
      box-shadow:
        0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .mobile-line {
      display: flex;
      justify-content: space-between;
      padding: 0.25rem 0;
    }
  }
</style>
