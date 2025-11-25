<script setup lang="ts">
  import type IUserProfile from '@/entities/IUserProfile'
  import UsersServices from '@/services/usersServices'
  // import UsersServices from '@/services/usersServices'
  import { useUserStore } from '@/stores/User'
  import { NButton, NCard, NEl, NFlex, NImage, type FormInst, type FormItemRule } from 'naive-ui'
  import { ref } from 'vue'

  // import type { Ref } from 'vue'

  const userStore = useUserStore()

  const isModify = ref(false)

  const userProfile: IUserProfile | void = userStore.currentProfile;
  console.log("currentFarmer", userProfile)

  const UserUpdateRef = ref<FormInst | null>(null)
  const ProfilUpdateValues = userProfile

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

  const toggleModifyInputs = () => {
    isModify.value = !isModify.value
  }

  const updateProfile = () => {
    toggleModifyInputs();

    console.log("userUpdate", ProfilUpdateValues)
    // farmerStore.setNewEmail(email.value);
    // const userUpdate: UserUpdate = {
    //   region: user.region
    // }

    //Naive-UI ne permet pas d'utiliser des booleans dans des radio-button, on peut juste comparer si la chaine renvoyé par le rabio button est === "true" pour avoir un état boolean
    const profileTmp = {
      profilId: ProfilUpdateValues?.profilId,
      adr_mail: ProfilUpdateValues?.adr_mail,
      phone: ProfilUpdateValues?.phone?.replace(/[\/\.]/g, ""),
      region: ProfilUpdateValues?.region,
      bio: ProfilUpdateValues?.bio === 'true',
      robot: ProfilUpdateValues?.robot === 'true',
      mail_notif: ProfilUpdateValues?.mail_notif === 'true',
      phone_notif: ProfilUpdateValues?.phone_notif === 'true',
    } as IUserProfile

    const usersServices = new UsersServices();
    console.log("userProfile.profilId", userProfile?.profilId)
    usersServices.updateUserProfile(userProfile?.profilId as string, profileTmp)
    userStore.currentProfile = profileTmp
  }

</script>

<template>
  <!--Profil Card-->
  <n-card v-if="userStore?.getCurrentUser !== null" title="user_card" class="profilView__userCard">
    <n-flex vertical>
      <n-flex justify="center">
        <n-image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7csvPWMdfAHEAnhIRTdJKCK5SPK4cHfskow&s"
          preview-disabled></n-image>
      </n-flex>

      <!-- <n-el tag="h3">userId</n-el>
      <n-el tag="span">{{ currentFarmer?.farmer.userId }}</n-el> -->
      <!--email-->
      <template v-if="!isModify">
        <n-el tag="h3">email</n-el>
        <n-el tag="span">{{ ProfilUpdateValues!.adr_mail }}</n-el>
        <n-el tag="h3">mobile</n-el>
        <n-el tag="span">{{ ProfilUpdateValues!.phone }}</n-el>
        <n-el tag="h3">region</n-el>
        <n-el tag="span">{{ ProfilUpdateValues!.region }}</n-el>
        <n-el tag="h3">bio</n-el>
        <n-el tag="span">{{ ProfilUpdateValues!.bio }}</n-el>
        <n-el tag="h3">robot</n-el>
        <n-el tag="span">{{ ProfilUpdateValues!.robot }}</n-el>
      </template>
      <template v-if="isModify">
        <n-form class="firstConnexion__card" ref="UserUpdateRef" inline :label-width="18" :model="ProfilUpdateValues"
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
                    v-model:value="ProfilUpdateValues!.region" placeholder="Choisir" />
                </n-form-item>

                <!-- Bio -->
                <n-form-item label="Bio" path="bio">
                  <n-radio-group v-model:value="ProfilUpdateValues!.bio" name="bio-group"
                    class="firstConnexion__radio-group">
                    <n-radio-button value="true">Oui</n-radio-button>
                    <n-radio-button value="false">Non</n-radio-button>
                  </n-radio-group>
                </n-form-item>

                <!-- Robots -->
                <n-form-item label="Robots" path="robot">
                  <n-radio-group v-model:value="ProfilUpdateValues!.robot" name="robot-group"
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
                <div class="firstConnexion__card__alert-item">
                  <span class="firstConnexion__card__alert-label">Email</span>
                  <n-radio-group class="firstConnexion__radio-group" v-model:value="ProfilUpdateValues!.mail_notif"
                    name="mail_notif">
                    <n-radio-button value="true">Oui</n-radio-button>
                    <n-radio-button value="false">Non</n-radio-button>
                  </n-radio-group>
                  <n-form-item label="Mail" path="mail_notif">
                    <n-input type="text" v-model:value="ProfilUpdateValues!.adr_mail" />
                  </n-form-item>
                </div>

                <div class="firstConnexion__card__alert-item">
                  <span class="firstConnexion__card__alert-label">Téléphone</span>
                  <n-radio-group v-model:value="ProfilUpdateValues!.phone_notif" name="phone_notif"
                    class="firstConnexion__radio-group">
                    <n-radio-button value="true">Oui</n-radio-button>
                    <n-radio-button value="false">Non</n-radio-button>
                  </n-radio-group>
                  <n-form-item label="Phone" path="phone">
                    <n-input placeholder="Basic Input" v-model:value="ProfilUpdateValues!.phone" path="phone" />
                  </n-form-item>
                </div>

              </div>
            </section>
          </div>

          <!-- Pied de carte : boutons -->
          <footer class="firstConnexion__card__footer">
            <n-button class="test" v-if="isModify" round quaternary
              @click.prevent="toggleModifyInputs">Annuler</n-button>

            <n-button type="primary" color="black" class="firstConnexion__card__btn firstConnexion__card__btn--validate"
              @click.prevent="updateProfile">
              Valider
            </n-button>
          </footer>
        </n-form>
      </template>
      <!--phone-->
      <!-- <n-el tag="span">Téléphone</n-el>
      <n-el v-if="!isModify" tag="span">{{ userStore.currentUser?.getPhone() }}</n-el>
      <n-input v-if="isModify" :v-model="userStore.currentUser?.phone"
        :value="userStore?.getCurrentUserPhone"></n-input> -->

      <n-button v-if="!isModify" class="profilView__userCard__buttons" strong round type="success"
        @click.prevent="toggleModifyInputs">Modifier mon
        profil</n-button>

    </n-flex>
  </n-card>
  <!--Fin profil card-->
</template>

<style lang="scss">
  .user {
    &__card {
      width: 50%;
    }
  }
</style>
