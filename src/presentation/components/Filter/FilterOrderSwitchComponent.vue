<template>
    <n-button class="order-button" @click="changeOrderButtonState = changeOrderButtonState === 'ASC' ? 'DESC' : 'ASC'">
        {{ changeOrderButtonState }}
    </n-button>
</template>
<script setup lang="ts">
    import { NButton } from 'naive-ui'
    import { defineProps, inject, onMounted, ref } from 'vue'

    const changeOrderButtonState = ref<'ASC' | 'DESC'>('ASC')
    const props = defineProps<{ fieldName: string }>()
    const registerChild = inject<(name: string, getValue: () => unknown) => void>('registerChild')
    // Fonction fournie au parent pour récupérer la valeur de l'enfant.
    function getValue() {
        return changeOrderButtonState.value
    }
    // Enregistrement du composant dans le parent
    onMounted(() => {
        if (registerChild) {
            registerChild(props.fieldName, getValue)
        } else {
            console.warn('Parent container not found for child registration...')
        }
    })
</script>

<style lang="scss" scoped>
    .order-button {
        width: 65px;
    }
</style>