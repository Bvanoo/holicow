<!-- ⭐ -->
<template>
  <div class="table-wrapper">
    <!-- Desktop header -->
    <div v-if="!isMobile" class="table-header">
      <div v-for="col in columns" :key="String(col.key)" class="header-cell">
        <n-icon v-if="col.icon" :component="col.icon" class="header-icon" />
        {{ col.label }}
      </div>
      <div v-if="isAuthorized" class="header-cell">Actions</div>
    </div>

    <!-- BODY -->
    <TransitionGroup name="fade-slide" tag="div" appear class="table-body">
      <RowContainer v-for="(row, rIndex) in sortedData" :key="(row.id as string) ?? rIndex" class="row-wrapper"
        :style="{ transitionDelay: rIndex * 0.07 + 's' }">
        <!-- {{ onRowCreated(props.) }} -->
        <component :is="isMobile ? TableRowMobile : TableRowDesktop" :columns="columns" :row="row"
          :actionLabel="actionLabel(row)" :actionLabelOne="actionLabelOne" @action="handleAction" :titleKey="titleKey" :is-authorized="isAuthorized" :is-alert="isAlert"
          @edit="openEdit" @delete="openDelete">
          <!-- Forward all column slots -->
          <!-- <template v-for="col in columns" #[col.key]="slotProps">
            <slot :name="col.key" v-bind="slotProps" />
          </template> -->
        </component>
      </RowContainer>
    </TransitionGroup>

    <!-- handleUpdateSubmit - handleDeleteSubmit -->
    <!-- Rebrancher un event en passant le payload à la page -->
    <ModalForm v-model:show="updateModalVisible" title="Modifier" @submit="handleUpdateSubmit" />
    <ModalForm v-model:show="deleteModalVisible" title="Supprimer" @submit="handleDeleteSubmit" />
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, unknown>">
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
  import type { ColumnDefinition } from '@/presentation/components/Table/TableTypes'

  import TableRowDesktop from './TableRowDesktop.vue'
  import TableRowMobile from './TableRowMobile.vue'
  import RowContainer from './RowContainer.vue'
  import ModalForm from './ModalForm.vue'

  const props = defineProps<{
    columns: ColumnDefinition<T>[]
    data: T[]
    isAuthorized?: boolean
    isAlert?: boolean
    actionLabel: (row: T) => string
    actionLabelOne?: string
    titleKey: string
  }>()

  const isAuthorized = computed(() => props.isAuthorized ?? false)

  const isAlert = computed(() => props.isAlert ?? false)

  const actionLabelOne = computed(() => props.actionLabelOne ?? false)

  /* Modal */
  const updateModalVisible = ref(false)
  const deleteModalVisible = ref(false)
  const selectedRow = ref<T | null>(null)

  function openEdit(row: T) {
    selectedRow.value = row
    updateModalVisible.value = true
  }

  const emit = defineEmits<{
    (e: 'edit', row: T): void
    (e: 'delete', row: T): void
    (e: 'action', data: T): void
  }>()

  function openDelete(row: T) {
    console.log('Delete', row)
  }

  function handleUpdateSubmit(data: unknown) {
    console.log('Form submitted', data)
    // Emit vers le page qui est la page (eventception)
    emit("edit", data as T)
  }

  function handleDeleteSubmit(data: unknown) {
    console.log('Form submitted', data)
    // Emit vers le page qui est la page (eventception => eventbus)
    emit("delete", data as T)
  }

  function handleAction(row: T) {
    emit("action", row)
  }

  /* Mobile detection */
  const isMobile = ref(false)
  const updateMedia = () => {
    isMobile.value = window.matchMedia('(max-width: 960px)').matches
  }

  onMounted(() => {
    updateMedia()
    window.addEventListener('resize', updateMedia)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateMedia)
  })

  /* Sorting */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sortColumn = ref<keyof T | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sortOrder = ref<'ASC' | 'DESC'>('ASC')

  const sortedData = computed(() => {
    return props.data
  })
</script>

<style scoped>

  /* --- SCROLL WRAPPER (scrolling sans scrollbar) --- */
  .table-wrapper {
    max-height: 480px;
    overflow-y: scroll;
    scrollbar-width: none;
  }

  .table-wrapper::-webkit-scrollbar {
    display: none;
  }

  /* --- BARRE DE TRI --- */
  .sort-bar {
    display: flex;
    flex-direction: row;
    gap: 12px;
    margin-bottom: 8px;
    justify-content: space-between;
    align-items: center;
  }

  /* --- HEADER (centré) --- */
  .table-header {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    background: #f3f3f3;
    padding: 12px;
    font-weight: 600;
    color: #444;
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  .header-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    /* CENTRAGE */
    gap: 6px;
    text-align: center;
  }

  .header-icon {
    font-size: 18px;
    color: #666;
  }

  /* --- BODY --- */
  .table-body {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 4px;
  }

  /* --- Animation --- */
  .fade-slide-enter-from {
    opacity: 0;
    transform: translateY(8px);
  }

  .fade-slide-enter-to {
    opacity: 1;
    transform: translateY(0);
  }

  .fade-slide-enter-active {
    transition: all 0.3s ease;
  }
</style>
