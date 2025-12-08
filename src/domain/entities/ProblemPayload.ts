import type Problem from './Problem'

export default interface ProblemPayload{
  diseases: Problem[]
  total?: number
  page?: number
  totalPages?: number
}
