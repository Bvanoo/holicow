<script setup lang="ts">
    import { type FormInst, NEl, NSelect, NGrid, NForm, NButton, NFormItemGi, NRadioGroup, NRadioButton, NGi, NFlex, NCheckboxGroup, NSpace, NCheckbox, NFormItem } from 'naive-ui';
    import { ref } from 'vue';
    import type UserUpdate from '@/entities/userUpdate';

    const optionsRegion = [
        {
            label: 'Herbagère',
            value: 'Herbagère',
        },
        {
            label: 'Hautes Ardennes',
            value: 'Hautes Ardennes',
        },
        {
            label: 'Autres provinces',
            value: 'Autres provinces',
        }
    ]

    //Emits
    const emit = defineEmits<{
        (event: 'updateUserChoices', value: UserUpdate): void,
        (event: 'quitLogin', value: boolean): void,
    }>();

    const UserUpdateRef = ref<FormInst | null>(null)
    const UserUpdateSize = ref<'small' | 'medium' | 'large'>('large')
    const UserUpdateValues = ref({ region: undefined, bio: false, robot: false, phone_notif: false, mail_notif: false } as UserUpdate)

    const rules =
    {
        region: {
            required: true,
            message: 'Sélectionnez la région',
            trigger: ['select']
        },
        bio: {
            required: true,
            message: 'Êtes-vous bio ?',
            trigger: ['change']
        },
        robot: {
            required: true,
            message: 'Avez-vous des robots ?',
            trigger: ['change']
        },
    }

    function handleValidateClick(e: MouseEvent) {
        e.preventDefault()
        UserUpdateRef.value?.validate((errors) => {
            if (!errors) {
                // message.success('Valid')
                emit("updateUserChoices", UserUpdateRef.value?.model)
            }
            else {
                console.error(errors)
                // message.error('Invalid')
            }
        })
    }

</script>

<template>

    <n-form class="firstConnexion__card" ref="UserUpdateRef" inline :label-width="18" :model="UserUpdateValues"
        :rules="rules" :size="UserUpdateSize">

        <div class="firstConnexion__card__infos">
            <div class="firstConnexion__card__choices">
                <h3>Vos infos</h3>
                <!-- Région -->
                <div class="choices">
                    <n-form-item label="Région" path="region">
                        <n-select class="firstConnexion__formItem" :options="optionsRegion"
                            v-model:value="UserUpdateValues.region" placeholder="Choisir" />
                    </n-form-item>
                    <!-- Bio -->
                    <n-form-item label="Bio" path="bio">
                        <n-radio-group v-model:value="UserUpdateValues.bio" name="radiogroup2">
                            <n-radio-button value="true">Oui</n-radio-button>
                            <n-radio-button value="false">Non</n-radio-button>
                        </n-radio-group>
                    </n-form-item>
                    <!-- Robots -->
                    <n-form-item label="Robots" path="robot">
                        <n-radio-group v-model:value="UserUpdateValues.robot" name="radiogroup2">
                            <n-radio-button value="true">Oui</n-radio-button>
                            <n-radio-button value="false">Non</n-radio-button>
                        </n-radio-group>
                    </n-form-item>
                </div>
            </div>
            <!-- Alertes -->

            <div class="firstConnexion__card__alerts">
                <h3>Alertes maladie</h3>
                <!-- Alertes/email -->
                <div class="alerts">
                    <div class="alerts__title">
                        <span>Email</span>
                        <n-radio-group v-model:value="UserUpdateValues.mail_notif" name="mail_notif">
                            <n-radio-button value=true>Oui</n-radio-button>
                            <n-radio-button value=false>Non</n-radio-button>
                        </n-radio-group>
                    </div>
                    <!-- Alertes/phone -->
                    <div class="alerts__title">
                        <span class="firstConnexion__span">Phone</span>
                        <n-radio-group v-model:value="UserUpdateValues.phone_notif" name="phone_notif">
                            <n-radio-button value="true">Oui</n-radio-button>
                            <n-radio-button value="false">Non</n-radio-button>
                        </n-radio-group>
                    </div>
                </div>
            </div>
        </div>
        <div class="firstConnexion__card__buttons">
            <n-button secondary @click.prevent="emit('quitLogin', true)">
                Quitter
            </n-button>
            <n-button primary color="black" type="primary" @click.prevent="handleValidateClick">
                Valider
            </n-button>

        </div>
    </n-form>

</template>