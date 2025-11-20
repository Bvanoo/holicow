<script lang="ts" setup>
    import router from '@/router';
    import { useUserStore } from '@/stores/user';

    const usersStore = useUserStore();
    if (usersStore.checkCurrentUser() === false) router.push("/notAllowed");

</script>

<template>
    <div>Homeview</div>
</template>