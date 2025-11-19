<script setup lang="ts">
    import { NEl, NFlex, NCheckbox } from 'naive-ui';
    import { ref } from 'vue';
    const mailValue = ref(false);
    const smsValue = ref(false);
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
            <n-checkbox v-model:checked="smsValue">
                SMS
            </n-checkbox>
        </n-flex>
    </n-flex>
</template>