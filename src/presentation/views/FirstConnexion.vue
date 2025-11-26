<script lang="ts" setup>

    import { NEl, NButton, NFlex } from 'naive-ui'
    import { onMounted, ref } from 'vue'
    import FirstConnexionCard from '@/presentation/components/FirstConnexion/FirstConnexionCard.vue'
    import CancelConnexionCard from '@/presentation/components/FirstConnexion/CancelConnexionCard.vue'
    import router from '@/router';
    import { useUserStore as useUserStore } from '@/stores/User';
    import type UserProfile from '@/domain/entities/IUserProfile';

    const userStore = useUserStore();
    if (!userStore.isNewProfil) router.push("/")
    onMounted(async () => {
    })
    //Variables click
    const isCancelLogin = ref(false)
    const userProfile = ref<UserProfile | void>()
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

    const updateUserChoices = (value: UserProfile) => {
        userStore.currentProfile = value
        userStore.updateProfile();
        console.log("userProfile.value", userProfile.value)
        router.push("/")
    }

    //End Functions click
</script>

<template>
    <n-flex vertical align="center" class="firstConnexion">

        <!--First connexion-->
        <div class="firstConnexion__main" v-if="!isCancelLogin">
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
