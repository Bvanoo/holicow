<script setup lang="ts">
    import { NEl, NSelect, NGi, NGrid } from 'naive-ui';
    import { ref } from 'vue';

    const valueRegion = ref<number | string>("");
    const valueBio = ref<number | string>("");
    const valueRobot = ref<number | string>("");

    const optionsRegion = [
        {
            label: 'Herbagère',
            value: 0,
        },
        {
            label: 'Hautes Ardennes',
            value: 1,
        },
        {
            label: 'Autres provinces',
            value: 2,
        }
    ]
    const optionsBio = [
        {
            label: 'Non',
            value: 0,
        },
        {
            label: 'Oui',
            value: 1,
        },
    ]
    const optionsRobot = [
        {
            label: 'Non',
            value: 0,
        },
        {
            label: 'Oui',
            value: 1,
        },
    ]

    //Emits
    const emit = defineEmits<{
        (event: 'updateRegion', value: number | string): void,
        (event: 'updateBio', value: number | string): void
        (event: 'updateRobot', value: number | string): void
    }>();

    const updateValueRegion = () => {
        const index: number = typeof valueRegion.value === "string" ? 0 : valueRegion.value;
        const region: string = typeof optionsRegion[index]?.label === "undefined" ? "" : optionsRegion[index]?.label;
        emit("updateRegion", region)
    }
    const updateValueBio = () => {
        const index: number = typeof valueBio.value === "string" ? 0 : valueBio.value;
        const bio: number = typeof optionsBio[index]?.value === "undefined" ? 0 : optionsBio[index]?.value;
        emit("updateBio", bio)
    }
    const updateValueRobot = () => {
        const index: number = typeof valueRobot.value === "string" ? 0 : valueRobot.value;
        const robot: number = typeof optionsRobot[index]?.value === "undefined" ? 0 : optionsRobot[index]?.value;
        emit("updateRobot", robot)
    }
    //End Emits

</script>

<template>
    <n-grid y-gap="16" :cols="2" item-responsive responsive="screen" class="firstConnexion__card__types">
        <n-gi>
            <n-el tag="span">Région* :</n-el>
        </n-gi>
        <n-gi>
            <n-select :options="optionsRegion" v-model:value="valueRegion" @update:value="updateValueRegion" />
        </n-gi>
        <n-gi>
            <n-el tag="span">Bio* :</n-el>
        </n-gi>
        <n-gi>
            <n-select :options="optionsBio" v-model:value="valueBio" @update:value="updateValueBio" />
        </n-gi>
        <n-gi>
            <n-el tag="span">Robot* :</n-el>
        </n-gi>
        <n-gi>
            <n-select :options="optionsRobot" v-model:value="valueRobot" @update:value="updateValueRobot" />
        </n-gi>
    </n-grid>
</template>