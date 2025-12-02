<script lang="ts" setup>
    import { AlertsService } from '@/domain/services/AlertsService';
    import { useUserStore } from '@/stores/User';
    import { inject } from 'vue';

    const alertsService = inject<AlertsService>("alertService");
    console.log("alerts", await alertsService?.getAllAlertsByUserId("FARM001", "fr", 1, 3))

</script>

<template>
    <!-- <div class="tesImage">
        <img class="logo" src="/logos/Herbagere.png">
        <img class="stars" src="/logos/star4.png">
    </div> -->
    <div class="text-3xl font-bold underline">HomeView</div>

</template>

<style lang="scss" scoped>
    // .tesImage {
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     position: relative;

    //     img {
    //         width: 96px;
    //         height: 96px;
    //         border-radius: 100%;
    //     }

    //     .logo {
    //         background-color: rgba(255, 0, 0, 0.189);
    //     }

    //     .stars {
    //         position: absolute;
    //         top: -10px;

    //     }
    // }

</style>
