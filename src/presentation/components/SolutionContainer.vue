<template>
  <div class="listview-wrapper">
    <!-- Header: Filters, Search, Sorting -->
    <Transition name="fade-slide" tag="FilterPanel" appear>
      <FilterPanel title="Filtres" @submit="handleSubmitFilter" class="filter">
        <div class="filter__order">
          <!-- Composant 1 -->
          <FilterSelectComponent class="filter__order-select" field-name="colonne" :options="[
            { label: 'Nom', value: 'disease_name_FR' },
            { label: 'Alertes', value: 'alerts' },
            { label: 'Commentaires', value: 'comments' },
            { label: 'Alertes/Avatar', value: 'avatarAlerts' }
          ]"></FilterSelectComponent>
          <!-- Composant 2 -->
          <FilterOrderSwitchComponent fieldName="order"></FilterOrderSwitchComponent>
        </div>
        <!-- <div class="filter__search">
                <span>Rechercher :</span> 
            Composant 3
            <FilterInputComponent fieldName="test"></FilterInputComponent>
            </div> -->
      </FilterPanel>
    </Transition>
    {{ filterResult }}

    <!-- List -->
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
            <!-- <n-image v-for="value, index in 3" width="12" src="star.png" :key="index" /> -->
            <span v-for="value, index in 3" :key="index">⭐</span>
          </p>
          <p>
            {{ 'Ma cote : ' }}
            <!-- <n-image v-for="value, index in 2" width="12" src="star.png" :key="index" /> -->
            <span v-for="value, index in 2" :key="index">⭐</span>
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

    <!-- <div class="pagination-block" v-if="filteredAndSortedItems.length > 0">
      <n-pagination
        v-model:page="page"
        :page-size="pageSize"
        :item-count="filteredAndSortedItems.length"
        show-size-picker
        :page-sizes="[6, 12, 24]"
      />
    </div> -->
    <div class="table-footer">
      <n-pagination v-model:page="currentPage" :page-count="pageCount" simple />
      <slot name="footer"></slot>
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
    // NPagination,
  } from 'naive-ui'
  import ChatBubble from './SimpleChatBubble.vue'
  import FilterPanel from './Filter/FilterPanel.vue'
  import FilterSelectComponent from './Filter/FilterSelectComponent.vue'
  import FilterOrderSwitchComponent from './Filter/FilterOrderSwitchComponent.vue'
  const currentPage = ref<number>(1)
  const pageCount = ref<number>(0)

  interface ListItem {
    id: number
    disease: string
    description: string
    category: string
    alerts: number
    avatar: string
  }

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
  const sortableOptions = [
    { label: 'Maladie', value: 'disease' },
    { label: 'Alertes', value: 'alerts' },
    { label: 'Catégorie', value: 'category' },
  ]

  const toggleSortOrder = () => {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  }

  // Filtrage + tri combinés
  const filteredAndSortedItems = computed(() => {
    const arr = props.items.filter((item) => {
      const matchSearch = item.disease.toLowerCase().includes(search.value.toLowerCase())
      const matchCategory = selectedCategory.value ? item.category === selectedCategory.value : true
      return matchSearch && matchCategory
    })

    return arr
  })

  // Pagination
  const paginatedItems = computed(() => {
    const start = (page.value - 1) * pageSize.value
    return filteredAndSortedItems.value.slice(start, start + pageSize.value)
  })
  const filterResult = ref<Record<string, unknown>>();

  function handleSubmitFilter(payload: Record<string, unknown>) {
    filterResult.value = payload
    console.log(payload)
  }
</script>

<style scoped>
  .listview-wrapper {
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding-inline: 25%;

  }

  .listview-header {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
  }

  .header-select {
    min-width: 200px;
  }

  .header-search {
    min-width: 220px;
    flex: 1;
  }

  .listview-list {
    display: grid;
    /* grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); */
    gap: 32px;
    max-height: 480px;
    overflow-y: scroll;
    scrollbar-width: none;
  }

  .listview-card {
    border-radius: 14px;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .listview-card:hover {
    transform: translateY(-4px);
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

  .title {
    font-size: 1.1rem;
    font-weight: 600;
  }

  .info {
    display: flex;
    align-items: center;
    gap: 10px;
  }

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

  .pagination-block {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .empty-block {
    margin-top: 20px;
  }

  @media (max-width: 700px) {
    .listview-list {}

    .listview-wrapper {
      padding: 10%;
    }

    .card-content {
      flex-direction: row;
    }
  }
</style>
