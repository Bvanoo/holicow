export interface SolutionFormModel extends Record<string, unknown> {
  id_solution?: number
  solution_description_DE?: string
  solution_description_EN?: string
  solution_description_FR?: string
  solution_description_NL?: string
  //Obligé de mettre un string pour naiveui
  status_solution: string
  id_disease?: string
  id_sub_disease?: string
}

export const SolutionFormInitial: SolutionFormModel = {
  solution_description_FR: '',
  status_solution: 'Désactiver',
}
