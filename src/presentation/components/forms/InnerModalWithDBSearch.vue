<template>
  <n-form-item :label="label">
    <!-- Champ affichant le Problem sélectionné -->
    <n-input
      readonly
      :value="modelValue?.name"
      placeholder="Cliquez pour sélectionner un problème"
      @click="openModal"
    />

    <!-- MODAL -->
    <n-modal
      v-model:show="showModal"
      preset="card"
      title="Recherche de problème"
      style="width: 600px"
    >
      <n-space vertical size="large">
        <!-- Search Field -->
        <n-input v-model:value="search" placeholder="Rechercher un problème..." />

        <!-- Result Overview -->
        <n-text depth="3" v-if="previewResults.length">
          {{ previewResults.length }} résultat(s) trouvé(s)
        </n-text>

        <!-- List -->
        <n-list bordered hoverable>
          <n-list-item
            v-for="item in paginatedResults"
            :key="item.id"
            @click="tempSelected = item"
            :class="{ active: tempSelected?.id === item.id }"
            class="list-item"
          >
            <n-space justify="space-between" align="center">
              <span>{{ item.name }}</span>
              <n-tag
                size="small"
                :type="item.status === null ? 'default' : item.status ? 'success' : 'error'"
              >
                {{ item.status === null ? '—' : item.status ? 'Actif' : 'Inactif' }}
              </n-tag>
            </n-space>
          </n-list-item>
        </n-list>

        <!-- ✅ Pagination -->
        <n-pagination
          v-model:page="page"
          :page-size="pageSize"
          :item-count="filteredResults.length"
        />

        <!-- ✅ Boutons -->
        <n-space justify="end">
          <n-button @click="cancel">Annuler</n-button>
          <n-button type="primary" :disabled="!tempSelected" @click="validate"> Valider </n-button>
        </n-space>
      </n-space>
    </n-modal>
  </n-form-item>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  NPagination,
  NSpace,
  NModal,
  NFormItem,
  NButton,
  NTag,
  NText,
  NInput,
  NList,
  NListItem,
} from 'naive-ui'

/* ✅ TYPE */
export interface Problem {
  id: string
  name: string
  status: boolean | null
}

/* ✅ PROPS */
interface Props {
  modelValue: Problem | null
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Problème',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: Problem | null): void
}>()

/* ✅ MODAL */
const showModal = ref(false)

/* ✅ RECHERCHE */
const search = ref('')
const debouncedSearch = ref('')
const page = ref(1)
const pageSize = 5

/* ✅ SELECTION TEMPORAIRE */
const tempSelected = ref<Problem | null>(null)

/* ✅ MOCK API (remplaçable par Axios plus tard) */
const allProblems = ref<Problem[]>([
  { id: '1', name: 'Problème serveur', status: true },
  { id: '2', name: 'Bug interface', status: false },
  { id: '3', name: 'Erreur paiement', status: true },
  { id: '4', name: 'Problème réseau', status: null },
  { id: '5', name: 'Crash application', status: true },
  { id: '6', name: 'Bug affichage', status: false },
  { id: '7', name: 'Lenteur système', status: true },
])

/* ✅ DEBOUNCE 800ms */
let timer: number | null = null
watch(search, (val) => {
  if (timer) clearTimeout(timer)
  timer = window.setTimeout(() => {
    debouncedSearch.value = val
    page.value = 1
  }, 800)
})

/* ✅ FILTRAGE */
const filteredResults = computed(() => {
  if (!debouncedSearch.value) return allProblems.value

  const term = debouncedSearch.value.toLowerCase()
  return allProblems.value.filter((p) => p.name.toLowerCase().includes(term))
})

/* ✅ APERÇU */
const previewResults = computed(() => filteredResults.value.slice(0, 3))

/* ✅ PAGINATION */
const paginatedResults = computed(() => {
  const start = (page.value - 1) * pageSize
  return filteredResults.value.slice(start, start + pageSize)
})

/* ✅ ACTIONS */
function openModal() {
  tempSelected.value = props.modelValue
  showModal.value = true
}

function cancel() {
  showModal.value = false
  tempSelected.value = null
}

function validate() {
  emit('update:modelValue', tempSelected.value)
  showModal.value = false
}
</script>

<style scoped>
.list-item {
  cursor: pointer;
  transition: background 0.15s ease;
}

.list-item:hover {
  background: rgba(0, 0, 0, 0.05);
}

.list-item.active {
  background: rgba(24, 160, 88, 0.15);
}
</style>
