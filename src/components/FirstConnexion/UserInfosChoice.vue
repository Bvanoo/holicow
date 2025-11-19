<script setup lang="ts">
    import { NEl, NSelect, NGi, NGrid } from 'naive-ui';
    import { ref } from 'vue';

    const valueAnimalType = ref<number | string>("");
    const valueFoodType = ref<number | string>("");
    const valueSoilType = ref<number | string>("");
    const optionsAnimalType = [
        {
            label: 'Option 1',
            value: 0,
        },
        {
            label: 'Option 2',
            value: 1,
        },
        {
            label: 'Option 3',
            value: 2,
        }
    ]
    const optionsFoodType = [
        {
            label: 'Option 1',
            value: 'option1',
        },
        {
            label: 'Option 2',
            value: 'option2',
        },
        {
            label: 'Option 3',
            value: 'option3',
        }
    ]
    const optionsSoilType = [
        {
            label: 'Option 1',
            value: 'option1',
        },
        {
            label: 'Option 2',
            value: 'option2',
        },
        {
            label: 'Option 3',
            value: 'option3',
        }
    ]

    const test = () => {
        console.log("valueAnimalType.value", valueAnimalType.value)
        // const index: number = typeof valueAnimalType.value === "string" ? 0 : valueAnimalType.value;
        // console.log(optionsAnimalType[index])
    }

</script>

<template>
    <n-grid y-gap="16" :cols="2" item-responsive responsive="screen" class="firstConnexion__card__types">
        <n-gi>
            <n-el tag="span">Type d'animal* :</n-el>
        </n-gi>
        <n-gi>
            <n-select :options="optionsAnimalType" v-model:value="valueAnimalType" @update:value="test" />
        </n-gi>
        <n-gi>
            <n-el tag="span">Type de nourriture* :</n-el>
        </n-gi>
        <n-gi>
            <n-select :options="optionsFoodType" v-model:value="valueFoodType" />
        </n-gi>
        <n-gi>
            <n-el tag="span">Type de sol* :</n-el>
        </n-gi>
        <n-gi>
            <n-select :options="optionsSoilType" v-model:value="valueSoilType" />
        </n-gi>
    </n-grid>
</template>