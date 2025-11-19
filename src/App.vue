<script setup lang="ts">
  import NavBar from './components/NavBar.vue'
  import { NConfigProvider, NLoadingBarProvider, NMessageProvider, NNotificationProvider, NModalProvider, NDialogProvider, NFlex } from 'naive-ui';
</script>

<template>
  <n-config-provider>
    <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-modal-provider>
            <n-dialog-provider>
              <NavBar />
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
