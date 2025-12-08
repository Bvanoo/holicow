export default interface CreateProblem extends Record<string, unknown> {
  disease_name_FR: string
  disease_name_DE: string
  disease_name_EN: string
  disease_name_NL: string
  est_healing_time: number
  status_disease: boolean
}
