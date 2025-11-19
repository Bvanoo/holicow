<script lang="ts" setup>
    import AlertsChoice from '../components/firstConnexion/AlertsChoice.vue';
    import UserInfosChoice from '../components/firstConnexion/UserInfosChoice.vue';
    import { NCard, NEl, NButton, NFlex } from 'naive-ui'

    const introText = "Bienvenue sur l'application Holicow. Profitez de nos services pour identifier des maladies potentielles et profitez du partage de connaissance de tous nos membres pour mettre en place des solutions rapides et efficaces."
    const firstTextConnexion = "C'est votre première connexion sur l'application Holicow en tant qu'éleveur. Afin de vous proposer les solutions les plus pertinentes nous définissons des groupes d'éleveur similaires appelé <strong>AVATARS</strong> qui seront représenté par des icones différentes (couleur de la vache de l'icone)."
    const secondTextConnexion = "<strong>" + "Merci de remplir les champs ci-dessous afin de définir votre avatar." + "</strong>"
</script>

<template>
    <n-flex vertical align="center" class="firstConnexion">
        <!--Intro text-->
        <n-el tag="header">
            <p v-html="introText" class="firstConnexion__paragraph"></p>
        </n-el>
        <!--End Intro text-->

        <n-flex vertical align="center" class="firstConnexion__main">
            <n-card title="Première connexion" class="firstConnexion__card">
                <!--first connexion text-->
                <n-el tag="header" class="firstConnexion__paragraph">
                    <p v-html="firstTextConnexion"></p>
                </n-el>
                <!--End first connexion text-->

                <n-el tag="main">
                    <!--second connexion text-->
                    <n-el tag="div" class="firstConnexion__paragraph">
                        <p v-html="secondTextConnexion"></p>
                    </n-el>
                    <!--End second connexion text-->
                    <UserInfosChoice />
                    <AlertsChoice />
                </n-el>
            </n-card>
            <n-el tag="p">Vous pourrez modifier ces informations ultérieurement en cliquant sur votre profil.</n-el>
            <n-flex>
                <n-button quaternary>Annuler</n-button>
                <n-button type="primary">Valider</n-button>
            </n-flex>
        </n-flex>
    </n-flex>
</template>
