<script lang="ts" setup>

    import { NEl, NButton, NFlex } from 'naive-ui'
    import { useRouter } from 'vue-router'
    import { onMounted, ref } from 'vue'
    import FirstConnexionCard from '@/components/FirstConnexion/FirstConnexionCard.vue'
    import CancelConnexionCard from '@/components/FirstConnexion/CancelConnexionCard.vue'
    import { useUserStore } from '@/stores/user'

    const router = useRouter()
    const userStore = useUserStore();
    onMounted(async () => {
        if (userStore.getCurrentUser) {
            router.push("/profile")
        }
    })

    //Text variables
    const introText =
        "Bienvenue sur l'application Holicow. Profitez de nos services pour identifier des maladies potentielles et profitez du partage de connaissance de tous nos membres pour mettre en place des solutions rapides et efficaces."

    //End Text variables

    //Variables click
    const isCancelLogin = ref(false)
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
    const undoCancelLogin = () => {
        isCancelLogin.value = false
    }

    const userRegion = ref<number | string>("")
    const userBio = ref<number | string>("")
    const userRobot = ref<number | string>("")

    const updateRegion = (newRegion: number | string) => {
        userRegion.value = newRegion;
        console.log("userRegion.value", userRegion.value)
    }
    const updateBio = (newbio: number | string) => {
        userBio.value = newbio;
        console.log("userBio.value", userBio.value)
    }
    const updateRobot = (newRobot: number | string) => {
        userRobot.value = newRobot;
        console.log("userRobot.value", userRobot.value)
    }

    //End Functions click
</script>

<template>
    <n-flex vertical align="center" class="firstConnexion">
        <!--Intro text-->
        <n-el tag="header">
            <p v-html="introText" class="firstConnexion__paragraph"></p>
        </n-el>
        <!--End Intro text-->

        <n-flex vertical align="center" class="firstConnexion__main">
            <!--First connexion-->
            <n-el tag="div" v-if="!isCancelLogin">
                <FirstConnexionCard @updateRegion="updateRegion" @updateBio="updateBio" @updateRobot="updateRobot" />
                <n-el tag="div">
                    <n-el tag="p">Vous pourrez modifier ces informations ultérieurement en cliquant sur votre
                        profil.</n-el>
                    <n-flex justify="center">
                        <n-button quaternary @click.prevent="cancelLogin">Annuler</n-button>
                        <n-button type="primary" @click.prevent="goToProfil">Valider</n-button>
                    </n-flex>
                </n-el>
            </n-el>
            <!--End First connexion-->

            <!--Cancel connexion-->
            <n-el tag="div" v-if="isCancelLogin">
                <CancelConnexionCard />
                <n-el tag="div">
                    <n-el tag="p">Vous pourrez modifier ces informations ultérieurement en cliquant sur votre
                        profil.</n-el>
                    <n-flex justify="center">
                        <n-button quaternary @click.prevent="quitApp">Retour WALLeSmart</n-button>
                        <n-button type="primary" @click.prevent="undoCancelLogin">Se connecter</n-button>
                    </n-flex>
                </n-el>
            </n-el>
            <!--End Cancel connexion-->

        </n-flex>
    </n-flex>
</template>
