export interface SubProblemFormModel extends Record<string, unknown> {
  id_disease?: string
  id_sub_disease?: string
  sub_disease_name_FR: string
  status_sub_disease: string
}

export const subProblemFormInitial: SubProblemFormModel = {
  sub_disease_name_FR: '',
  status_sub_disease: 'Désactiver',
}
