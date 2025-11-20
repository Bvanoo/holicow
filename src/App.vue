<script setup lang="ts">
  import NavBar from './components/NavBar.vue'
  import { NConfigProvider, NLoadingBarProvider, NMessageProvider, NNotificationProvider, NModalProvider, NDialogProvider, NFlex, darkTheme } from 'naive-ui';
  import { ref } from 'vue'
  import router from './router'
  import { useUserStore } from './stores/user';
  const usersStore = useUserStore()
  usersStore.checkCurrentUser()

  const logoHolicowUE = "/images/logo_UE_holicow.svg"
  const logoHolicow = "/images/logo_holicow.svg"

  const activeTab = ref('home')
  const isDark = ref(false) // tu peux lier ça à un bouton

  function onMenuItemClick(key: string) {
    if (usersStore.checkCurrentUser() === false) return;
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
              <NavBar v-if="usersStore.checkCurrentUser()" v-model:active="activeTab" @update:active="onMenuItemClick"
                :logoSrc="logoHolicow" :logoSrcUE="logoHolicowUE" />
              <n-flex vertical align="center">
                <router-view class="routerView" />
              </n-flex>
            </n-dialog-provider>
          </n-modal-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style scoped></style>
