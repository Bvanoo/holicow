<script setup lang="ts">
    // \/ J'ai une erreur dans vscode mais c'est juste dans l'ide \/
    import AlertsChoice from './AlertsChoice.vue'
    import UserInfosChoice from './UserInfosChoice.vue'
    // /\ Fin Erreur /\
    import { NCard, NEl } from 'naive-ui'

    const firstTextConnexion =
        "C'est votre première connexion sur l'application Holicow en tant qu'éleveur. Afin de vous proposer les solutions les plus pertinentes nous définissons des groupes d'éleveur similaires appelé <strong>AVATARS</strong> qui seront représenté par des icones différentes (couleur de la vache de l'icone)."
    const secondTextConnexion =
        '<strong>' + 'Merci de remplir les champs ci-dessous afin de définir votre avatar.' + '</strong>'
</script>

<template>
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
</template>