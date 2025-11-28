<script setup lang="ts">

  import NavBar from './presentation/components/NavBar.vue';
  import { NConfigProvider, NLoadingBarProvider, NMessageProvider, NNotificationProvider, NModalProvider, NDialogProvider, NFlex, darkTheme } from 'naive-ui';
  import { ref } from 'vue'
  import router from './router/index'
  import { useUserStore } from './stores/User';
  const usersStore = useUserStore()
  // usersStore.checkCurrentFarmer()

  const logoHolicowUE = "/images/logo_UE_holicow.svg"
  const logoHolicow = "/images/logo_holicow.svg"

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
            <n-dialog-provider>
              <NavBar v-if="!usersStore.checkIfNewUser()" v-model:active="activeTab" @update:active="onMenuItemClick"
                :logoSrc="logoHolicow" :logoSrcUE="logoHolicowUE" />
              <div class="main">
                <router-view class="routerView" />

              </div>
            </n-dialog-provider>
          </n-modal-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style scoped></style>
