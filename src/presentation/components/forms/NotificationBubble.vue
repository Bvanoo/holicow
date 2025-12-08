<template>
  <n-card class="notification-bubble" size="small">
    <!-- HEADER -->
    <div class="header">
      <div class="icon-wrapper">
        <n-icon size="18">
          <NotificationsOutline />
        </n-icon>
      </div>
      <span class="header-title">{{ title }}</span>
    </div>

    <!-- SECTIONS -->
    <div class="section" v-for="(section, index) in sections" :key="index">
      <div class="section-title">{{ section.title }}</div>
      <div class="section-content">{{ section.content }}</div>
    </div>

    <!-- FOOTER -->
    <div class="footer">
      <n-button size="small" @click="onCancel">Annuler</n-button>
      <n-button size="small" type="primary" @click="onValidate"> Valider </n-button>
    </div>
  </n-card>
</template>

<script setup lang="ts">
  import { NCard, NButton, NIcon } from 'naive-ui'
  import { NotificationsOutline } from '@vicons/ionicons5'

  interface Section {
    title: string
    content: string
  }

  defineProps<{
    title: string
    sections: Section[]
  }>()

  const emit = defineEmits<{
    (e: 'validate'): void
    (e: 'cancel'): void
  }>()

  function onValidate() {
    emit('validate')
  }

  function onCancel() {
    emit('cancel')
  }
</script>

<style scoped>
  .notification-bubble {
    width: 320px;
    border-radius: 12px;
  }

  /* HEADER */
  .header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 14px;
  }

  .icon-wrapper {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #f0f2f5;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header-title {
    font-weight: 600;
    font-size: 15px;
  }

  /* SECTIONS */
  .section {
    margin-bottom: 12px;
  }

  .section-title {
    font-weight: 600;
    font-size: 13px;
    margin-bottom: 4px;
  }

  .section-content {
    font-size: 12px;
    color: #666;
  }

  /* FOOTER */
  .footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 12px;
  }
</style>
