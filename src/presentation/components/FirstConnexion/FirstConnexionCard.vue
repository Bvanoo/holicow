<script setup lang="ts">
    import { type FormInst, NSelect, NForm, NButton, NRadioGroup, NRadioButton, NFormItem, NInput, type FormItemRule } from 'naive-ui';
    import { ref } from 'vue';
    import { useUserStore } from '@/stores/User';
    import type IUserProfile from '@/domain/entities/IUserProfile';
    //Emits
    const emit = defineEmits<{
        (event: 'updateUserChoices', value: IUserProfile): void,
        (event: 'quitLogin', value: boolean): void,
    }>();

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

    const UserUpdateRef = ref<FormInst | null>(null)
    const UserUpdateValues = userStore.currentProfile

    const rules =
    {
        region: {
            required: true,
            message: 'Sélectionnez la région',
            trigger: ['select'],
            validator: (rule: FormItemRule, value: string) => {
                console.log("value", value)
                return value !== "BE"
            }
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
                console.log("value", value)

                return /^0\d{3}\/?\d{2}\.?\d{2}\.?\d{2}$/.test(value)
            }
        },
        adr_mail: {
            required: true,
            trigger: ['input'],
            message: 'monEmail@email.be',
            validator: (rule: FormItemRule, value: string) => {
                console.log("value", value)
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
            }
        }
    }

    const updateProfil = () => {
        UserUpdateRef.value?.validate((errors) => {
            if (!errors) {
                // message.success('Valid')
                //Obligé de refaire un objet car les n-inputs de naive Ui ne peuvent pas renvoyer de false ou true 
                // (c'est utilisé pour les rules)
                const profileTmp: IUserProfile = {
                    profilId: userStore.currentUserId as string,
                    adr_mail: UserUpdateValues?.adr_mail,
                    phone: UserUpdateValues?.phone?.replace(/[\/\.]/g, ''),
                    region: UserUpdateValues!.region,
                    bio: getBoolFrom(UserUpdateValues?.bio),
                    robot: getBoolFrom(UserUpdateValues?.robot),
                    mail_notif: getBoolFrom(UserUpdateValues?.mail_notif),
                    phone_notif: getBoolFrom(UserUpdateValues?.phone_notif),
                    avatar_picture: UserUpdateValues?.avatar_picture as string,
                    lastname: UserUpdateValues?.lastname as string,
                    firstname: UserUpdateValues?.firstname as string,
                    country: UserUpdateValues?.country as string,
                    user_status: true,
                    type: UserUpdateValues?.type as string

                }

                console.log("profileTmp")
                emit("updateUserChoices", profileTmp)
            }
            else {
                console.error(errors)
                // message.error('Invalid')
            }
        })
    }
    const getBoolFrom = (value: unknown): boolean => {
        return value === true || value === "true"
    }

</script>

<template>
    <transition name="fade-slide" tag="n-form" appear>
        <n-form class="firstConnexion__card" ref="UserUpdateRef" inline :label-width="18" :model="UserUpdateValues!"
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
                                v-model:value="UserUpdateValues!.region" placeholder="Choisir" />
                        </n-form-item>

                        <!-- Bio -->
                        <n-form-item label="Bio" path="bio">
                            <n-radio-group v-model:value="UserUpdateValues!.bio" name="bio-group"
                                class="firstConnexion__radio-group">
                                <n-radio-button value="true">Oui</n-radio-button>
                                <n-radio-button value="false">Non</n-radio-button>
                            </n-radio-group>
                        </n-form-item>

                        <!-- Robots -->
                        <n-form-item label="Robots" path="robot">
                            <n-radio-group v-model:value="UserUpdateValues!.robot" name="robot-group"
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
                            <n-radio-group v-model:value="UserUpdateValues!.mail_notif" name="mail_notif"
                                class="firstConnexion__radio-group">
                                <n-radio-button value="true">Oui</n-radio-button>
                                <n-radio-button value="false">Non</n-radio-button>
                            </n-radio-group>
                            <n-form-item v-if="getBoolFrom(UserUpdateValues?.mail_notif)" label="Mail" path="adr_mail">
                                <n-input type="text" v-model:value="UserUpdateValues!.adr_mail" />
                            </n-form-item>
                        </div>

                        <!-- Alertes téléphone -->
                        <div class="firstConnexion__card__alert-item">
                            <span class="firstConnexion__card__alert-label">Téléphone</span>
                            <n-radio-group v-model:value="UserUpdateValues!.phone_notif" name="phone_notif"
                                class="firstConnexion__radio-group">
                                <n-radio-button value="true">Oui</n-radio-button>
                                <n-radio-button value="false">Non</n-radio-button>
                            </n-radio-group>
                            <n-form-item v-if="getBoolFrom(UserUpdateValues?.phone_notif)" label="Phone" path="phone">
                                <n-input placeholder="phone" v-model:value="UserUpdateValues!.phone" />
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
                <n-button type="primary" color="black"
                    class="firstConnexion__card__btn firstConnexion__card__btn--validate" @click.prevent="updateProfil">
                    Valider
                </n-button>
            </footer>
        </n-form>
    </transition>
</template>
