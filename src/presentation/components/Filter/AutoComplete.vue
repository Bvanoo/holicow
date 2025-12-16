<template>
  <div class="wrapper">
    <n-input
      v-model:value="query"
      placeholder="Rechercher..."
      @input="onInput"
      clearable
      ref="inputRef"
    />

    <n-popover
      :show="showPanel"
      :x="popoverX"
      :y="popoverY"
      trigger="manual"
      placement="bottom-start"
      raw
    >
      <div class="dropdown-container">
        <n-button
          quaternary
          v-for="item in filtered"
          :key="item.id"
          class="dropdown-item"
          @click="select(item)"
        >
          {{ item.label }}
        </n-button>
      </div>
    </n-popover>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { NInput, NPopover, NButton } from 'naive-ui'

interface Item {
  id: number
  label: string
}

// Exemple de données gettée depuis l'API
const items: Item[] = [
  { id: 1, label: 'Pomme' },
  { id: 2, label: 'Poire' },
  { id: 3, label: 'Banane' },
  { id: 4, label: 'Ananas' },
  { id: 5, label: 'Mangue' },
]

const query = ref('')
const filtered = ref<Item[]>([])

const inputRef = ref<InstanceType<typeof NInput> | null>(null)
const showPanel = ref(false)
const popoverX = ref(0)
const popoverY = ref(0)
let timer: number | null = null

const updatePopoverPosition = () => {
  const el = inputRef.value?.$el.querySelector('input') as HTMLElement
  if (!el) return // pour éviter le plantage

  const rect = el.getBoundingClientRect()
  popoverX.value = rect.left
  popoverY.value = rect.bottom
}

const onInput = () => {
  if (timer) clearTimeout(timer)

  timer = window.setTimeout(async () => {
    const q = query.value.trim().toLowerCase()

    filtered.value = q ? items.filter((i) => i.label.toLowerCase().includes(q)) : []

    showPanel.value = filtered.value.length > 0

    await nextTick()
    updatePopoverPosition()
  }, 800)
}

const select = (item: Item) => {
  query.value = item.label
  showPanel.value = false
}
</script>

<style scoped>
button {
  background: white;
}
.wrapper {
  position: relative;
  width: 100%;
}

.dropdown-container {
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-height: 240px;
  overflow-y: auto;
  z-index: 100;
}

.dropdown-item {
  padding: 8px 12px;
  text-align: left;
  background: white;
  border: none;
  cursor: pointer;
}

.dropdown-item:hover {
  background: #f3f3f3;
}
</style>