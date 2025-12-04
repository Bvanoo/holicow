<template>
  <div class="page-body">
    <!-- <button @click="show = !show">click to show modal</button> -->
    <!-- ✅ Boutons d’actions -->
    <section style="display: flex; justify-content: space-around">
      <n-button type="primary" @click="openCreate"> Créer un problème </n-button>
      <n-button type="info" @click="openUpdate"> Modifier le problème </n-button>
      <n-button type="error" @click="handleDelete"> Supprimer le problème </n-button>
    </section>

    <GenericFormModal v-model:show="showModal" :title="modalTitle" :adapter="problemAdapter" @submit="handleSubmit">
      <n-form-item label="Nom du problème" path="name">
        <n-input v-model:value="problemAdapter.form.value.name" />
      </n-form-item>
      <n-form-item label="Description" path="description">
        <n-input v-model:value="problemAdapter.form.value.description" />
      </n-form-item>
    </GenericFormModal>
  </div>
</template>

<script setup lang="ts">
  import { createProblemFormAdapter } from '@/domain/form/problem/ProblemFormAdapter'
  import GenericFormModal from '@/presentation/components/GenericFormModal.vue'
  import { NFormItem, NInput, NButton } from 'naive-ui'
  import { computed, ref } from 'vue'

  // Adapter instance
  const problemAdapter = createProblemFormAdapter()

  const showModal = ref(false)
  const mode = ref<'create' | 'update'>('create')

  // Dynamic Title
  const modalTitle = computed(() =>
    mode.value === 'create' ? 'Créer un problème' : 'Modifier le problème',
  )

  // -----------------------------
  // MODES
  // -----------------------------

  function openCreate() {
    mode.value = 'create'
    problemAdapter.reset()
    showModal.value = true
  }

  function openUpdate() {
    mode.value = 'update'

    // Simulation d’une donnée existante
    problemAdapter.load({
      name: 'Problem loading',
      description: 'description loading',
    })

    showModal.value = true
  }

  async function handleSubmit() {
    if (mode.value === 'create') {
      const created = await problemAdapter.create()
      console.log('Created :', created)
    }

    if (mode.value === 'update') {
      const updated = await problemAdapter.update()
      console.log('Updated :', updated)
    }
  }

  // -----------------------------
  // ✅ DELETE
  // -----------------------------

  async function handleDelete() {
    await problemAdapter.destroy()
    console.log('✅ Supprimé')
  }
</script>

<style scoped>
  .page-body {
    /* background-color: rgb(222, 222, 222); */
    /* padding: 8px 0; */
    padding-top: 200px;
    margin: 32px 8%;
  }
</style>
