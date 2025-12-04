<template>
  <transition name="fade">
    <n-modal v-model:show="show" preset="dialog" class="w-96">
      <template #header>
        <div class="text-lg font-semibold">
          {{ title }}
        </div>
      </template>

      <n-form ref="formRef" :model="form" :rules="rules" label-placement="top">
        <!-- doit être externalisé -->
        <n-form-item label="Nom du problème" path="name">
          <n-input v-model:value="form.name" placeholder="Entrez votre nom" />
        </n-form-item>
<!-- 
        <n-form-item label="Email" path="email">
          <n-input v-model:value="form.email" placeholder="Entrez votre email" />
        </n-form-item> -->
        <!--  -->
      </n-form>

      <template #action>
        <n-button @click="close">Annuler</n-button>
        <n-button type="primary" @click="submit">Valider</n-button>
      </template>
    </n-modal>
  </transition>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { type FormInst, type FormRules, NForm, NFormItem, NButton, NModal } from 'naive-ui'

// doit être créer en externe
interface FormModel {
  name: string
  email: string
}

const props = defineProps<{
  show: boolean
  title?: string
}>()

const emit = defineEmits(['update:show', 'submit'])

const show = ref(props.show)

watch(
  () => props.show,
  (v) => (show.value = v),
)
watch(show, (v) => emit('update:show', v))

const formRef = ref<FormInst | null>(null)

// Doit se baser sur le type (interface) qui a été créé en externe et qui est passé en props
const form = ref<FormModel>({
  name: '',
  email: '',
})

// Doivent être externalisées
const rules: FormRules = {
  name: [{ required: true, message: 'Le nom est obligatoire', trigger: 'blur' }],
  email: [
    { required: true, message: 'L’email est obligatoire', trigger: 'blur' },
    { type: 'email', message: 'Format email invalide', trigger: 'blur' },
  ],
}

function close() {
  show.value = false
}

function submit() {
  formRef.value?.validate((errors) => {
    if (!errors) {
      emit('submit', form.value)
      close()
    }
  })
}
</script>

<style scoped>
/* Animation fade-in */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
