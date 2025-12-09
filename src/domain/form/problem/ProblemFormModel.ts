export interface ProblemFormModel extends Record<string, unknown> {
  disease_name_FR: string
  est_healing_time: number
  status_disease: string
}

export const problemFormInitial: ProblemFormModel = {
  disease_name_FR: '',
  est_healing_time: 0,
  status_disease: 'Désactiver',
}
