<template>
  <transition name="fade">
    <n-modal v-model:show="localShow" preset="dialog" class="w-96">
      <template #header>
        <div class="text-lg font-semibold">
          {{ title }}
        </div>
      </template>

      <n-form :ref="adapter.formRef" :model="(adapter.form.value as T)" :rules="adapter.rules" label-placement="top">
        <!-- CE SLOT PERMET D'INJECTER N'IMPORTE QUEL FORMULAIRE -->
        <slot />
      </n-form>

      <template #action>
        <n-button @click="close">Annuler</n-button>
        <n-button type="primary" @click="submit">Valider</n-button>
      </template>
    </n-modal>
  </transition>
</template>

<script lang="ts" setup generic="T extends Record<string, any>">
  import { ref, watch } from 'vue'
  import { NForm, NModal, NButton } from 'naive-ui'
  import type { FormAdapter } from '@/utils/formFactories/FormAdapter'

  const props = defineProps<{
    show: boolean
    title?: string
    adapter: FormAdapter<T>
  }>()

  const emit = defineEmits<{
    (e: 'update:show', value: boolean): void
    (e: 'submit', value: T): void
  }>()

  const localShow = ref(props.show)

  watch(
    () => props.show,
    (v) => (localShow.value = v),
  )

  watch(localShow, (v) => emit('update:show', v))

  function close() {
    localShow.value = false
  }

  function submit() {
    console.log('je passe')
    props.adapter
      .validate()
      .then((data) => {
        emit('submit', data)
        console.log('je passe 2')
        close()
      })
      .catch((error: Error) => {
        console.log('je passe 3')
        console.error(error)
      })
  }
</script>

<style scoped>

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
