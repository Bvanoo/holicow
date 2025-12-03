<template>
    <n-select v-model:value="selectedColumnId" :options="options"></n-select>
</template>
<script setup lang="ts">
    import { NSelect } from 'naive-ui'
    import { defineProps, inject, onMounted, ref } from 'vue'

    const selectedColumnId = ref<string | number | null>(null)
    const props = defineProps<{ fieldName: string; options: { label: string; value: string }[] }>()

    const registerChild = inject<(name: string, getValue: () => unknown) => void>('registerChild')
    const childId = `child-${crypto.randomUUID()}`

    // Fonction fournie au parent pour récupérer la valeur de l'enfant.
    function getValue() {
        return selectedColumnId.value
    }

    // Enregistrement du composant dans le parent
    onMounted(() => {
        if (registerChild) {
            registerChild(props.fieldName || childId, getValue)
        } else {
            console.warn('Parent container not found for child registration...')
        }
    })
</script>