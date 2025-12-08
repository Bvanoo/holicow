// import type ProblemPayload from './ProblemPayload'

export default interface SubProblemAdmin extends Record<string, unknown> {
  id_sub_disease: number
  sub_disease_name_FR: string
  sub_disease_name_DE: string
  sub_disease_name_EN: string
  sub_disease_name_NL: string
  status_sub_disease: boolean
}
