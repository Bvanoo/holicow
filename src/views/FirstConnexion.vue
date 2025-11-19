<script lang="ts" setup>

    import { NEl, NButton, NFlex } from 'naive-ui'
    import { useRouter } from 'vue-router'
    import { ref } from 'vue'
    import FirstConnexionCard from '@/components/FirstConnexion/FirstConnexionCard.vue'
    import CancelConnexionCard from '@/components/FirstConnexion/CancelConnexionCard.vue'

    const router = useRouter()

    //Text variables
    const introText =
        "Bienvenue sur l'application Holicow. Profitez de nos services pour identifier des maladies potentielles et profitez du partage de connaissance de tous nos membres pour mettre en place des solutions rapides et efficaces."

    //End Text variables

    //Variables click
    const isCancelLogin = ref(false)
    //End Variables click

    //Functions click
    const goToProfil = () => {
        router.push('/profil')
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
                <FirstConnexionCard />
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
