<script lang="ts" setup>
    import { useFarmerStore } from '@/stores/User';

    const usersStore = useFarmerStore();
    usersStore.checkIfNewUser()
</script>

<template>
    <div class="text-3xl font-bold underline">AlertsView</div>
</template>