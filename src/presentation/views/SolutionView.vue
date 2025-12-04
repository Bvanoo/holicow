<template>
    <SolutionContainer :items="[
        {
            id: 110,
            disease: 'Mamite - Mammite subclinique',
            description: 'une description complète de l\'objet ciblé',
            category: 'a',
            alerts: 11,
            avatar: 'thu12345',
        },

    ]" />
</template>

<script setup lang="ts">
    import SolutionContainer from '../components/SolutionContainer.vue';

</script>