export default interface Problem extends Record<string, unknown> {
  diseaseId: number
  diseaseName: string
  commentCount?: number
  farmerAlertCount?: number
  similarAvatarAlertCount?: number

}