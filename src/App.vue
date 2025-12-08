<script setup lang="ts">

  import NavBar from './presentation/components/NavBar.vue';
  import { NConfigProvider, NLoadingBarProvider, NMessageProvider, NNotificationProvider, NModalProvider, NDialogProvider, darkTheme } from 'naive-ui';
  import { ref } from 'vue'
  import router from './router/index'
  import { useUserStore } from './stores/User';
  import FooterComponent from './presentation/components/FooterComponent.vue';
  const usersStore = useUserStore()
  // usersStore.checkCurrentFarmer()

  const logoInterreg = "/images/logo_interreg.svg"
  const logoHolicow = "/images/logo_holicow.svg"
  const profilLogo = ref("http://www." + usersStore.getCurrentUserPicture)

  const activeTab = ref('home')
  const isDark = ref(false) // tu peux lier ça à un bouton

  function onMenuItemClick(key: string) {
    if (usersStore.isNewProfil) return;
    router.push('/' + key)
    activeTab.value = key
    console.log(key)
  }

</script>

<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-modal-provider>
            <n-dialog-provider class="mainApp">
              <NavBar v-if="!usersStore.isNewProfil" v-model:active="activeTab" @update:active="onMenuItemClick"
                :logoSrc="logoHolicow" :profileSrc="profilLogo" />
              <div class="main">
                <router-view class="routerView" />

              </div>
              <FooterComponent :logoInterreg="logoInterreg"></FooterComponent>
            </n-dialog-provider>
          </n-modal-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style scoped></style>
