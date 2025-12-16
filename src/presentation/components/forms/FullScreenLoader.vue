<script setup lang="ts">
import { NSpin } from 'naive-ui'

defineProps<{
  show: boolean
  text?: string
}>()
</script>

<template>
  <transition name="fade">
    <div v-if="show" class="loader-overlay">
      <div class="loader-content">
        <n-spin size="large" />
        <p class="loader-text">{{ text || 'Chargement...' }}</p>
      </div>
    </div>
  </transition>
</template>

<style scoped>
/* Fond plein écran */
.loader-overlay {
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

/* Contenu centré */
.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

/* Texte animé */
.loader-text {
  color: white;
  font-size: 1.1rem;
  letter-spacing: 1px;
  animation: pulse 1.5s infinite ease-in-out;
}

/* Animation texte */
@keyframes pulse {
  0% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.4;
  }
}

/* Transition fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
