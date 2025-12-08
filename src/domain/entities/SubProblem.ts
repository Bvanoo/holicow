// import type ProblemPayload from './ProblemPayload'

export default interface SubProblem extends Record<string, unknown> {
  commentCount: number
  diseaseId: number
  diseaseName: string
  farmerAlertCount: number
  similarAvatarAlertCount: number
  subDiseaseId: number
  subDiseaseName: string
}
