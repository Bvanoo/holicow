<script setup lang="ts">
  import type IUserProfile from '@/domain/entities/IUserProfile'
  import type updateProfile from '@/domain/entities/updateProfile';
  import UsersServices from '@/domain/services/UserServices'
  import { useUserStore } from '@/stores/User'
  import { type FormInst, type FormItemRule, NSelect, NForm, NButton, NRadioGroup, NRadioButton, NFormItem, NInput } from 'naive-ui';

  import { ref } from 'vue'

  const userStore = useUserStore()

  const isModify = ref(false)

  const ProfilUpdateRef = ref<FormInst | null>(null)
  const ProfilUpdateValues = userStore.currentProfile

  const optionsRegion = [
    {
      label: 'Herbagère',
      value: 'herbagere',
    },
    {
      label: 'Hautes Ardennes',
      value: 'haute-ardennes',
    },
    {
      label: 'Autres provinces',
      value: 'autres',
    }
  ]
  const rules = {
    phone: {
      required: true,
      trigger: ['input'],
      message: 'vide ou 0499/12.34.56',
      validator: (rule: FormItemRule, value: string) => {
        return value === "" || /^0\d{3}\/?\d{2}\.?\d{2}\.?\d{2}$/.test(value)
      },
    },
    adr_mail: {
      required: true,
      trigger: ['input'],
      message: 'vide ou monEmail@email.be',
      validator: (rule: FormItemRule, value: string) => {
        console.log('value', value)
        return value === "" || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
      },
    },
  }

  const toggleModifyInputs = () => {
    isModify.value = !isModify.value
  }

  const updateProfil = async () => {
    ProfilUpdateRef.value?.validate(async (errors) => {
      if (!errors) {
        toggleModifyInputs()

        // console.log('userUpdate', ProfilUpdateValues)

        //Naive-UI ne permet pas d'utiliser des booleans dans des radio-button, on peut juste comparer si la chaine renvoyé par le rabio button est === "true" pour avoir un état boolean
        const profileTmp: updateProfile = {
          // profilId: userStore.currentUserId as string,
          adr_mail: ProfilUpdateValues?.adr_mail as string,
          phone: ProfilUpdateValues?.phone?.replace(/[\/\.]/g, '') as string,
          region: ProfilUpdateValues?.region as string,
          bio: getBoolFrom(ProfilUpdateValues?.bio),
          robot: getBoolFrom(ProfilUpdateValues?.robot),
          mail_notif: getBoolFrom(ProfilUpdateValues?.mail_notif),
          phone_notif: getBoolFrom(ProfilUpdateValues?.phone_notif),
          // avatar_picture: userStore.currentProfile?.avatar_picture as string,
          // lastname: ProfilUpdateValues?.lastname as string,
          // firstname: ProfilUpdateValues?.firstname as string,
          // country: ProfilUpdateValues?.country as string,
          // user_status: true,
          // type: ProfilUpdateValues?.type as string

        }

        const usersServices = new UsersServices()
        console.log('profileTmp', profileTmp)
        const newProfile = await usersServices.updateUserProfile(userStore.currentUserId as string, profileTmp)

        userStore.setCurrentUser(newProfile)
      } else {
        console.error(errors)
        // message.error('Invalid')
      }
    })
  }

  //Naive-UI ne permet pas d'utiliser des booleans dans des radio-button, on peut juste comparer si la chaine renvoyé par le rabio button est === "true" pour avoir un état boolean
  const getBoolFrom = (value: unknown): boolean => {
    return value === true || value === 'true'
  }

</script>

<template>
  <!--Profil Card-->
  <transition name="fade-slide" tag="n-card" appear>

    <n-card v-if="userStore?.getCurrentProfile !== null" class="profilCard" hoverable>

      <template v-if="!isModify">
        <n-image :src="'http://www.' + userStore.currentProfile?.avatar_picture" preview-disabled alt="Profil logo"
          class="profilCard__avatar"></n-image>
        <div class="profilCard__infos">
          <h2 class="profilCard__infos-title">Vos informations</h2>

          <div class="profilCard__infos-cards">
            <div class="profilCard__infos-card">
              <h3>email</h3>
              <span>{{ userStore.currentProfile?.adr_mail }}</span>
            </div>
            <div class="profilCard__infos-card">
              <h3>mobile</h3>
              <span>{{ userStore.currentProfile?.phone }}</span>
            </div>
            <div class="profilCard__infos-card">
              <h3>region</h3>
              <span>{{ userStore.currentProfile?.region }}</span>
            </div>
            <div class="profilCard__infos-card">
              <h3>bio</h3>
              <span>{{ getBoolFrom(userStore.currentProfile?.bio) ? "oui" : "non" }}</span>
            </div>
            <div class="profilCard__infos-card">
              <h3>robot</h3>
              <span>{{ getBoolFrom(userStore.currentProfile?.robot) ? "oui" : "non" }}</span>
            </div>
          </div>
        </div>
        <div class="profilCard__alerts">
          <h2 class="profilCard__alerts-title">Alertes</h2>
          <div class="profilCard__alerts-cards">
            <div class="profilCard__alerts__alert-card">
              <h3>mail</h3>
              <span>{{ getBoolFrom(userStore.currentProfile?.mail_notif) ? "oui" : "non" }}</span>
            </div>
            <!-- <div class="profilCard__alerts__alert-card">
              <h3>phone</h3>
              <span>{{ getBoolFrom(ProfilUpdateValues?.phone_notif) ? "oui" : "non" }}</span>
            </div> -->
          </div>
        </div>
      </template>
      <template v-else>
        <n-form class="profilCard__modify" ref="ProfilUpdateRef" :label-width="18" :model="ProfilUpdateValues!"
          :rules="rules">
          <!-- En‑tête de la carte -->
          <header class="profilCard__modify__header">
            <h1>Modification</h1>
          </header>

          <!-- Contenu principal : infos + alertes -->
          <main class="profilCard__modify__body">
            <h3 class="">Vos informations d'exploitation</h3>
            <!-- infos exploitation -->
            <section class="profilCard__modify__body-infos">

              <div class="profilCard__modify__body-infos-region">
                <!-- Région -->
                <n-form-item label="Région">
                  <n-select class="" :options="optionsRegion" v-model:value="ProfilUpdateValues!.region"
                    placeholder="Choisir" />
                </n-form-item>
              </div>

              <div class="profilCard__modify__body-infos-bool">
                <!-- Bio -->
                <n-form-item label="Bio">
                  <n-radio-group v-model:value="ProfilUpdateValues!.bio" name="bio-group" class="">
                    <n-radio-button value="true">Oui</n-radio-button>
                    <n-radio-button value="false">Non</n-radio-button>
                  </n-radio-group>
                </n-form-item>

                <!-- Robots -->
                <n-form-item label="Robots">
                  <n-radio-group v-model:value="ProfilUpdateValues!.robot" name="robot-group" class="">
                    <n-radio-button value="true">Oui</n-radio-button>
                    <n-radio-button value="false">Non</n-radio-button>
                  </n-radio-group>
                </n-form-item>
              </div>
              <div class="profilCard__modify__body-infos-user">
                <n-form-item label="Mail" path="adr_mail">
                  <n-input type="text" v-model:value="ProfilUpdateValues!.adr_mail" />
                </n-form-item>
                <n-form-item label="Phone" path="phone">
                  <n-input placeholder="Basic Input" v-model:value="ProfilUpdateValues!.phone" />
                </n-form-item>
              </div>
            </section>
            <h3 class="">Alertes maladie</h3>

            <!-- Alertes -->
            <div class="profilCard__modify__body-alerts">

              <div class="profilCard__modify__body-alert">
                <span class="">Email</span>
                <n-radio-group class="" v-model:value="ProfilUpdateValues!.mail_notif" name="mail_notif">
                  <n-radio-button value="true">Oui</n-radio-button>
                  <n-radio-button value="false">Non</n-radio-button>
                </n-radio-group>
              </div>

              <!-- <div class="profilCard__modify__body-alert">
                <span class="">Téléphone</span>
                <n-radio-group v-model:value="ProfilUpdateValues!.phone_notif" name="phone_notif" class="">
                  <n-radio-button value="true">Oui</n-radio-button>
                  <n-radio-button value="false">Non</n-radio-button>
                </n-radio-group>
              </div> -->
            </div>
          </main>

          <!-- Pied de carte : boutons -->
          <footer class="profilCard__modify__footer">
            <n-button v-if="isModify" quaternary @click.prevent="toggleModifyInputs">Annuler</n-button>
            <n-button class="profilCard__modify__footer-button" type="primary" @click.prevent="updateProfil"> Valider
            </n-button>
          </footer>

        </n-form>
      </template>
      <div class="profilCard__button">
        <n-button v-if="!isModify" class="profilCard__button-modifyProfil" strong type="success"
          @click.prevent="toggleModifyInputs">Modifier mon profil</n-button>
      </div>
    </n-card>
  </transition>
  <!--Fin profil card-->
</template>
