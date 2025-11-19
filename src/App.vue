<script setup lang="ts">
  import NavBar from './components/NavBar.vue'
  import { NConfigProvider, NLoadingBarProvider, NMessageProvider, NNotificationProvider, NModalProvider, NDialogProvider, NFlex, darkTheme } from 'naive-ui';

  import { ref } from 'vue'
  import router from './router'

  const activeTab = ref('maladies')
  const isDark = ref(true) // tu peux lier ça à un bouton

  function onMenuItemClick(key: string) {
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
              <NavBar v-model:active="activeTab" @update:active="onMenuItemClick" />
              <n-flex vertical align="center">
                <router-view />
              </n-flex>
            </n-dialog-provider>
          </n-modal-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style scoped></style>
