<script setup lang="ts">
  import type IUserProfile from '@/entities/IUserProfile'
  import UsersServices from '@/services/usersServices'
  import { useUserStore } from '@/stores/User'
  import { NButton, NCard, NFlex, NImage, type FormInst, type FormItemRule } from 'naive-ui'
  import { ref } from 'vue'

  const userStore = useUserStore()

  const isModify = ref(false)

  const userProfile: IUserProfile | void = userStore.currentProfile;
  console.log("currentFarmer", userProfile)

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

  const toggleModifyInputs = () => {
    isModify.value = !isModify.value
  }

  const updateProfil = () => {
    ProfilUpdateRef.value?.validate((errors) => {
      if (!errors) {
        toggleModifyInputs();

        console.log("userUpdate", ProfilUpdateValues)
        // farmerStore.setNewEmail(email.value);
        // const userUpdate: UserUpdate = {
        //   region: user.region
        // }

        //Naive-UI ne permet pas d'utiliser des booleans dans des radio-button, on peut juste comparer si la chaine renvoyé par le rabio button est === "true" pour avoir un état boolean
        const profileTmp = {
          profilId: userStore.currentUserId,
          adr_mail: ProfilUpdateValues?.adr_mail,
          phone: ProfilUpdateValues?.phone?.replace(/[\/\.]/g, ""),
          region: ProfilUpdateValues!.region,
          bio: getBoolFrom(ProfilUpdateValues?.bio),
          robot: getBoolFrom(ProfilUpdateValues?.robot),
          mail_notif: getBoolFrom(ProfilUpdateValues?.mail_notif),
          phone_notif: getBoolFrom(ProfilUpdateValues?.phone_notif),
        }

        const usersServices = new UsersServices();
        console.log("profileTmp.profilId", profileTmp.profilId)
        usersServices.updateUserProfile(profileTmp.profilId as string, profileTmp)
        userStore.currentProfile = profileTmp

      }
      else {
        console.error(errors)
        // message.error('Invalid')
      }
    })
  }

  //Naive-UI ne permet pas d'utiliser des booleans dans des radio-button, on peut juste comparer si la chaine renvoyé par le rabio button est === "true" pour avoir un état boolean
  const getBoolFrom = (value: unknown): boolean => {
    return value === true || value === "true"
  }
</script>

<template>
  <!--Profil Card-->
  <n-card v-if="userStore?.getCurrentUser !== null" class="profilCard">
    <n-flex vertical>
      <n-flex justify="center">

      </n-flex>

      <!-- <h3>userId</h3>
      <span>{{ currentFarmer?.farmer.userId }}</span> -->
      <!--email-->
      <template v-if="!isModify">
        <n-image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7csvPWMdfAHEAnhIRTdJKCK5SPK4cHfskow&s"
          preview-disabled></n-image>
        <h3>email</h3>
        <span>{{ ProfilUpdateValues!.adr_mail }}</span>
        <h3>mobile</h3>
        <span>{{ ProfilUpdateValues!.phone }}</span>
        <h3>region</h3>
        <span>{{ ProfilUpdateValues!.region }}</span>
        <h3>bio</h3>
        <span>{{ ProfilUpdateValues!.bio }}</span>
        <h3>robot</h3>
        <span>{{ ProfilUpdateValues!.robot }}</span>
        <h1>Alertes</h1>
        <h3>mail</h3>
        <span>{{ ProfilUpdateValues!.mail_notif }}</span>
        <h3>phone</h3>
        <span>{{ ProfilUpdateValues!.phone_notif }}</span>
      </template>
      <template v-if="isModify">
        <n-form class="profilCard__modify" ref="ProfilUpdateRef" :label-width="18" :model="ProfilUpdateValues"
          :rules="rules">
          <!-- En‑tête de la carte -->
          <header class="profilCard__modify__header">
            <h1>
              Modification
            </h1>
          </header>

          <!-- Contenu principal : infos + alertes -->
          <main class="profilCard__modify__body">
            <!-- infos exploitation -->
            <section class="">
              <h3 class="">
                Vos informations d'exploitation
              </h3>

              <div class="">
                <!-- Région -->
                <n-form-item label="Région" path="region">
                  <n-select class="" :options="optionsRegion" v-model:value="ProfilUpdateValues!.region"
                    placeholder="Choisir" />
                </n-form-item>

                <!-- Bio -->
                <n-form-item label="Bio" path="bio">
                  <n-radio-group v-model:value="ProfilUpdateValues!.bio" name="bio-group" class="">
                    <n-radio-button value="true">Oui</n-radio-button>
                    <n-radio-button value="false">Non</n-radio-button>
                  </n-radio-group>
                </n-form-item>

                <!-- Robots -->
                <n-form-item label="Robots" path="robot">
                  <n-radio-group v-model:value="ProfilUpdateValues!.robot" name="robot-group" class="">
                    <n-radio-button value="true">Oui</n-radio-button>
                    <n-radio-button value="false">Non</n-radio-button>
                  </n-radio-group>
                </n-form-item>
              </div>
              <n-form-item label="Mail" path="adr_mail">
                <n-input type="text" v-model:value="ProfilUpdateValues!.adr_mail" />
              </n-form-item>
              <n-form-item label="Phone" path="phone">
                <n-input placeholder="Basic Input" v-model:value="ProfilUpdateValues!.phone" />
              </n-form-item>
            </section>

            <!-- Alertes -->
            <section class=" ">
              <h3 class="">
                Alertes maladie
              </h3>

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
            <n-button class="test" v-if="isModify" round quaternary
              @click.prevent="toggleModifyInputs">Annuler</n-button>

            <n-button type="primary" class="" @click.prevent="updateProfil">
              Valider
            </n-button>
          </footer>
        </n-form>
      </template>

      <n-button v-if="!isModify" class="profilView__userCard__buttons" strong round type="success"
        @click.prevent="toggleModifyInputs">Modifier mon profil</n-button>

    </n-flex>
  </n-card>
  <!--Fin profil card-->
</template>
