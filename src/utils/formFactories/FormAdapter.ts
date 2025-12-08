import type { FormInst, FormRules } from 'naive-ui'
import type { Ref, UnwrapRef } from 'vue'

export interface FormAdapter<TModel extends Record<string, unknown>> {
  // FORM ADAPTER COMPLETE LIFECYCLE DEFINITION

  // Native generic Form object
  form: Ref<TModel | UnwrapRef<TModel>>

  // Naive-ui form rules
  rules: FormRules

  // Naive-ui form ref
  formRef: Ref<FormInst | null>

  // Validation + data recover
  validate(): Promise<TModel>

  // form data reset
  reset(): void

  // UPDATE (pre-filling)
  load(data: TModel): void

  // CREATE Business
  create(): Promise<TModel>

  // UPDATE Business
  update(): Promise<TModel>

  // DELETE Business
  destroy(): Promise<void>
}
