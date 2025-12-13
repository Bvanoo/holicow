<template>
  <div class="row-desktop">
    <div v-for="col in columns" :key="String(col.key)" class="desktop-cell">
      <slot :name="col.key" :row="row" :value="row[col.key]">

        <template v-if="col.key != titleKey && col.key !== 'actions'">
          {{ row[col.key] }}</template>
        <template v-else-if="col.key === 'actions'">
          <section class="mobile-card-footer-user">
            <n-button secondary type="info" @click="emit('action', row)">
              <!-- <n-icon :component="UpdateIcon" /> -->
              <!-- voir solution(s) -->
              {{ props.actionLabel }}
            </n-button>
            <n-button v-if="isAlert" secondary type="info" @click="emit('action', row)">
              <!-- <n-icon :component="UpdateIcon" /> -->
              <!-- voir solution(s) -->
              {{ props.actionLabelOne }}
            </n-button>
          </section>
        </template>
        <!--Title-->
        <template v-else>
          <span class="titleKey">{{ row[col.key] }}</span>
        </template>
      </slot>
    </div>

    <!-- <div class="desktop-admin"> -->
    <div v-if="isAuthorized" class="desktop-admin">
      <n-button circle color="green" @click="emit('edit', row)">
        <n-icon :component="UpdateIcon" />
      </n-button>

      <n-button circle color="red" @click="emit('delete', row)">
        <n-icon :component="DeleteIcon" />
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends object">
  import { NButton, NIcon } from 'naive-ui'
  import UpdateIcon from '../icons/UpdateIcon.vue'
  import DeleteIcon from '../icons/DeleteIcon.vue'
  import type { ColumnDefinition } from '@/presentation/components/Table/TableTypes'

  const props = defineProps<{
    row: T
    columns: ColumnDefinition<T>[]
    isAuthorized: boolean
    isAlert?: boolean
    actionLabel: string
    actionLabelOne?: string
    titleKey: string
  }>()

  const emit = defineEmits<{
    (e: 'edit', row: T): void
    (e: 'delete', row: T): void
    (e: 'action', row: T): void
  }>()
</script>

<style scoped>
  .row-desktop {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 12px;
    padding: 8px;
  }

  .desktop-cell {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .titleKey {
    font-weight: 700;
    font-size: 1rem;
  }

  .desktop-admin {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    z-index: 200;
  }
</style>
