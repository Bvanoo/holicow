<script setup lang="ts">
    import { NCard } from 'naive-ui';

    const emit = defineEmits<{
        (event: 'quitApp', value: boolean): void,
        (event: 'cancelQuitApp', value: boolean): void,
    }>();

</script>

<template>
    <n-card title="Déconnexion" class="firstConnexion__card">
        Vous avez choisi de ne pas vous connecter sur l'application Holicow.
        Nous espérons vous revoir bientôt!
        <div>
            <p>Vous pourrez modifier ces informations ultérieurement en cliquant sur votre profil.</p>
            <n-flex justify="center">
                <n-button quaternary @click.prevent="emit('quitApp', true)">Retour WALLeSmart</n-button>
                <n-button type="primary" @click.prevent="emit('cancelQuitApp', true)">Se connecter</n-button>
            </n-flex>
        </div>
    </n-card>

</template>