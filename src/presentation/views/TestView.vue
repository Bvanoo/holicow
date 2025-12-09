<template>
    <SolutionItem :global-note="5" :my-note="3" :problem-name="'Mastite'" :subproblem-name="'Mammite chronique'" />
</template>

<script setup lang="ts">
    import SolutionItem from '../components/SolutionItem.vue';

</script>

<style scoped>
    .empty-block {
        color: white !important;
    }
</style>