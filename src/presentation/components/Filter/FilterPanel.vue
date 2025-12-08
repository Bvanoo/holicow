<template>
    <n-card class="main-container">
        <template #header>
            <div class="section-header">{{ title }}</div>
        </template>
        <section class="section-body">
            <slot />
        </section>
        <template #footer>
            <slot name="footer" />
            <n-button class="filter-button" @click="emitAllValues">Valider</n-button>
        </template>
    </n-card>
</template>

<script setup lang="ts">
    import { NCard } from 'naive-ui'
    import { defineProps, defineEmits, provide, reactive } from 'vue'

    defineProps<{ title: string }>()
    const emit = defineEmits<{
        (e: 'submit', payload: Record<string, unknown>): void
    }>()

    interface RegisteredChild {
        name: string
        getValue: () => unknown
    }

    const children = reactive<RegisteredChild[]>([])

    function registerChild(name: string, getValue: () => unknown) {
        children.push({ name, getValue })
    }
    // Prépare registerChild pour l'injection dans les enfants
    provide('registerChild', registerChild)

    function emitAllValues() {
        const payload: Record<string, unknown> = {}
        for (const child of children) {
            payload[child.name] = child.getValue()
        }
        emit('submit', payload)
    }
</script>

<style scoped>
    .main-container {
        width: 100%;
        margin-bottom: 1rem;
    }

    .section-header {
        font-size: 1.2rem;
        font-weight: bold;
    }

    .section-body {
        padding: 1rem 0;
    }

    .section-footer {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
    }
</style>