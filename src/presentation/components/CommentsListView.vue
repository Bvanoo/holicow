<template>
  <div class="listview-wrapper">
    <!-- Header: Filters, Search, Sorting -->
    <div class="listview-header">
      <!-- ListView filter components -->
      <n-select v-model:value="selectedCategory" :options="categories" placeholder="Filtrer par catégorie" clearable
        class="header-select" />
      <n-input v-model:value="search" placeholder="Rechercher..." clearable class="header-search" />

      <n-select v-model:value="sortKey" :options="sortableOptions" placeholder="Trier par" class="header-sort" />

      <n-button @click="toggleSortOrder" secondary size="small">
        {{ sortOrder === 'asc' ? '⬆️ Asc' : '⬇️ Desc' }}
      </n-button>
    </div>

    <!-- Listview items -->
    <transition-group name="fade-slide" tag="div" class="listview-list">
      <n-card v-for="item in paginatedItems" :key="item.id" class="listview-card" hoverable>
        <div class="card-header">
          <div class="title">{{ item.disease }}</div>
          <n-badge :value="item.alerts" :color="'#18baa8'" />
        </div>

        <div class="card-content">
          <p>{{ 'Solution : ' }}</p>
          <p>
            {{ 'Cote globale : ' }}
            <n-image v-for="value in 3" width="12" src="star.png" />
          </p>
          <p>
            {{ 'Ma cote : ' }}
            <n-image v-for="value in 2" width="12" src="star.png" />
          </p>

          <!-- <div class="info">
            <n-tag type="info">{{ item.category }}</n-tag>
            <n-avatar round size="small">{{ item.avatar }}</n-avatar>
          </div> -->
        </div>
        <div>
          <p>Prévention : Désinfection avant et après la traite (trempage ou pulvérisation)</p>
        </div>
        <div>
          <ChatBubble />
        </div>
      </n-card>
    </transition-group>

    <n-empty v-if="filteredAndSortedItems.length === 0" description="Aucun résultat" class="empty-block" />

    <!-- Pagination -->
    <div class="pagination-block" v-if="filteredAndSortedItems.length > 0">
      <n-pagination v-model:page="page" :page-size="pageSize" :item-count="filteredAndSortedItems.length"
        show-size-picker :page-sizes="[6, 12, 24]" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import {
    NSelect,
    NInput,
    NCard,
    NBadge,
    NEmpty,
    NButton,
    NPagination,
  } from 'naive-ui'
  // Imports //
  import ChatBubble from './SimpleChatBubble.vue'

  // Item type //
  interface ListItem {
    id: number
    disease: string
    description: string
    category: string
    alerts: number
    avatar: string
  }

  // Items container //
  const props = defineProps<{ items: ListItem[] }>()

  // Mini Search Engine Fields
  const search = ref('')
  const selectedCategory = ref<string | null>(null)
  const sortKey = ref<string | null>(null)
  const sortOrder = ref<'asc' | 'desc'>('asc')
  const page = ref(1)
  const pageSize = ref(6)

  // Dynamical Categories
  const categories = computed(() => {
    const cats = Array.from(new Set(props.items.map((i) => i.category)))
    return cats.map((c) => ({ label: c, value: c }))
  })

  // Sorted Columns labels
  // CONSULTER LE MOCKUP
  const sortableOptions = [
    { label: 'Maladie', value: 'disease' },
    { label: 'Alertes', value: 'alerts' },
    { label: 'Catégorie', value: 'category' },
  ]

  const toggleSortOrder = () => {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  }

  // Combined filters //
  const filteredAndSortedItems = computed(() => {
    let arr = props.items.filter((item) => {
      const matchSearch = item.disease.toLowerCase().includes(search.value.toLowerCase())
      const matchCategory = selectedCategory.value ? item.category === selectedCategory.value : true
      return matchSearch && matchCategory
    })

    if (sortKey.value) {
      arr = arr.sort((a, b) => {
        // @ts-ignore
        const valA = a[sortKey.value!]
        // @ts-ignore
        const valB = b[sortKey.value!]
        if (valA < valB) return sortOrder.value === 'asc' ? -1 : 1
        if (valA > valB) return sortOrder.value === 'asc' ? 1 : -1
        return 0
      })
    }

    return arr
  })

  // Pagination logic
  const paginatedItems = computed(() => {
    const start = (page.value - 1) * pageSize.value
    return filteredAndSortedItems.value.slice(start, start + pageSize.value)
  })
</script>

<style scoped>

  /***************** Container *****************/
  .listview-wrapper {
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 16px;
  }

  /************ Container sections **************/
  .listview-header {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
  }

  /************ Container header ****************/
  .header-select {
    min-width: 200px;
  }

  .header-search {
    min-width: 220px;
    flex: 1;
  }

  /************* Container Template *************/
  .listview-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 32px;
  }

  /********** Container Card Container **********/
  .listview-card {
    border-radius: 14px;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .card-content {
    display: flex;
    justify-content: space-between;
  }

  .listview-card:hover {
    transform: translateY(-4px);
  }

  /************ Listview Properties ************/
  .title {
    font-size: 1.1rem;
    font-weight: 600;
  }

  .info {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  /***** Simple Container Animations states *****/

  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: all 0.35s ease;
  }

  .fade-slide-enter-from {
    opacity: 0;
    transform: translateY(12px);
  }

  .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-12px);
  }

  /**************** Pagination *****************/

  .pagination-block {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .empty-block {
    margin-top: 20px;
  }

  @media (max-width: 700px) {
    .listview-wrapper {
      padding: 0%;
    }

    .card-content {
      flex-direction: row;
    }
  }
</style>
