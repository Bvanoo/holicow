<script lang="ts" setup>
    import { useFarmerStore } from '@/stores/farmer';

    const usersStore = useFarmerStore();
    usersStore.checkCurrentFarmer();

</script>

<template>
    <div>Homeview</div>
</template>