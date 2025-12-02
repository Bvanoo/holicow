<template>
  <div>solutions</div>
</template>

<script setup lang="ts">
import type { SolutionService } from '@/domain/services/SolutionService'
import { inject, onMounted } from 'vue'

const solutionService = inject<SolutionService>('solutionService')

onMounted(async () => {
  const solutions = await solutionService?.getAllSolution(1, 2)
  console.log('solutions', solutions)
})
</script>

<style scoped></style>
