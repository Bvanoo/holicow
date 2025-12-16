<script setup lang="ts">

  import NavBar from './presentation/components/NavBar.vue';
  import { NConfigProvider, NLoadingBarProvider, NMessageProvider, NNotificationProvider, NModalProvider, NDialogProvider, darkTheme } from 'naive-ui';
  import { ref } from 'vue'
  import { useUserStore } from './stores/User';
  import FooterComponent from './presentation/components/FooterComponent.vue';
  const userStore = useUserStore()

  const logoInterreg = "/images/logo_interreg.svg"
  const logoHolicow = "/images/logo_holicow.svg"
  const profilLogo = ref("http://www." + userStore.currentProfile?.avatar_picture)

  const activeTab = ref('home')
  const isDark = ref(false)

</script>

<template>

  <div class="appLayout">
    <NavBar v-if="!userStore.isNewProfil" v-model:active="activeTab" :logoSrc="logoHolicow" :profileSrc="profilLogo" />
    <main class="appContent">

      <n-config-provider :theme="isDark ? darkTheme : null">
        <n-loading-bar-provider>
          <n-message-provider>
            <n-notification-provider>
              <n-modal-provider>
                <n-dialog-provider>

                  <router-view />
                </n-dialog-provider>
              </n-modal-provider>
            </n-notification-provider>
          </n-message-provider>
        </n-loading-bar-provider>
      </n-config-provider>
    </main>
    <FooterComponent :logoInterreg="logoInterreg"></FooterComponent>
  </div>
</template>

<style scoped></style>
