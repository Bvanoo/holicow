<script setup lang="ts">
    import { NEl, NFlex, NCheckbox, NInput } from 'naive-ui';
    import { ref } from 'vue';
    const mailValue = ref(false);
    const phoneValue = ref(false);

    const mail = ref("");
    const phone = ref("");
</script>

<template>
    <n-flex vertical class="firstConnexion__alertsChoice">
        <n-el tag="p" class="firstConnexion__paragraph">
            Recevoir les alertes maladie via :
        </n-el>
        <n-flex vertical class="firstConnexion__card__alerts">
            <n-checkbox v-model:checked="mailValue">
                Mail
            </n-checkbox>
            <n-input v-if="mailValue" v-model="mail" placeholder="Entrez votre mail" />
            <n-checkbox v-model:checked="phoneValue">
                SMS
            </n-checkbox>
            <n-input v-if="phoneValue" v-model="phone" placeholder="Entrez votre n° de téléphone" />

        </n-flex>
    </n-flex>
</template>