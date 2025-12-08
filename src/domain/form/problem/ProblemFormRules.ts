import type { FormRules } from 'naive-ui'

export const problemFormRules: FormRules = {
  disease_name_FR: [{ required: true, message: 'Le nom est obligatoire', trigger: 'blur' }],
  est_healing_time: [
    { required: true, message: 'Le nombre de jour est obligatoire', trigger: 'blur' },
  ],
}
