import type { FormRules } from 'naive-ui'

export const problemFormRules: FormRules = {
  sub_disease_name_FR: [{ required: true, message: 'Le nom est obligatoire', trigger: 'blur' }],
  status_sub_disease: [{ required: true, message: 'Le status est obligatoire', trigger: 'blur' }],
}
