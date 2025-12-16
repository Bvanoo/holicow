import { ref } from 'vue'
import type { FormRules, FormInst } from 'naive-ui'
import type { FormAdapter } from './FormAdapter'

export interface FormFactoryOptions<T> {
  initial: T
  rules?: FormRules
  onCreate?: (data: T) => Promise<T>
  onUpdate?: (data: T) => Promise<T>
  onDelete?: (data: T) => Promise<void>
}

export function createFormAdapter<T extends Record<string, unknown>>(
  options: FormFactoryOptions<T>,
): FormAdapter<T> {
  const formRef = ref<FormInst | null>(null)
  const form = ref<T>({ ...options.initial })
  const rules = options.rules ?? {}

  async function validate(): Promise<T> {
    if (!formRef.value) {
      throw new Error('FormRef non initialisé')
    }
    // Naive-ui returns Promise that automatically rejects errors
    await formRef.value.validate()
    // If we get here => validation OK
    return form.value
  }

  // UPDATE => (pre-filling)
  function load(data: T) {
    console.log(data)
    form.value = { ...data }
  }

  // CREATE
  async function create(): Promise<T> {
    if (!options.onCreate) {
      throw new Error('Aucune logique de création définie')
    }
    const data = await validate()
    const created = await options.onCreate(data)
    load(created)
    return created
  }

  // UPDATE
  async function update(): Promise<T> {
    if (!options.onUpdate) {
      throw new Error('Aucune logique de mise à jour définie')
    }

    const data = await validate()
    const updated = await options.onUpdate(data)
    load(updated)
    return updated
  }

  // DELETE
  async function destroy(): Promise<void> {
    if (!options.onDelete) {
      throw new Error('Aucune logique de suppression définie')
    }

    await options.onDelete(form.value)
    reset()
  }

  function reset() {
    form.value = { ...options.initial }
  }

  return {
    form,
    rules,
    formRef,
    validate,
    reset,
    load,
    create,
    update,
    destroy,
  }
}
