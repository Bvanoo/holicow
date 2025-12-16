import type SubProblem from './SubProblem'

export default interface SubProblemPayload {
  subDiseases: SubProblem[]
  totalAlerts: number
  totalComments: number
  totalPages: number
  totalSimilarAvatarAlerts: number
  totalSubDiseases: number
  // total: number
  // page: number
  // totalPages: number
}
