<script lang="ts" setup>
    const props = defineProps<{
        logoInterreg?: string
    }>()
</script>

<template>
    <img :src="props.logoInterreg" alt="logo" class="logo interreg" />

</template>