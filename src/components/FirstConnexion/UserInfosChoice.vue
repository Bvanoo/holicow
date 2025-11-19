<script setup lang="ts">
    import { NEl, NDropdown, NGi, NGrid, NButton, useMessage } from 'naive-ui';

    const message = useMessage();

    const optionsAnimalType = [
        {
            label: 'Option 1',
            key: 'option1',
        },
        {
            label: 'Option 2',
            key: 'option2',
        },
        {
            label: 'Option 3',
            key: 'option3',
        }
    ]
    const optionsFoodType = [
        {
            label: 'Option 1',
            key: 'option1',
        },
        {
            label: 'Option 2',
            key: 'option2',
        },
        {
            label: 'Option 3',
            key: 'option3',
        }
    ]
    const optionsSoilType = [
        {
            label: 'Option 1',
            key: 'option1',
        },
        {
            label: 'Option 2',
            key: 'option2',
        },
        {
            label: 'Option 3',
            key: 'option3',
        }
    ]

    function handleSelect(key: string | number) {
        message.info(String(key))
    }

</script>

<template>
    <n-grid y-gap="16" :cols="2" item-responsive responsive="screen" class="firstConnexion__card__types">
        <n-gi>
            <n-el tag="span">Type d'animal* :</n-el>
        </n-gi>
        <n-gi>
            <n-dropdown trigger="hover" :options="optionsAnimalType" @select="handleSelect">
                <n-button secondary>Type d'animal</n-button>
            </n-dropdown>
        </n-gi>
        <n-gi>
            <n-el tag="span">Type de nourriture* :</n-el>
        </n-gi>
        <n-gi>
            <n-dropdown trigger="hover" :options="optionsFoodType" @select="handleSelect">
                <n-button secondary>Type de nourriture</n-button>
            </n-dropdown>
        </n-gi>
        <n-gi>
            <n-el tag="span">Type de sol* :</n-el>
        </n-gi>
        <n-gi>
            <n-dropdown trigger="hover" :options="optionsSoilType" @select="handleSelect">
                <n-button secondary>Type de sol</n-button>
            </n-dropdown>
        </n-gi>
    </n-grid>
</template>