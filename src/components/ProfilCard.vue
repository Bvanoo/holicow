<script setup lang="ts">
  import type IUserProfile from '@/entities/IUserProfile'
  import UsersServices from '@/services/usersServices'
  import { useUserStore } from '@/stores/User'
  import { type FormInst, type FormItemRule, NSelect, NForm, NButton, NRadioGroup, NRadioButton, NFormItem, NInput } from 'naive-ui';

  import { ref } from 'vue'

  const userStore = useUserStore()

  const isModify = ref(false)

  const userProfile: IUserProfile | void = userStore.currentProfile

  const ProfilUpdateRef = ref<FormInst | null>(null)
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
    },
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

  const updateProfil = () => {
    ProfilUpdateRef.value?.validate((errors) => {
      if (!errors) {
        toggleModifyInputs()

        console.log('userUpdate', ProfilUpdateValues)

        //Naive-UI ne permet pas d'utiliser des booleans dans des radio-button, on peut juste comparer si la chaine renvoyé par le rabio button est === "true" pour avoir un état boolean
        const profileTmp = {
          profilId: userStore.currentUserId,
          adr_mail: ProfilUpdateValues?.adr_mail,
          phone: ProfilUpdateValues?.phone?.replace(/[\/\.]/g, ''),
          region: ProfilUpdateValues!.region,
          bio: getBoolFrom(ProfilUpdateValues?.bio),
          robot: getBoolFrom(ProfilUpdateValues?.robot),
          mail_notif: getBoolFrom(ProfilUpdateValues?.mail_notif),
          phone_notif: getBoolFrom(ProfilUpdateValues?.phone_notif),
        }

        const usersServices = new UsersServices()
        console.log('profileTmp.profilId', profileTmp.profilId)
        usersServices.updateUserProfile(profileTmp.profilId as string, profileTmp)
        userStore.currentProfile = profileTmp
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
  <n-card v-if="userStore?.getCurrentUser !== null" class="profilCard" hoverable>

    <template v-if="!isModify">
      <n-image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7csvPWMdfAHEAnhIRTdJKCK5SPK4cHfskow&s"
        preview-disabled></n-image>
      <div class="profilCard__infos">
        <h1 class="profilCard__infos-title">Vos informations</h1>

        <div class="profilCard__infos-cards">
          <div class="profilCard__infos-card">
            <h3>email</h3>
            <span>{{ ProfilUpdateValues!.adr_mail }}</span>
          </div>
          <div class="profilCard__infos-card">
            <h3>mobile</h3>
            <span>{{ ProfilUpdateValues!.phone }}</span>
          </div>
          <div class="profilCard__infos-card">
            <h3>region</h3>
            <span>{{ ProfilUpdateValues!.region }}</span>
          </div>
          <div class="profilCard__infos-card">
            <h3>bio</h3>
            <span>{{ ProfilUpdateValues!.bio }}</span>
          </div>
          <div class="profilCard__infos-card">
            <h3>robot</h3>
            <span>{{ ProfilUpdateValues!.robot }}</span>
          </div>
        </div>
      </div>
      <div class="profilCard__alerts">
        <h1 class="profilCard__alerts-title">Alertes</h1>
        <div class="profilCard__alerts-card">
          <h3>mail</h3>
          <span>{{ ProfilUpdateValues!.mail_notif }}</span>
        </div>
        <div class="profilCard__alerts-card">
          <h3>phone</h3>
          <span>{{ ProfilUpdateValues!.phone_notif }}</span>
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
          <!-- infos exploitation -->
          <section class="profilCard__modify__body-infos">
            <h3 class="">Vos informations d'exploitation</h3>

            <!-- Région -->
            <n-form-item label="Région">
              <n-select class="" :options="optionsRegion" v-model:value="ProfilUpdateValues!.region"
                placeholder="Choisir" />
            </n-form-item>

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

            <n-form-item label="Mail" path="adr_mail">
              <n-input type="text" v-model:value="ProfilUpdateValues!.adr_mail" />
            </n-form-item>
            <n-form-item label="Phone" path="phone">
              <n-input placeholder="Basic Input" v-model:value="ProfilUpdateValues!.phone" />
            </n-form-item>
          </section>

          <!-- Alertes -->
          <section class=" ">
            <h3 class="">Alertes maladie</h3>

            <div class="">
              <div class="">
                <span class="">Email</span>
                <n-radio-group class="" v-model:value="ProfilUpdateValues!.mail_notif" name="mail_notif">
                  <n-radio-button value="true">Oui</n-radio-button>
                  <n-radio-button value="false">Non</n-radio-button>
                </n-radio-group>
              </div>

              <div class="">
                <span class="">Téléphone</span>
                <n-radio-group v-model:value="ProfilUpdateValues!.phone_notif" name="phone_notif" class="">
                  <n-radio-button value="true">Oui</n-radio-button>
                  <n-radio-button value="false">Non</n-radio-button>
                </n-radio-group>
              </div>
            </div>
          </section>
        </main>

        <!-- Pied de carte : boutons -->
        <footer class="profilCard__modify__footer">
          <n-button class="test" v-if="isModify" quaternary @click.prevent="toggleModifyInputs">Annuler</n-button>
          <n-button type="primary" class="" @click.prevent="updateProfil"> Valider </n-button>
        </footer>
      </n-form>
    </template>

    <n-button v-if="!isModify" class="profilView__userCard__buttons" strong round type="success"
      @click.prevent="toggleModifyInputs">Modifier mon profil</n-button>
  </n-card>
  <!--Fin profil card-->
</template>
