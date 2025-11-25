<script lang="ts" setup>
    import { useUserStore } from '@/stores/user';

    const usersStore = useUserStore();
    usersStore.checkCurrentUser()

</script>

<template>
    <div class="text-3xl font-bold underline">AlertsView</div>
</template>