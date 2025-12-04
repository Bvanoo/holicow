import type { FormRules } from 'naive-ui'

export const problemFormRules: FormRules = {
  name: [{ required: true, message: 'Le nom est obligatoire', trigger: 'blur' }],
}
