<template>
  <n-card :style="'padding: 0;'" class="row-container" :bordered="true">
    <div class="row-inner">
      <slot />
    </div>
  </n-card>
</template>

<script setup lang="ts">
// Composant générique conteneur de ligne
import { NCard } from 'naive-ui'
</script>

<style scoped>
.row-container {
  width: 100%;
  background: white;
  /* transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); */
}

.row-container {
  cursor: pointer;
  position: relative;
}

.row-container::after {
  content: '';
  inset: 0;
  border: 2px solid transparent;
  transition: border-color 0.25s ease;
}

.row-container:hover::after {
  border-color: rgba(0, 0, 0, 0.1);
}
</style>
