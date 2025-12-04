import type SubProblem from './SubProblem'

export default interface Problem extends Record<string, unknown> {
  disease_name_DE: string
  disease_name_EN: string
  disease_name_FR: string
  disease_name_NL: string
  est_healing_time: number
  id_disease: 5
  status_disease: boolean
  sub_diseases: SubProblem[]

  /*  id_disease: number
  disease_name_FR: string
  disease_name_DE?: string
  disease_name_EN?: string
  disease_name_NL?: string
  est_healing_time?: number
  status_disease?: boolean
  sub_diseases?: Array<SubProblem>*/
}
