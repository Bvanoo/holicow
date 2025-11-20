<script lang="ts" setup>
    import { useFarmerStore } from '@/stores/farmer';

    const usersStore = useFarmerStore();
    usersStore.checkCurrentFarmer()

</script>

<template>
    <div class="text-3xl font-bold underline">DiseasesView</div>
</template>