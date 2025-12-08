export default interface Problem extends Record<string, unknown> {
  SubDiseaseExisting: boolean
  commentCount: number
  diseaseId: number
  diseaseName: string
  farmerAlertCount: number
  similarAvatarAlertCount: number
  /*  id_disease: number
  disease_name_FR: string
  disease_name_DE?: string
  disease_name_EN?: string
  disease_name_NL?: string
  est_healing_time?: number
  status_disease?: boolean
  sub_diseases?: Array<SubProblem>*/
}
