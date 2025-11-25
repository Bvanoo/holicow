<script lang="ts" setup>
    import { useUserStore } from '@/stores/User';

    const usersStore = useUserStore();
    usersStore.checkIfNewUser()
</script>

<template>
    <div class="text-3xl font-bold underline">DiseasesView</div>
</template>