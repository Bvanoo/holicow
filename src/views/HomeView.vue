<script lang="ts" setup>
    import { useUserStore } from '@/stores/User';

    const usersStore = useUserStore();
    usersStore.checkIfNewUser()

</script>

<template>
    <div class="tesImage">
        <img class="logo" src="/logos/Herbagere.png">
        <img class="stars" src="/logos/star4.png">
    </div>
</template>

<style lang="scss" scoped>
    .tesImage {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        img {
            width: 96px;
            height: 96px;
            border-radius: 100%;
        }

        .logo {
            background-color: rgba(255, 0, 0, 0.189);
        }

        .stars {
            position: absolute;
            top: -10px;

        }
    }

</style>
