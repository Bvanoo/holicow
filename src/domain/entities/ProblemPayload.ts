import type Problem from './Problem'

export default interface ProblemPayload {
  data: Problem[]
  total: number
  page: number
  totalPages: number
}
