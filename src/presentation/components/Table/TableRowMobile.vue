<template>
  <section class="mobile-card">
    <div class="mobile-card-header">
      {{ row[titleKey as keyof typeof row] ?? 'Titles' }}
    </div>

    <div class="mobile-card-body">
      <div class="mobile-field" v-for="col in columns" :key="String(col.key)">
        <template v-if="col.key !== titleKey">
          <div class="mobile-label">
            <n-icon v-if="col.icon" :component="col.icon" />
            {{ col.label }}
          </div>

          <div class="mobile-value">
            <slot :name="col.key" :value="row[col.key]" :row="row">
              {{ row[col.key] }}
            </slot>
          </div>
        </template>
      </div>
    </div>

    <div class="mobile-card-footer">
      <section class="mobile-card-footer-user">
        <n-button secondary type="info" @click="emit('action', row)">
          <!-- <n-icon :component="UpdateIcon" /> -->
          <!-- voir solution(s) -->
          {{ props.actionLabel }}
        </n-button>
      </section>
      <section v-if="isAuthorized" class="mobile-card-footer-crud">
        <n-button class="crud-button" circle type="primary" @click="emit('edit', row)">
          <n-icon :component="UpdateIcon" />
        </n-button>

        <n-button class="crud-button" circle color="red" @click="emit('delete', row)">
          <n-icon :component="DeleteIcon" />
        </n-button>
      </section>
    </div>
  </section>
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
    titleKey: string,
    actionLabel: string
  }>()

  const emit = defineEmits<{
    (e: 'edit', row: T): void
    (e: 'delete', row: T): void
    (e: 'action', row: T): void
  }>()
</script>

<style scoped>
  .mobile-card {
    border: 1px solid #eee;
    border-radius: 8px;
    margin-bottom: 12px;
  }

  .n-card::after {
    position: relative;
  }

  .mobile-card-header {
    font-weight: 700;
    font-size: 20px;
    padding: 12px;
    border-bottom: 1px solid #eee;
  }

  .mobile-card-body {
    padding: 12px;
  }

  .mobile-field {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .mobile-label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 600;
    color: #555;
  }

  .mobile-icon {
    font-size: 18px;
  }

  .mobile-value {
    color: #444;
  }

  .mobile-card-footer {
    padding: 16px 12px;
    gap: 16px;
    z-index: 1000;
    border-bottom: 1px solid #eee;
  }

  .mobile-card-footer-user {
    display: flex;
    justify-content: flex-end;
    padding: 16px 0;
    z-index: 400;
  }

  .mobile-card-footer-crud {
    display: flex;
    justify-content: flex-end;
    z-index: 300;
    gap: 10px;
  }
</style>
