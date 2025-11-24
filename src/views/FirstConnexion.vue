<script lang="ts" setup>

    import { NEl, NButton, NFlex } from 'naive-ui'
    import { onMounted, ref } from 'vue'
    import FirstConnexionCard from '@/components/FirstConnexion/FirstConnexionCard.vue'
    import CancelConnexionCard from '@/components/FirstConnexion/CancelConnexionCard.vue'
    import router from '@/router';
    import { useFarmerStore } from '@/stores/User';
    import type UserUpdate from '@/entities/userUpdate';

    const farmerStore = useFarmerStore();

    onMounted(async () => {
    })
    //Variables click
    const isCancelLogin = ref(false)
    const userUpdate = ref<UserUpdate | void>()
    //End Variables click

    //Functions click
    const goToProfil = () => {
        router.push('/profile')
    }

    const cancelLogin = () => {
        isCancelLogin.value = true
    }
    const quitApp = () => {
        isCancelLogin.value = true
    }
    const quitLogin = () => {
        isCancelLogin.value = true
    }
    const cancelQuitApp = () => {
        isCancelLogin.value = false
    }

    const updateUserChoices = (value: UserUpdate) => {
        userUpdate.value = value;
        console.log("userRegion.value", userUpdate.value)
    }

    //End Functions click
</script>

<template>
    <n-flex vertical align="center" class="firstConnexion">

        <!--First connexion-->
        <div class="firstConnexion__main" v-if="!isCancelLogin">
            <h1 class="firstConnexion__main__title">Votre première connexion</h1>
            <FirstConnexionCard @updateUserChoices="updateUserChoices" @quitLogin="quitLogin" />
        </div>
        <!--End First connexion-->

        <!--Cancel connexion-->
        <div v-if="isCancelLogin">
            <CancelConnexionCard @quitApp="quitApp" @cancelQuitApp="cancelQuitApp" />
        </div>
        <!--End Cancel connexion-->

    </n-flex>
</template>
