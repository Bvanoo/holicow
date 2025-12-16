<template>
  <n-form-item :label="label">
    <n-space align="center" :size="6">
      <n-button
        v-for="i in max"
        :key="i"
        text
        size="large"
        class="star-button"
        :class="{ active: displayValue >= i }"
        @mouseenter="hoverValue = i"
        @mouseleave="hoverValue = 0"
        @click="updateValue(i)"
      >
        {{ displayValue >= i ? '★' : '☆' }}
      </n-button>

      <n-text depth="3"> {{ modelValue }}/{{ max }} </n-text>
    </n-space>
  </n-form-item>
</template>

<script setup lang="ts">
import { NFormItem, NSpace, NButton, NText } from 'naive-ui'
import { computed, ref } from 'vue'

interface Props {
  modelValue: number
  max?: number
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  max: 5,
  label: 'Note',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const hoverValue = ref(0)

const displayValue = computed(() => (hoverValue.value > 0 ? hoverValue.value : props.modelValue))

function updateValue(value: number) {
  emit('update:modelValue', value)
}
</script>

<style scoped>
.star-button {
  border: none !important;
  font-size: 28px;
  padding: 0 4px;
  transition:
    transform 0.15s ease,
    color 0.15s ease;
}

.star-button.active {
  transform: scale(1.15);
}

.star-button:hover {
  transform: scale(1.3);
}
</style>
