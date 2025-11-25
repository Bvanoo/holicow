<script setup lang="ts">
    import { type FormInst, NEl, NSelect, NGrid, NForm, NButton, NFormItemGi, NRadioGroup, NRadioButton, NGi, NFlex, NCheckboxGroup, NSpace, NCheckbox, NFormItem, NInput, type FormItemRule } from 'naive-ui';
    import { ref } from 'vue';
    import type UserProfile from '../../entities/IUserProfile';
    import { useUserStore } from '@/stores/User';
    import type IUserProfile from '../../entities/IUserProfile';

    const userStore = useUserStore();
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
        (event: 'updateUserChoices', value: UserProfile): void,
        (event: 'quitLogin', value: boolean): void,
    }>();

    const UserUpdateRef = ref<FormInst | null>(null)
    const UserUpdateValues = userStore.currentProfile

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
        phone: {
            required: true,
            trigger: ['input'],
            message: '0499/12.34.56',
            validator: (rule: FormItemRule, value: string) => {
                return /^0\d{3}\/?\d{2}\.?\d{2}\.?\d{2}$/.test(value)
            }
        },
        mail: {
            required: true,
            trigger: ['input'],
            message: 'monEmail@email.be',
            validator: (rule: FormItemRule, value: string) => {
                console.log("value", value)
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
            }
        }
    }

    const handleValidateClick = (e: MouseEvent) => {
        e.preventDefault()
        UserUpdateRef.value?.validate((errors) => {
            if (!errors) {
                // message.success('Valid')
                //Obligé de refaire un objet car les n-inputs de naive Ui ne peuvent pas renvoyer de false ou true 
                // (c'est utilisé pour les rules)
                const profileTmp = {
                    profilId: UserUpdateValues?.profilId,
                    adr_mail: UserUpdateValues?.adr_mail,
                    phone: UserUpdateValues?.phone?.replace(/[\/\.]/g, ""),
                    region: UserUpdateValues?.region,
                    bio: UserUpdateValues?.bio === 'true',
                    robot: UserUpdateValues?.robot === 'true',
                    mail_notif: UserUpdateValues?.mail_notif === 'true',
                    phone_notif: UserUpdateValues?.phone_notif === 'true',
                } as IUserProfile

                console.log("profileTmp")
                emit("updateUserChoices", profileTmp)
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
        :rules="rules">
        <!-- En‑tête de la carte -->
        <header class="firstConnexion__card__header">
            <h2 class="firstConnexion__card__title">
                Première connexion
            </h2>
            <p class="firstConnexion__card__subtitle">
                Quelques questions pour personnaliser votre expérience Holicow.
            </p>
        </header>

        <!-- Contenu principal : infos + alertes -->
        <div class="firstConnexion__card__body">
            <!-- infos exploitation -->
            <section class="firstConnexion__card__section firstConnexion__card__section--infos">
                <h3 class="firstConnexion__card__section-title">
                    Vos informations d'exploitation
                </h3>

                <div class="firstConnexion__card__flex">
                    <!-- Région -->
                    <n-form-item label="Région" path="region">
                        <n-select class="firstConnexion__region" :options="optionsRegion"
                            v-model:value="UserUpdateValues.region" placeholder="Choisir" />
                    </n-form-item>

                    <!-- Bio -->
                    <n-form-item label="Bio" path="bio">
                        <n-radio-group v-model:value="UserUpdateValues.bio" name="bio-group"
                            class="firstConnexion__radio-group">
                            <n-radio-button value="true">Oui</n-radio-button>
                            <n-radio-button value="false">Non</n-radio-button>
                        </n-radio-group>
                    </n-form-item>

                    <!-- Robots -->
                    <n-form-item label="Robots" path="robot">
                        <n-radio-group v-model:value="UserUpdateValues.robot" name="robot-group"
                            class="firstConnexion__radio-group">
                            <n-radio-button value="true">Oui</n-radio-button>
                            <n-radio-button value="false">Non</n-radio-button>
                        </n-radio-group>
                    </n-form-item>
                </div>
            </section>

            <!-- Alertes -->
            <section class="firstConnexion__card__section firstConnexion__card__section--alerts">
                <h3 class="firstConnexion__card__section-title">
                    Alertes maladie
                </h3>

                <div class="firstConnexion__card__alerts-list">
                    <!-- Alertes email -->
                    <div class="firstConnexion__card__alert-item">
                        <span class="firstConnexion__card__alert-label">Email</span>
                        <n-radio-group class="firstConnexion__radio-group" v-model:value="UserUpdateValues.mail_notif"
                            name="mail_notif">
                            <n-radio-button value="true">Oui</n-radio-button>
                            <n-radio-button value="false">Non</n-radio-button>
                        </n-radio-group>
                        <n-form-item v-if="UserUpdateValues?.mail_notif === 'true'" label="Mail" path="mail_notif">
                            <n-input type="text" v-model:value="UserUpdateValues.adr_mail" />
                        </n-form-item>
                    </div>

                    <!-- Alertes téléphone -->
                    <div class="firstConnexion__card__alert-item">
                        <span class="firstConnexion__card__alert-label">Téléphone</span>
                        <n-radio-group v-model:value="UserUpdateValues.phone_notif" name="phone_notif"
                            class="firstConnexion__radio-group">
                            <n-radio-button value="true">Oui</n-radio-button>
                            <n-radio-button value="false">Non</n-radio-button>
                        </n-radio-group>
                        <n-form-item v-if="UserUpdateValues?.phone_notif === 'true'" label="Phone" path="phone">
                            <n-input placeholder="Basic Input" v-model:value="UserUpdateValues.phone" path="phone" />
                        </n-form-item>
                    </div>

                </div>
            </section>
        </div>

        <!-- Pied de carte : boutons -->
        <footer class="firstConnexion__card__footer">
            <n-button secondary class="firstConnexion__card__btn firstConnexion__card__btn--cancel"
                @click.prevent="emit('quitLogin', true)">
                Quitter
            </n-button>
            <n-button type="primary" color="black" class="firstConnexion__card__btn firstConnexion__card__btn--validate"
                @click.prevent="handleValidateClick">
                Valider
            </n-button>
        </footer>
    </n-form>
</template>