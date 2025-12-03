import type Problem from './Problem'

export default interface ProblemPayload {
  diseases: Problem[]
  totalComments: number
  totalAlerts: number
  totalSimilarAvatarAlerts: number
  //   data: Problem[]
  // total: number
  // page: number
  // totalPages: number
}
