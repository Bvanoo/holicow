import type { FormRules } from 'naive-ui'

export const solutionFormRules: FormRules = {
  solution_description_FR: [{ required: true, message: 'Le nom est obligatoire', trigger: 'blur' }],
  status_solution: [{ required: true, message: 'Le status est obligatoire', trigger: 'blur' }],
}
