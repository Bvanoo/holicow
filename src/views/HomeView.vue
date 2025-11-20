<script lang="ts" setup>
    import { useUserStore } from '@/stores/user';

    const usersStore = useUserStore();
    usersStore.checkCurrentUser()

</script>

<template>
    <div>Homeview</div>
</template>