<template>
    <n-input v-model:value="value" placeholder="Entrer une valeur"></n-input>
</template>
<script setup lang="ts">
    import { NInput } from 'naive-ui'
    import { ref, inject, onMounted, defineProps } from 'vue'

    // Contient la valeur du composant enfant
    const value = ref<string>('')
    const props = defineProps<{ fieldName: string }>()

    // Récupération de la fonction RegisterChild du parent
    const registerChild = inject<(name: string, getValue: () => unknown) => void>('registerChild')

    // Création de l'identifiant unique du composant enfant (impératif pour les différencier dans le parent)
    // Peut aussi être passé en props
    const childId = `child-${crypto.randomUUID()}`

    // Fonction fournie au parent pour récupérer la valeur de l'enfant.
    function getValue() {
        return value.value
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