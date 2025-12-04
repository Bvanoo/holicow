<script lang="ts" setup>
    const props = defineProps<{
        logoSrcUE?: string
    }>()
</script>

<template>
    <img v-if="props.logoSrcUE" :src="props.logoSrcUE" alt="logo" class="logo UE"
        style="background-color: white; height:150px;" />

</template>